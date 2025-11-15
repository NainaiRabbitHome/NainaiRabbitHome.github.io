/**
 * タブボタンとパネルを紐付け、簡単な表示切り替えを実現する。
 *
 * @param {NodeListOf<HTMLButtonElement>} tabButtons - 切り替え用ボタン群。
 * @param {NodeListOf<HTMLElement>} panels - data-panel 属性を持つパネル要素群。
 */
(function (global) {
  function setupTabs(tabButtons, panels) {
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;
        tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        panels.forEach((panel) => {
          panel.classList.toggle('hidden', panel.dataset.panel !== target);
        });
      });
    });
  }

  global.setupTabs = setupTabs;
})(window);
