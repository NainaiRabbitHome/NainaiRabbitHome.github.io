// 取得したおだんご数をもとに容器のグラフィックを切り替える
(function () {
  function updateContainerImage(state, elements) {
    const count = state.score;
    let fileName = "empty_container.png";
    if (count >= 15) {
      fileName = "full_container.png";
    } else if (count >= 11) {
      fileName = "level_3_container.png";
    } else if (count >= 6) {
      fileName = "level_2_container.png";
    } else if (count >= 1) {
      fileName = "level_1_container.png";
    }
    const nextSrc = `./image/${fileName}`;
    if (elements.containerImage.dataset.activeSrc !== nextSrc) {
      elements.containerImage.src = nextSrc;
      elements.containerImage.dataset.activeSrc = nextSrc;
    }
  }
  window.updateContainerImage = updateContainerImage;
})();
