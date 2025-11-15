// ゲーム全体のパラメーターと状態を保持するオブジェクトを返す
(function () {
  function initGameState() {
    return {
      score: 0,
      timeLeft: 60,
      gameDuration: 60,
      isRunning: false,
      backgroundX: 0,
      moveSpeed: 260,
      dropSpeed: 280,
      keyDirection: 0,
      buttonDirection: 0,
      currentDirection: 0,
      lastFacing: 1,
      rabbitFrame: "./image/rabbit_anim1.png",
      animationElapsed: 0,
      animationToggle: false,
      activeDrops: [],
      baseSpawnInterval: 900,
      minSpawnInterval: 600,
      maxSpawnInterval: 1200,
      spawnInterval: 900,
      spawnElapsed: 0,
      lastFrame: 0,
    };
  }
  window.initGameState = initGameState;
})();
