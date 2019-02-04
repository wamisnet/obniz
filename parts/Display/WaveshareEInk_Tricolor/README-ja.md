# WaveshareEInk_Tricolor

Waveshare製の3色電子ペーパーモジュールです。
電源を切っても最後に送信した内容が表示され続けます。
バックライトが無いため、低消費電力です。
このライブラリはモノクロ(2色)タイプのモジュールは制御できませんのでご注意ください。

[Waveshare 152x152, 1.54inch E-Ink display module, yellow/black/white three-color](https://www.waveshare.com/1.54inch-e-paper-module-c.htm)

[千石電商 1.54インチ 152×152 E-Ink 黄/黒/白 3色 電子ペーパーモジュール SPI接続](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-58WR)

## wired(obniz,  {[vcc, gnd, busy, rst, dc, cs, clk, din, width, height]} )
obnizに液晶モジュールをつなぎます。
液晶との通信にSPIを使用しています。未使用のSPIが1つ以上必要です。
widthに液晶の横ドット数、heightに縦ドット数を指定します。
描画が完了するまで数十秒かかります。

```javascript
// Javascript Example
eink = obniz.wired("WaveshareEInk_Tricolor", {busy:0 , rst:1, dc:2, cs:3,  clk:4, din:5, gnd:6 , vcc:7 ,width:152, height:152});

eink.font('Serif',50)
eink.print("Hello!");
```

## 描画関数

描画関数はDisplayと共通です。(qr関数を除く。)
詳しくは[Displayのページ](https://obniz.io/doc/sdk/doc/display)をご覧ください。

## Canvas contextを使って画像を表示するサンプル
"Image address here"の部分を画像のアドレスに変えると、画像がディスプレイに表示されます。
輝度80以下で黒、輝度80~220で黄色、輝度220以上で白に描画されます。


```javascript
// Javascript Example
eink = obniz.wired("WaveshareEInk_Tricolor", {busy:0 , rst:1, dc:2, cs:3,  clk:4, din:5, gnd:6 , vcc:7 ,width:152, height:152});

var canvas = document.getElementById('canvas');
if ( ! canvas || ! canvas.getContext ) { return false; }
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = "Image address here";
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  eink.draw(ctx);
}
```
HTML部分に以下の一行を加えると、実行画面にcanvasの内容が表示されます。
```HTML
<!-- HTML Example -->
<canvas id="canvas" width="152" height="152"></canvas>
```
