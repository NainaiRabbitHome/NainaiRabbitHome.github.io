// 背景のスクロール量を更新し、うさぎが移動している演出を行う
(function () {
  function updateBackground(state, elements, deltaMs) {
    if (state.currentDirection === 0) return;
    const scroll = -state.currentDirection * state.moveSpeed * (deltaMs / 1000);
    state.backgroundX += scroll;
    elements.scene.style.backgroundPosition = `${state.backgroundX}px 0px`;
    if (state.activeDrops.length) {
      state.activeDrops.forEach((drop) => {
        drop.x += scroll;
        drop.el.style.transform = `translate(${drop.x}px, ${drop.y}px)`;
      });
    }
  }
  window.updateBackground = updateBackground;
})();
