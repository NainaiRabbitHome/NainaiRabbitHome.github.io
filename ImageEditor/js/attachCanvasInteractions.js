/**
 * キャンバス上でポインターによるドラッグ操作を利用できるようにする。
 *
 * @param {object} params - 設定オブジェクト。
 * @param {object} params.state - エディターステート。
 * @param {Function} params.onSelect - オブジェクトがクリックされた際にIDを受け取る関数。
 * @param {Function} params.onUpdate - 変更ごとにキャンバスやサイドパネルを再描画する関数。
 */
(function (global) {
  function attachCanvasInteractions({ state, onSelect, onUpdate }) {
    const { canvas } = state;

    canvas.addEventListener(
      'pointerdown',
      (event) => {
        event.preventDefault();
        const { x, y } = translatePointerPosition(canvas, event);
        const target = findTopObject(state.objects, x, y);
        if (!target) {
          state.dragSession = null;
          return;
        }
        onSelect(target.id);
        state.dragSession = {
          id: target.id,
          pointerX: x,
          pointerY: y,
          startX: target.x,
          startY: target.y,
        };
        canvas.setPointerCapture(event.pointerId);
      },
      { passive: false }
    );

    canvas.addEventListener(
      'pointermove',
      (event) => {
        if (!state.dragSession) return;
        event.preventDefault();
        const { x, y } = translatePointerPosition(canvas, event);
        const object = state.objects.find((item) => item.id === state.dragSession.id);
        if (!object) return;
        const dx = x - state.dragSession.pointerX;
        const dy = y - state.dragSession.pointerY;
        object.x = state.dragSession.startX + dx;
        object.y = state.dragSession.startY + dy;
        onUpdate();
      },
      { passive: false }
    );

    ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
      canvas.addEventListener(type, (event) => {
        if (state.dragSession) {
          try {
            canvas.releasePointerCapture(event.pointerId);
          } catch (error) {
            console.debug('Pointer capture release skipped:', error);
          }
        }
        state.dragSession = null;
      });
    });
  }

  function translatePointerPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function findTopObject(objects, x, y) {
    for (let i = objects.length - 1; i >= 0; i -= 1) {
      const object = objects[i];
      if (pointInsideObject(object, x, y)) {
        return object;
      }
    }
    return null;
  }

  function pointInsideObject(object, x, y) {
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;
    const angleRad = (-object.rotation * Math.PI) / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const dx = x - centerX;
    const dy = y - centerY;
    const localX = dx * cos - dy * sin + object.width / 2;
    const localY = dx * sin + dy * cos + object.height / 2;
    return localX >= 0 && localX <= object.width && localY >= 0 && localY <= object.height;
  }

  global.attachCanvasInteractions = attachCanvasInteractions;
})(window);
