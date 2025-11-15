/**
 * 選択中のオブジェクトを編集するフォームを描画する。
 *
 * @param {object} params - 設定オブジェクト。
 * @param {object} params.state - エディターステート。
 * @param {HTMLElement} params.container - フォームを挿入する要素。
 * @param {Function} params.onChange - { id, key, value } を受け取る変更ハンドラー。
 */
(function (global) {
  function renderObjectDetails({ state, container, onChange }) {
    container.innerHTML = '';
    const current = state.objects.find((object) => object.id === state.selectedId);
    if (!current) {
      container.innerHTML = '<p>オブジェクトを選択してください。</p>';
      return;
    }

    const fields = [
      { key: 'x', label: 'X 位置', step: 1 },
      { key: 'y', label: 'Y 位置', step: 1 },
      { key: 'width', label: '幅', step: 1, min: 1 },
      { key: 'height', label: '高さ', step: 1, min: 1 },
      { key: 'rotation', label: '回転(度)', step: 1 },
    ];

    fields.forEach((field) => {
      const label = document.createElement('label');
      label.textContent = field.label;
      const input = document.createElement('input');
      input.type = 'number';
      input.value = current[field.key];
      if (field.min !== undefined) input.min = field.min;
      input.step = field.step;
      input.addEventListener('input', (event) => {
        const value = Number(event.target.value);
        if (!Number.isFinite(value)) return;
        onChange({ id: current.id, key: field.key, value });
      });
      label.appendChild(input);
      container.appendChild(label);
    });
  }

  global.renderObjectDetails = renderObjectDetails;
})(window);
