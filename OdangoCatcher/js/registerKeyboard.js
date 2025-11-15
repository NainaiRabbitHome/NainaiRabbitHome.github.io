// キーボードの矢印/WASD入力を解釈して左右方向の値を更新する
(function () {
  function registerKeyboard(state) {
    const pressed = new Set();
    const leftKeys = new Set(["ArrowLeft", "a", "A"]);
    const rightKeys = new Set(["ArrowRight", "d", "D"]);

    const updateDirection = () => {
      if (pressed.has("right") && !pressed.has("left")) {
        state.keyDirection = 1;
      } else if (pressed.has("left") && !pressed.has("right")) {
        state.keyDirection = -1;
      } else {
        state.keyDirection = 0;
      }
    };

    window.addEventListener("keydown", (event) => {
      if (event.repeat) return;
      if (leftKeys.has(event.key)) {
        pressed.add("left");
        event.preventDefault();
        updateDirection();
      } else if (rightKeys.has(event.key)) {
        pressed.add("right");
        event.preventDefault();
        updateDirection();
      }
    });

    window.addEventListener("keyup", (event) => {
      if (leftKeys.has(event.key)) {
        pressed.delete("left");
        updateDirection();
      } else if (rightKeys.has(event.key)) {
        pressed.delete("right");
        updateDirection();
      }
    });
  }
  window.registerKeyboard = registerKeyboard;
})();
