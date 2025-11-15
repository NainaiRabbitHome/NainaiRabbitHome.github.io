/**
 * キャンバスの幅と高さ属性を更新し、描画コンテキストの状態をリセットする。
 *
 * @param {object} state - エディターステート。
 * @param {number} width - 設定したい幅(px)。
 * @param {number} height - 設定したい高さ(px)。
 */
(function (global) {
  function updateCanvasSize(state, width, height) {
    state.canvas.width = Math.max(1, width);
    state.canvas.height = Math.max(1, height);
  }

  global.updateCanvasSize = updateCanvasSize;
})(window);
