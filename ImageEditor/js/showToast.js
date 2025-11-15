/**
 * 一時的なトーストメッセージを表示する。
 *
 * @param {HTMLElement} element - トースト表示領域。
 * @param {string} message - 表示する文言。
 */
(function (global) {
  function showToast(element, message) {
    if (!element) return;
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 2000);
  }

  global.showToast = showToast;
})(window);
