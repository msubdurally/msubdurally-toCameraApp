
//utilHelper. 

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

