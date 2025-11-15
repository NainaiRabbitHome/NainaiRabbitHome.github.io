/* global createEditorState, setupTabs, loadImageFile, addCanvasObject, renderCanvas, updateObjectList, renderObjectDetails, selectObject, updateObjectProperty, reorderObject, duplicateObject, deleteObject, exportCanvasImage, attachCanvasInteractions, showToast, updateCanvasSize, applyCanvasDisplayScale */
(function () {
  const canvas = document.getElementById('editorCanvas');
  const imageLoader = document.getElementById('imageLoader');
  const objectList = document.getElementById('objectList');
  const objectDetails = document.getElementById('objectDetails');
  const canvasWidthInput = document.getElementById('canvasWidth');
  const canvasHeightInput = document.getElementById('canvasHeight');
  const applyCanvasSizeBtn = document.getElementById('applyCanvasSize');
  const exportImageBtn = document.getElementById('exportImage');
  const toast = document.getElementById('toast');

  const state = createEditorState(canvas);
  applyCanvasDisplayScale(state);

  setupTabs(
    document.querySelectorAll('.tab-button'),
    document.querySelectorAll('.panel')
  );

  attachCanvasInteractions({
    state,
    onSelect: handleSelect,
    onUpdate: () => {
      renderCanvas(state);
      renderDetailsPanel();
    },
  });

  imageLoader.addEventListener('change', handleFileChange);
  applyCanvasSizeBtn.addEventListener('click', handleCanvasResize);
  exportImageBtn.addEventListener('click', () => {
    exportCanvasImage(state.canvas);
    showToast(toast, 'PNGを書き出しました');
  });

  renderCanvas(state);
  renderSidePanels();

  async function handleFileChange(event) {
    const [file] = event.target.files || [];
    if (!file) return;
    try {
      const image = await loadImageFile(file);
      image.alt = file.name;
      addCanvasObject(state, image);
      renderCanvas(state);
      renderSidePanels();
      showToast(toast, `${file.name} を追加しました`);
    } catch (error) {
      showToast(toast, error.message);
    } finally {
      event.target.value = '';
    }
  }

  function handleSelect(id) {
    selectObject(state, id);
    renderSidePanels();
  }

  function handleChange({ id, key, value }) {
    updateObjectProperty(state, id, key, value);
    renderCanvas(state);
  }

  function handleMove(id, direction) {
    reorderObject(state, id, direction);
    renderSidePanels();
    renderCanvas(state);
  }

  function handleDuplicate(id) {
    const clone = duplicateObject(state, id);
    if (clone) {
      renderSidePanels();
      renderCanvas(state);
      showToast(toast, `${clone.name} を作成しました`);
    }
  }

  function handleDelete(id) {
    deleteObject(state, id);
    renderSidePanels();
    renderCanvas(state);
  }

  function handleCanvasResize() {
    const width = Number(canvasWidthInput.value);
    const height = Number(canvasHeightInput.value);
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      showToast(toast, '幅と高さには数値を入力してください');
      return;
    }
    updateCanvasSize(state, width, height);
    applyCanvasDisplayScale(state);
    renderCanvas(state);
    showToast(toast, 'キャンバスサイズを更新しました');
  }

  function renderSidePanels() {
    updateObjectList({
      state,
      container: objectList,
      onSelect: handleSelect,
      onMove: handleMove,
      onDuplicate: handleDuplicate,
      onDelete: handleDelete,
    });
    renderDetailsPanel();
  }

  function renderDetailsPanel() {
    renderObjectDetails({
      state,
      container: objectDetails,
      onChange: handleChange,
    });
  }
})();
