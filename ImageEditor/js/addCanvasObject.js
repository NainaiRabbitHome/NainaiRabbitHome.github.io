let runningId = 0;

/**
 * 渡された画像をもとにキャンバスオブジェクトを追加する。
 * 初期サイズは画像の元の寸法となり、左上に配置される。
 *
 * @param {object} state - 共有エディターステート。
 * @param {HTMLImageElement} image - 読み込まれた画像。
 * @returns {object} 追加されたオブジェクト。
 */
(function (global) {
  function addCanvasObject(state, image) {
    const object = {
      id: `obj-${runningId++}`,
      name: image.alt || `画像 ${state.objects.length + 1}`,
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      rotation: 0,
      x: 0,
      y: 0,
    };

    state.objects.push(object);
    state.selectedId = object.id;
    return object;
  }

  global.addCanvasObject = addCanvasObject;
})(window);
