/**
 * 共有エディターステートを生成する。
 * キャンバスの描画コンテキストや画像オブジェクト群を保持し、
 * どのモジュールからも同じ状態にアクセスできるようにする。
 * 内部解像度を変更しても画面上のサイズが変化しないよう displayWidth も保持する。
 *
 * @param {HTMLCanvasElement} canvas - 対象となるキャンバス要素。
 * @returns {object} 変更可能なステートコンテナ。
 */
(function (global) {
  function createEditorState(canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
      canvas,
      ctx: canvas.getContext('2d'),
      objects: [],
      selectedId: null,
      dragSession: null,
      displayWidth: rect.width || canvas.width,
    };
  }

  global.createEditorState = createEditorState;
})(window);
