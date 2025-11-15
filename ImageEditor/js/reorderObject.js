/**
 * オブジェクトの順序を入れ替え、描画レイヤーを変更する。
 *
 * @param {object} state - エディターステート。
 * @param {string} id - 対象オブジェクトのID。
 * @param {number} direction - -1で前方、+1で後方へ移動。
 */
(function (global) {
  function reorderObject(state, id, direction) {
    const index = state.objects.findIndex((object) => object.id === id);
    if (index < 0) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.objects.length) return;
    const [object] = state.objects.splice(index, 1);
    state.objects.splice(newIndex, 0, object);
  }

  global.reorderObject = reorderObject;
})(window);
