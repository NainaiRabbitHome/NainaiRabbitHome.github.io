/**
 * オブジェクトを削除し、必要であれば選択状態を調整する。
 *
 * @param {object} state - エディターステート。
 * @param {string} id - 削除するオブジェクトID。
 */
(function (global) {
  function deleteObject(state, id) {
    const index = state.objects.findIndex((object) => object.id === id);
    if (index < 0) return;
    state.objects.splice(index, 1);
    if (state.selectedId === id) {
      state.selectedId = state.objects[index - 1]?.id || state.objects[0]?.id || null;
    }
  }

  global.deleteObject = deleteObject;
})(window);
