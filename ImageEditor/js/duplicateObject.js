/**
 * 指定したオブジェクトを複製し、見分けやすいように少しずらして配置する。
 *
 * @param {object} state - エディターステート。
 * @param {string} id - 複製元のオブジェクトID。
 * @returns {object|undefined} 新しいオブジェクト。対象がなければ undefined。
 */
(function (global) {
  function duplicateObject(state, id) {
    const source = state.objects.find((object) => object.id === id);
    if (!source) return undefined;
    const clone = {
      id: `${source.id}-copy-${Date.now()}`,
      name: `${source.name} (複製)`,
      image: source.image,
      width: source.width,
      height: source.height,
      rotation: source.rotation,
      x: source.x + 20,
      y: source.y + 20,
    };
    state.objects.push(clone);
    state.selectedId = clone.id;
    return clone;
  }

  global.duplicateObject = duplicateObject;
})(window);
