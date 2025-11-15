// 画面内で頻繁に参照するDOM要素をまとめて取得する関数
(function () {
  function createLayout() {
    return {
      scene: document.getElementById("scene"),
      rabbitWrapper: document.getElementById("rabbitWrapper"),
      rabbitImage: document.getElementById("rabbitImage"),
      containerImage: document.getElementById("containerImage"),
      dropLayer: document.getElementById("dropLayer"),
      scoreValue: document.getElementById("scoreValue"),
      timerValue: document.getElementById("timerValue"),
      startButton: document.getElementById("startButton"),
      arrowButtons: Array.from(document.querySelectorAll("[data-direction]")),
    };
  }
  window.createLayout = createLayout;
})();
