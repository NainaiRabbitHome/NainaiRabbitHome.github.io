// スタート前にステートと見た目を初期化して再挑戦できるようにする
(function () {
  function resetGameState(state, elements) {
    state.score = 0;
    state.timeLeft = state.gameDuration;
    state.isRunning = false;
    state.backgroundX = 0;
    state.keyDirection = 0;
    state.buttonDirection = 0;
    state.currentDirection = 0;
    state.lastFacing = 1;
    state.rabbitFrame = "./image/rabbit_anim1.png";
    state.animationElapsed = 0;
    state.animationToggle = false;
    state.spawnInterval = state.baseSpawnInterval;
    state.spawnElapsed = 0;
    state.lastFrame = 0;
    state.activeDrops.forEach((drop) => drop.el.remove());
    state.activeDrops.length = 0;
    elements.scene.style.backgroundPosition = "0px 0px";
    elements.dropLayer.style.transform = "translateX(0px)";
    elements.rabbitWrapper.classList.add("face-right");
    elements.rabbitImage.src = state.rabbitFrame;
    elements.containerImage.src = "./image/empty_container.png";
    elements.containerImage.dataset.activeSrc = "./image/empty_container.png";
    elements.dropLayer.innerHTML = "";
  }
  window.resetGameState = resetGameState;
})();
