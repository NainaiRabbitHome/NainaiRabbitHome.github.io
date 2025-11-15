// おだんごを落下させつつ、容器との接触を検出してスコアを加算する
(function () {
  function updateDrops(state, elements, deltaMs) {
    if (state.activeDrops.length === 0) return;
    const fallDistance = state.dropSpeed * (deltaMs / 1000);
    const sceneRect = elements.scene.getBoundingClientRect();
    const containerRect = elements.containerImage.getBoundingClientRect();
    const catchTop = containerRect.top - sceneRect.top;
    const catchLeft = containerRect.left - sceneRect.left;
    const catchRight = catchLeft + containerRect.width;
    const groundTop = elements.scene.clientHeight - 110;

    for (let i = state.activeDrops.length - 1; i >= 0; i -= 1) {
      const drop = state.activeDrops[i];
      drop.prevY = drop.y;
      drop.y += fallDistance;
      drop.el.style.transform = `translate(${drop.x}px, ${drop.y}px)`;

      const prevBottom = drop.prevY + drop.size;
      const newBottom = drop.y + drop.size;
      const dropCenterX = drop.x + drop.size / 2;
      const passesTop = prevBottom <= catchTop && newBottom >= catchTop;
      const withinContainer =
        dropCenterX >= catchLeft && dropCenterX <= catchRight;

      if (passesTop && withinContainer) {
        state.score += 1;
        drop.el.remove();
        state.activeDrops.splice(i, 1);
        continue;
      }

      if (newBottom >= groundTop) {
        drop.el.remove();
        state.activeDrops.splice(i, 1);
      }
    }
  }
  window.updateDrops = updateDrops;
})();
