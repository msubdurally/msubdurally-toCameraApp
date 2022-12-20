export const getImageColorArray = (colorGradientValue) =>{
  // list of colour arrays using gradients 
  var colorGradientValue = colorGradientValue;

  var gradientColorItemsValue;
  if(colorGradientValue == 1)
  {
    gradientColorItemsValue = [{redValue : 42, greenValue : 68, blueValue : 150}];
  }
  if(colorGradientValue == 2)
  {
    gradientColorItemsValue = [
      {redValue : 172, greenValue : 174, blueValue : 173}, //
      {redValue : 42, greenValue : 68, blueValue : 100}];
  }
  else if(colorGradientValue == 3)
  {
    gradientColorItemsValue = [
      {redValue : 240, greenValue : 241, blueValue : 238}, //
      {redValue : 219, greenValue : 142, blueValue : 45},
      {redValue : 56, greenValue : 28, blueValue : 37}];
  }
  else if(colorGradientValue == 4)
  {
    gradientColorItemsValue = [
      {redValue : 40, greenValue : 46, blueValue : 73}, //
      {redValue : 140, greenValue : 153, blueValue : 168},
      {redValue : 172, greenValue : 180, blueValue : 207},
      {redValue : 254, greenValue : 254, blueValue : 255}];
  }
  else if(colorGradientValue == 5)
  {
    gradientColorItemsValue = [
      {redValue : 24, greenValue : 40, blueValue : 27}, //
      {redValue : 55, greenValue : 155, blueValue : 76},
      {redValue : 159, greenValue : 202, blueValue : 81},
      {redValue : 165, greenValue : 210, blueValue : 111},
      {redValue : 158, greenValue : 204, blueValue : 139}];
  }
  else if(colorGradientValue == 6)
  {
    gradientColorItemsValue = [
      {redValue : 37, greenValue : 29, blueValue : 30}, //
      {redValue : 204, greenValue : 52, blueValue : 49},
      {redValue : 237, greenValue : 124, blueValue : 66},
      {redValue : 226, greenValue : 167, blueValue : 122},
      {redValue : 241, greenValue : 201, blueValue : 170},
      {redValue : 249, greenValue : 244, blueValue : 234}];
  }
  else if(colorGradientValue == 7)
  {
    gradientColorItemsValue = [
      {redValue : 27, greenValue : 22, blueValue : 23}, //
      {redValue : 40, greenValue : 41, blueValue : 40},
      {redValue : 68, greenValue : 107, blueValue : 39},
      {redValue : 74, greenValue : 89, blueValue : 52},
      {redValue : 106 , greenValue : 134, blueValue : 55},
      {redValue : 151, greenValue : 177, blueValue : 108},
      {redValue : 208, greenValue : 168, blueValue : 171}];
  }
  else if(colorGradientValue == 8)
  {
    gradientColorItemsValue = [
      {redValue : 212, greenValue : 214, blueValue : 238}, //
      {redValue : 244, greenValue : 231, blueValue : 232},
      {redValue : 209, greenValue : 211, blueValue : 211},
      {redValue : 210, greenValue : 33, blueValue : 49},
      {redValue : 157, greenValue : 152, blueValue : 144},
      {redValue : 254, greenValue : 114, blueValue : 112},
      {redValue : 104, greenValue : 100, blueValue : 98},
      {redValue : 175, greenValue : 43, blueValue : 43}];
  }

  return gradientColorItemsValue;

};




export const fillSectionWithAvgColour =  (canvasCtx, xCenterOfTriangle, yCenterOfTriangle, widthAndHeight) =>{
  if(canvasCtx){
        var idata = canvasCtx.getImageData(xCenterOfTriangle, yCenterOfTriangle, widthAndHeight, widthAndHeight);
        var bufferAvg = idata.data;
        var lenBufferAvg = bufferAvg.length;
  
        var redAvg = 0;
        var greenAvg = 0;
        var blueAvg = 0;
        var opacAvg = 0;
        for (var i = 0; i < lenBufferAvg; i += 4) {
  
          redAvg = bufferAvg[i];
          greenAvg = bufferAvg[i + 1];
          blueAvg = bufferAvg[i + 2];
          opacAvg = bufferAvg[i + 3];
        }

        canvasCtx.fillStyle = "rgba("+redAvg+", "+greenAvg+", "+blueAvg+", " + opacAvg + ")";
        canvasCtx.fill();
  }
};

export const getAndfillSectionWithAvgColour =  (canvasCtx, xCenterOfTriangle, yCenterOfTriangle, widthAndHeight) =>{
  var rgbaValue ="";
  if(canvasCtx){
        var idata = canvasCtx.getImageData(xCenterOfTriangle, yCenterOfTriangle, widthAndHeight, widthAndHeight);
        var bufferAvg = idata.data;
        var lenBufferAvg = bufferAvg.length;
  
        var redAvg = 0;
        var greenAvg = 0;
        var blueAvg = 0;
        var opacAvg = 0;
        for (var i = 0; i < lenBufferAvg; i += 4) {
  
          redAvg = bufferAvg[i];
          greenAvg = bufferAvg[i + 1];
          blueAvg = bufferAvg[i + 2];
          opacAvg = bufferAvg[i + 3];
        }
        rgbaValue = "rgba("+redAvg+", "+greenAvg+", "+blueAvg+", " + opacAvg + ")";
        canvasCtx.fillStyle = rgbaValue;
        canvasCtx.fill();
  }
  return rgbaValue;
};


export const generateRandomHexColors =  (globalcolorgradientValue) =>{

  var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
  var gradientColorItemsValue;

  function populate(a) {
    for ( var i = 0; i < 6; i++ ) {
      var x = Math.round( Math.random() * 14 );
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

    if(globalcolorgradientValue == 5)
    {
          gradientColorItemsValue = [
            populate('#'), 
            populate('#'), 
            populate('#'), 
            populate('#'), 
            populate('#')];
          
    }
    else if(globalcolorgradientValue == 10 )
    {
      gradientColorItemsValue = [
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#'), 
        populate('#')];
    }
    

  gradientColorItemsValue = convertHexToRGB(gradientColorItemsValue);
  return gradientColorItemsValue; 
};



export const convertHexToRGB =  (gradientColorItemsValue) =>{

  var dict = []; // create an empty array
    var pattern_color = "^#([A-Fa-f0-9]{6})$";
    for (let i = 0; i < gradientColorItemsValue.length; i++) {
        //var hex_color = gradientColorItemsValue[0][i];
        var hex_color = gradientColorItemsValue[i];

        if (hex_color.match(pattern_color)) {
          var hex_color = hex_color.replace("#", "");
          var r = parseInt(hex_color.substring(0, 2), 16);
          var g = parseInt(hex_color.substring(2, 4), 16);
          var b = parseInt(hex_color.substring(4, 6), 16);

          /*
          gradientColorItemsValue = [
            {redValue : 27, greenValue : 22, blueValue : 23}, //
            {redValue : 40, greenValue : 41, blueValue : 40},
            {redValue : 68, greenValue : 107, blueValue : 39},
            {redValue : 74, greenValue : 89, blueValue : 52},
            {redValue : 106 , greenValue : 134, blueValue : 55},
            {redValue : 151, greenValue : 177, blueValue : 108},
            {redValue : 208, greenValue : 168, blueValue : 171}];
          
          */

            dict.push({
              redValue: r,
              greenValue: g,
              blueValue: b
            });

          //return rgb_color.value = 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    }

  return dict;
  




};

export const convertHexToRGBV1 =  (gradientColorItemsValue) =>{

  var hex_color = document.getElementById('hex-color').value;
  var rgb_color = document.getElementById('rgb-color');
  var pattern_color = "^#([A-Fa-f0-9]{6})$";
  
  /*
  

  var gradientColorItemsValue = [
    {newColor1 : newColor1, 
      newColor2 : newColor2, 
      newColor3 : newColor3, 
      newColor4 : newColor4, 
      newColor5 : newColor5, 
      newColor6 : newColor6, 
      newColor7 : newColor7}];

      gradientColorItemsValue = [
      {redValue : 24, greenValue : 40, blueValue : 27}, //
      {redValue : 55, greenValue : 155, blueValue : 76},
      {redValue : 159, greenValue : 202, blueValue : 81},
      {redValue : 165, greenValue : 210, blueValue : 111},
      {redValue : 158, greenValue : 204, blueValue : 139}];

  
  */


    for (let i = 1; i <= gradientColorItemsValue.length; i++) {
        var hex_color = gradientColorItemsValue[i]
        if (hex_color.match(pattern_color)) {
          var hex_color = hex_color.replace("#", "");
          var r = parseInt(hex_color.substring(0, 2), 16);
          var g = parseInt(hex_color.substring(2, 4), 16);
          var b = parseInt(hex_color.substring(4, 6), 16);
          return rgb_color.value = 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    }

  if (hex_color.match(pattern_color)) {
    var hex_color = hex_color.replace("#", "");
    var r = parseInt(hex_color.substring(0, 2), 16);
    var g = parseInt(hex_color.substring(2, 4), 16);
    var b = parseInt(hex_color.substring(4, 6), 16);
    return rgb_color.value = 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  else {
    alert('Error Color Format');
  }





};
