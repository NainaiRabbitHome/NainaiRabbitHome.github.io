// スタートボタン押下からゲーム終了までのメインループを管理する
(function () {
  function startGameLogic(elements, state) {
    const { startButton } = elements;
    let rafId = 0;

    const finishGame = () => {
      if (!state.isRunning) {
        startButton.disabled = false;
        return;
      }
      state.isRunning = false;
      startButton.disabled = false;
      startButton.textContent = "リスタート";
      state.spawnElapsed = 0;
      state.lastFrame = 0;
      state.activeDrops.forEach((drop) => drop.el.remove());
      state.activeDrops.length = 0;
    };

    const loop = (timestamp) => {
      if (!state.isRunning) return;
      if (!state.lastFrame) {
        state.lastFrame = timestamp;
      }
      const delta = timestamp - state.lastFrame;
      state.lastFrame = timestamp;
      const safeDelta = Math.min(32, delta);
      state.spawnElapsed += delta;
      state.timeLeft = Math.max(0, state.timeLeft - delta / 1000);

      const combined = state.keyDirection + state.buttonDirection;
      if (combined > 0) {
        state.currentDirection = 1;
      } else if (combined < 0) {
        state.currentDirection = -1;
      } else {
        state.currentDirection = 0;
      }

      window.updateBackground(state, elements, safeDelta);
      window.updateRabbitAnimation(state, elements, safeDelta);
      window.updateDrops(state, elements, safeDelta);
      window.updateContainerImage(state, elements);
      window.updateHud(state, elements);

      if (state.spawnElapsed >= state.spawnInterval) {
        window.spawnOdango(state, elements);
        state.spawnElapsed = 0;
        const span = state.maxSpawnInterval - state.minSpawnInterval;
        state.spawnInterval = state.minSpawnInterval + Math.random() * span;
      }

      if (state.timeLeft <= 0) {
        finishGame();
        window.updateHud(state, elements);
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    startButton.addEventListener("click", () => {
      if (state.isRunning) return;
      window.resetGameState(state, elements);
      window.updateContainerImage(state, elements);
      window.updateHud(state, elements);
      state.isRunning = true;
      startButton.disabled = true;
      startButton.textContent = "プレイ中...";
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    });

    window.updateContainerImage(state, elements);
    window.updateHud(state, elements);
    window.updateRabbitAnimation(state, elements, 0);
  }

  window.startGameLogic = startGameLogic;
})();
