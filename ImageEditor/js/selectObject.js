/**
 * 指定したIDのオブジェクトがあれば選択状態にする。
 *
 * @param {object} state - エディターステート。
 * @param {string} id - 選択したいオブジェクトID。
 */
(function (global) {
  function selectObject(state, id) {
    if (state.objects.some((object) => object.id === id)) {
      state.selectedId = id;
    }
  }

  global.selectObject = selectObject;
})(window);
