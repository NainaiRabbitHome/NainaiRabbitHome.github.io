/**
 * 対象オブジェクトのプロパティを更新し、値が妥当な範囲になるよう調整する。
 *
 * @param {object} state - エディターステート。
 * @param {string} id - 対象オブジェクトのID。
 * @param {string} key - 変更するプロパティ名。
 * @param {number} value - 新しく設定する数値。
 */
(function (global) {
  function updateObjectProperty(state, id, key, value) {
    const object = state.objects.find((item) => item.id === id);
    if (!object) return;

    if (['width', 'height'].includes(key)) {
      object[key] = Math.max(1, value);
    } else if (['x', 'y', 'rotation'].includes(key)) {
      object[key] = value;
    }
  }

  global.updateObjectProperty = updateObjectProperty;
})(window);
