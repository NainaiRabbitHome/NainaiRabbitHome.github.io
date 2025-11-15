/**
 * アップロードされたファイルを読み込み、HTMLImageElement の準備が整ったら解決する。
 *
 * @param {File} file - ユーザーが選択した画像ファイル。
 * @returns {Promise<HTMLImageElement>} 読み込まれた画像インスタンス。
 */
(function (global) {
  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
        image.src = reader.result;
      };
      reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
      reader.readAsDataURL(file);
    });
  }

  global.loadImageFile = loadImageFile;
})(window);
