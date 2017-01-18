var src = './test.gif';
var dest = './test.html';
var pxSize = 2;
var duration = '3s';

var fs = require('fs');
var pixelGif = require('pixel-gif');
var height;
var width;

function dataToCSS(data, width, height) {
	var boxShadows = [];
	for(var i = 0, n = data.length; i < n; i += 4) {
		var row = Math.ceil(((i+4)/4) / width-1)
		var col = ((i+4)/4)-(((row)*width+1));
		var r = data[i];
		var g = data[i+1];
		var b = data[i+2];
		var a = data[i+3];
    if(a !== 0) {
			boxShadows.push(col*pxSize +'px '+ row*pxSize + 'px rgba('+r+','+g+','+b+','+a/255+')');
		}
	}

  if (!boxShadows.length) return "box-shadow: none;"
  
  return "box-shadow: " + boxShadows.join(", ") + ";"
}

frames = []
pixelGif.parse(src).then(function(images){
  var i= 0;
  
  var nextImage = function() {
    var imageData = images[i++];
    if(imageData==null) {
      allDone();    
      return
    };
    height = imageData.height;
    width = imageData.width;
    frames.push(dataToCSS(imageData.data, imageData.width, imageData.height));
    nextImage();
  }
 
  nextImage();
  
})

function allDone(){
  var keyframes = ''
  var lastframe = null;
  frames.forEach(function(frame, i){
    if (lastframe !== frame){
      keyframes += `  ${ Math.round((100/(frames.length-1))*i) }% { ${frame} }
  `
    }
    lastframe = frame;
  })

  const html =`<html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>CSS Video</title>
  <style>
	#pixel-art {  height: ${height*pxSize}px;  width: ${width*pxSize}px; }
	#pixel-art:after {  
    content: '';  
    position: absolute;
    width: ${pxSize}px;
    height: ${pxSize}px;
    animation: vid ${duration} infinite steps(${frames.length}, end);
    animation-fill-mode: forwards;
  }
  
  @keyframes vid {
  ${keyframes}
  }  

	</style>

</head>
<body>
  <div id="pixel-art"></div>
</body>
</html>
`
fs.writeFile(dest, html, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
})
}