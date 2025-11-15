// HUD上のスコアと残り時間を表示する
(function () {
  function updateHud(state, elements) {
    elements.scoreValue.textContent = state.score.toString();
    const seconds = Math.max(0, state.timeLeft);
    elements.timerValue.textContent = seconds.toFixed(1);
  }
  window.updateHud = updateHud;
})();
