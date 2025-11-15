// ランダムな横位置でおだんご要素を生成し、落下リストに登録する
(function () {
  function spawnOdango(state, elements) {
    const dropSize = 28;
    const padding = 24;
    const sceneWidth = elements.scene.clientWidth;
    const minX = padding;
    const maxX = Math.max(minX, sceneWidth - dropSize - padding);
    const x = Math.random() * (maxX - minX) + minX;

    const el = document.createElement("div");
    el.className = "dango";
    elements.dropLayer.appendChild(el);

    const drop = { el, x, y: -dropSize, prevY: -dropSize, size: dropSize };
    el.style.transform = `translate(${drop.x}px, ${drop.y}px)`;
    state.activeDrops.push(drop);
  }
  window.spawnOdango = spawnOdango;
})();
