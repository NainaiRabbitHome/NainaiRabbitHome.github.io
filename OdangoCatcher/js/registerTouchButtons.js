// 矢印ボタンの長押しやタッチを方向値に反映させる
(function () {
  function registerTouchButtons(elements, state) {
    elements.arrowButtons.forEach((button) => {
      const direction = Number(button.dataset.direction);

      const press = () => {
        state.buttonDirection = direction;
        button.classList.add("active");
      };

      const release = () => {
        if (state.buttonDirection === direction) {
          state.buttonDirection = 0;
        }
        button.classList.remove("active");
      };

      button.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 && event.pointerType === "mouse") return;
        event.preventDefault();
        press();
        button.setPointerCapture(event.pointerId);
      });

      button.addEventListener("pointerup", (event) => {
        release();
        if (button.hasPointerCapture(event.pointerId)) {
          button.releasePointerCapture(event.pointerId);
        }
      });

      button.addEventListener("pointercancel", release);
      button.addEventListener("pointerleave", (event) => {
        if (event.pointerType === "mouse") {
          release();
        }
      });
    });
  }
  window.registerTouchButtons = registerTouchButtons;
})();
