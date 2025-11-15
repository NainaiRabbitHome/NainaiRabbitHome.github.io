// DOM要素とステートを初期化しつつ、入力処理とゲームループを起動する
(function () {
  const elements = window.createLayout();
  const state = window.initGameState();
  window.registerKeyboard(state);
  window.registerTouchButtons(elements, state);
  window.startGameLogic(elements, state);
})();
