/**
 * オブジェクトの順序と回転を考慮してキャンバスへ描画する。
 * 先に全体をクリアし、配列の先頭から順に描画する（インデックスが小さいほど下に描画）。
 *
 * @param {object} state - ctx・canvas・objects を持つステート。
 */
(function (global) {
  function renderCanvas(state) {
    const { ctx, canvas, objects } = state;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach((object) => {
      ctx.save();
      ctx.translate(object.x + object.width / 2, object.y + object.height / 2);
      ctx.rotate((object.rotation * Math.PI) / 180);
      ctx.drawImage(
        object.image,
        -object.width / 2,
        -object.height / 2,
        object.width,
        object.height
      );
      ctx.restore();
    });
  }

  global.renderCanvas = renderCanvas;
})(window);
