navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia;


var app = {
  preview: document.querySelector("video"),
  shoot: document.querySelector("#shoot"),
  canvas: document.querySelector("canvas"),
  sliderX: document.querySelector("#width"),
  sliderY: document.querySelector("#height"),
  stream: null
};


var givenWidth = 40;
var givenHeight = 40;

function onupdateMosaicSize1changed(event){
  givenwidth = Number(updateMosaicSize1.value);
};

var updateMosaicSize1 =
document.querySelector("#updateMosaicSize1 > input")
updateMosaicSize1.addEventListener("change", onupdateMosaicSize1changed);


function onupdateMosaicSize2changed(event){
  givenHeight = Number(updateMosaicSize2.value);
};

var updateMosaicSize2 =
document.querySelector("#updateMosaicSize2 > input")
updateMosaicSize2.addEventListener("change", onupdateMosaicSize2changed);



var MEDIA_CONSTRAINT = {
  video: true,
  audio: false
};

function streamAquired(stream){
  app.stream = stream;
  app.preview.src = window.URL.createObjectURL(stream);
  app.preview.play();
}

function streamAquisitionFailed(error){
  console.log(error);
}


function getPixel(x, y){
  var result = app.ctx.getImageData(x, y, 1, 1);
  return result.data;
}

function formatColor(color){
  return "rgb("+ color[0] + "," + color[1] + ", " + color[2] + ")";
};

function mosaic(){
  var i = 0;
  var width = givenWidth;
  var height = givenHeight;
  while(i < app.canvas.width){
    var j = 0;
  while(j < app.canvas.height){
    var color = getPixel(i, j);
    app.ctx.fillStyle = formatColor(color);
    app.ctx.fillRect(i, j, width, height);
    console.log(i+","+j);
    j = j + height;
  }
  i = i + width;
 }
}

function processImage(){
  mosaic();
}


function capture(){
  if(app.stream != null){
    app.ctx.drawImage(app.preview, 0, 0, app.canvas.width, app.canvas.height);
  }
  processImage();
}

function initialize(){
  app.shoot.addEventListener("click", capture);
  app.ctx = app.canvas.getContext("2d");
  navigator.getUserMedia(MEDIA_CONSTRAINT,
    streamAquired,
    streamAquisitionFailed);
}

function unload(){
  if(app.stream != null){
    app.stream.stop();
    app.stream = null;
  }
}

window.addEventListener("load", initialize);
window.addEventListener("unload", unload);





/*
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia;

  オブジェクトリテラル
var app = {
  preview: document.querySelector("video"),
  stream: null
};

自分でobjectを定義する
var MEDIA_CONSTRAINT = {
  video: true,
  audio: false
};
MEDIA_CONSTRAINT = { 属性の名前：属性の値 }

streamはURLがないので、アドレスを作らなければならない
function streamAquired(stream){
  app.stream = stream;
  app.preview.src = window.URL.createObjectURL(stream);
  app.preview.play();
}

function streamAquisitionFailed(error){
  console.log(error);
}

getUserMediaはユーザーと共有するかどうか
function initialize(){
  navigator.getUserMedia(MEDIA_CONSTRAINT, streamAquired, streamAquisitionFailed);
}

共有したら２つ目の項目が実行され、
共有しなかったら３つ目の項目が実行される
function unload(){
  if(app.stream != null){
    app.stream.stop();
    app.stream = null;
  }
}

window.addEventListener("unload", unload);

*/
