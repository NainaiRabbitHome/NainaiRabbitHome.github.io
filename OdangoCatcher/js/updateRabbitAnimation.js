// うさぎの向きとアニメーションフレームを更新する
(function () {
  function updateRabbitAnimation(state, elements, deltaMs) {
    if (state.currentDirection !== 0) {
      state.lastFacing = state.currentDirection;
      state.animationElapsed += deltaMs;
      if (state.animationElapsed >= 200) {
        state.animationElapsed = 0;
        state.animationToggle = !state.animationToggle;
      }
      const nextFrame = state.animationToggle
        ? "./image/rabbit_anim2.png"
        : "./image/rabbit_anim3.png";
      if (state.rabbitFrame !== nextFrame) {
        state.rabbitFrame = nextFrame;
        elements.rabbitImage.src = nextFrame;
      }
    } else {
      state.animationElapsed = 0;
      state.animationToggle = false;
      if (state.rabbitFrame !== "./image/rabbit_anim1.png") {
        state.rabbitFrame = "./image/rabbit_anim1.png";
        elements.rabbitImage.src = state.rabbitFrame;
      }
    }

    if (state.lastFacing >= 0) {
      elements.rabbitWrapper.classList.add("face-right");
    } else {
      elements.rabbitWrapper.classList.remove("face-right");
    }
  }
  window.updateRabbitAnimation = updateRabbitAnimation;
})();
