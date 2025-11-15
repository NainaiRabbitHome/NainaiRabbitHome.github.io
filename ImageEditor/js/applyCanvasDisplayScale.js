/**
 * 内部解像度を変更しても画面上のサイズが一定になるよう調整する。
 * 解像度を下げたときにピクセルが拡大して見えるズーム表現に利用する。
 *
 * @param {object} state - canvas・width/height・displayWidth を含むステート。
 */
(function (global) {
  function applyCanvasDisplayScale(state) {
    const { canvas, displayWidth } = state;
    if (!canvas) return;
    const desiredWidth = displayWidth || canvas.width;
    const scale = desiredWidth / canvas.width;
    canvas.style.width = `${desiredWidth}px`;
    canvas.style.height = `${Math.max(1, canvas.height * scale)}px`;
    canvas.style.imageRendering = 'pixelated';
  }

  global.applyCanvasDisplayScale = applyCanvasDisplayScale;
})(window);
