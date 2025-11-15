/**
 * 現在の順序を反映するようオブジェクトリスト UI を再構築する。
 * 選択・順序入れ替え・複製・削除ボタンもここで紐付ける。
 *
 * @param {object} params - 描画設定と各種コールバック。
 * @param {object} params.state - エディターステート。
 * @param {HTMLElement} params.container - 上書き対象のリスト要素。
 * @param {Function} params.onSelect - オブジェクトIDを受け取る選択コールバック。
 * @param {Function} params.onMove - IDと方向(+1/-1)を受け取る順序変更コールバック。
 * @param {Function} params.onDuplicate - オブジェクトIDを受け取る複製コールバック。
 * @param {Function} params.onDelete - オブジェクトIDを受け取る削除コールバック。
 */
(function (global) {
  function updateObjectList({ state, container, onSelect, onMove, onDuplicate, onDelete }) {
    container.innerHTML = '';
    if (!state.objects.length) {
      container.innerHTML = '<p>オブジェクトがまだありません。</p>';
      return;
    }

    state.objects.forEach((object, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = `object-item${object.id === state.selectedId ? ' active' : ''}`;
      const label = document.createElement('button');
      label.type = 'button';
      label.className = 'small';
      label.textContent = object.name;
      label.addEventListener('click', () => onSelect(object.id));

      const actions = document.createElement('div');
      actions.className = 'object-actions';

      const up = document.createElement('button');
      up.type = 'button';
      up.className = 'small';
      up.textContent = '↑';
      up.disabled = index === 0;
      up.addEventListener('click', () => onMove(object.id, -1));

      const down = document.createElement('button');
      down.type = 'button';
      down.className = 'small';
      down.textContent = '↓';
      down.disabled = index === state.objects.length - 1;
      down.addEventListener('click', () => onMove(object.id, 1));

      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'small';
      copy.textContent = '複製';
      copy.addEventListener('click', () => onDuplicate(object.id));

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'small';
      remove.textContent = '削除';
      remove.addEventListener('click', () => onDelete(object.id));

      actions.append(up, down, copy, remove);
      wrapper.append(label, actions);
      container.appendChild(wrapper);
    });
  }

  global.updateObjectList = updateObjectList;
})(window);
