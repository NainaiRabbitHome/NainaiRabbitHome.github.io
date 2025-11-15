/**
 * 現在のキャンバス内容を PNG としてダウンロードさせる。
 *
 * @param {HTMLCanvasElement} canvas - 元となるキャンバス。
 */
(function (global) {
  function exportCanvasImage(canvas) {
    const link = document.createElement('a');
    link.download = `canvas-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  global.exportCanvasImage = exportCanvasImage;
})(window);
