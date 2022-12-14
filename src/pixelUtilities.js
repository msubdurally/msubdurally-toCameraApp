import * as pixelUtilHelper from "./pixelUtilitiesHelper"; 




export const GenerativePixel_Effects =  (canvasCtx, effectSubCategory, options) =>{
  if(canvasCtx){
        //PIXEL_EFFECT_001
        //PIXEL_EFFECT_002
        //effectSubCategory : "PIXEL_EFFECT_001",

        if(effectSubCategory  == "PIXEL_EFFECT_001" || "PIXEL_EFFECT_002")
        {
          pixelEffectWithColorGradient(canvasCtx, 
            { color: "white", 
              lineWidth: 0.124, 
              radius: 0.75, 
              numOfcells: options.numOfcells, 
              numberOfColors: options.numberOfColors,
              colorGradientValue: options.colorGradientValue,
              gradientColorItemsValue: options.gradientColorItemsValue});

        }else if(effectSubCategory  == "PIXEL_EFFECT_002" || 
          effectSubCategory  == "PIXEL_EFFECT_003" ||
          effectSubCategory  == "PIXEL_EFFECT_004" ||
          effectSubCategory  == "PIXEL_EFFECT_005" ||
          effectSubCategory  == "PIXEL_EFFECT_006" ||
          effectSubCategory  == "PIXEL_EFFECT_007" )
        {
          pixelEffectWithColorPattern(canvasCtx, 
            { color: "white", 
              lineWidth: 0.124, 
              radius: 0.75, 
              numOfcells: options.numOfcells, 
              numberOfColors: options.numberOfColors,
              colorGradientValue: options.colorGradientValue,
              gradientColorItemsValue: options.gradientColorItemsValue});
        }

        
        
       
  }
}; 



export const pixelEffectWithColorGradient =  (canvasCtx, options) =>{
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;
    var numberOfColors = options.numberOfColors;
    var colorGradientValue = options.colorGradientValue;
    var gradientColorItemsValue;
    if (typeof options.gradientColorItemsValue !== "undefined" && options.gradientColorItemsValue !== null)
    {
      //arrays of colourData template
      gradientColorItemsValue = options.gradientColorItemsValue;
    }
    var idata = canvasCtx.getImageData(nxt_X_StartPt, nxt_Y_StartPt, canvasWidth , canvasHeight);
    var buffer = idata.data;
    var lenBuffer = buffer.length;
    for (var i = 0; i < lenBuffer; i += 4) {
      var redValue = buffer[i];
      var greenValue = buffer[i + 1];
      var blueValue = buffer[i + 2];
      var alphaValue = buffer[i + 3]; //opacity
      let count = buffer[i] + buffer[i + 1] + buffer[i + 2];
      //using numberOfColors, and maximum possible value of count (i.e 256 + 256 + 256 = 768)
      //divide 256/numberOfColors 
      // for each numberOfColors find corresponding sets of colour 
      //eg numberOfColors , make use of gray, white, black   or dark blue/blue/pale blue 

      let colour = 0;
      if(numberOfColors > 0)
      {
        var rangeValue = (768)/numberOfColors; 
        for(var x = 1; x <= numberOfColors; x++)
        {
          if(count >= (rangeValue * x)){
            if(gradientColorItemsValue[x-1] !== null && typeof gradientColorItemsValue[x-1] !== "undefined")
            {
              redValue = gradientColorItemsValue[x-1].redValue;
              greenValue = gradientColorItemsValue[x-1].greenValue;
              blueValue = gradientColorItemsValue[x-1].blueValue;
            }
          }
        }
      } 
      buffer[i] = redValue;
      buffer[i + 1] = greenValue;
      buffer[i + 2] = blueValue;   
      buffer[i + 3] = 255;
    }
    canvasCtx.putImageData(idata, nxt_X_StartPt, nxt_Y_StartPt);
  }
};


export const pixelEffectWithColorPattern =  (canvasCtx, options) =>{
  //Fill canvas with pixel sub values and using ranges from slider 
  // apply different colour gradients 
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;
    var numberOfColors = options.numberOfColors;
    var colorGradientValue = options.colorGradientValue;
    var gradientColorItemsValue;
    if (typeof options.gradientColorItemsValue !== "undefined" && options.gradientColorItemsValue !== null)
    {
      gradientColorItemsValue = options.gradientColorItemsValue;
    }else{
      gradientColorItemsValue = [
        {redValue : 27, greenValue : 22, blueValue : 23}, //
        {redValue : 40, greenValue : 41, blueValue : 40},
        {redValue : 68, greenValue : 107, blueValue : 39},
        {redValue : 74, greenValue : 89, blueValue : 52},
        {redValue : 106 , greenValue : 134, blueValue : 55},
        {redValue : 151, greenValue : 177, blueValue : 108},
        {redValue : 208, greenValue : 168, blueValue : 171}];
      
    }
    var idata = canvasCtx.getImageData(nxt_X_StartPt, nxt_Y_StartPt, canvasWidth , canvasHeight);
    var buffer = idata.data;
    var lenBuffer = buffer.length;
    var colorItems = [
      {redValue : 190, greenValue : 194, blueValue : 197},
      {redValue : 105, greenValue : 109, blueValue : 113},
      {redValue : 12, greenValue : 14, blueValue : 16},
      {redValue : 91, greenValue : 95, blueValue : 98},
      {redValue : 0, greenValue : 0, blueValue : 0},
      {redValue : 32, greenValue : 34, blueValue : 36},
      {redValue : 255, greenValue : 0, blueValue : 0},
      {redValue : 0, greenValue : 255, blueValue : 0}];

    for (var i = 0; i < lenBuffer; i += 4) {
      var redValue = buffer[i];
      var greenValue = buffer[i + 1];
      var blueValue = buffer[i + 2];
      var alphaValue = buffer[i + 3]; //opacity
      let count = buffer[i] + buffer[i + 1] + buffer[i + 2];
      //using numberOfColors, and maximum possible value of count (i.e 256 + 256 + 256 = 768)
      //divide 256/numberOfColors 
      // for each numberOfColors find corresponding sets of colour 
      //eg numberOfColors , make use of gray, white, black   or dark blue/blue/pale blue 

      let colour = 0;
      if(numberOfColors > 0)
      { 
        var rangeValue = (768)/numberOfColors; 
        for(var x = 1; x <= numberOfColors; x++)
        {
          if(count >= (rangeValue * x)){
            if(colorGradientValue >= 1 && (gradientColorItemsValue[x-1] !== null && typeof gradientColorItemsValue[x-1] !== "undefined")){
              redValue = gradientColorItemsValue[x-1].redValue;
              greenValue = gradientColorItemsValue[x-1].greenValue;
              blueValue = gradientColorItemsValue[x-1].blueValue; 
            }else{
              redValue = colorItems[x-1].redValue;
              greenValue = colorItems[x-1].greenValue;
              blueValue = colorItems[x-1].blueValue; 
            }
          }
        }
      } 
      buffer[i] = redValue;
      buffer[i + 1] = greenValue;
      buffer[i + 2] = blueValue;   
      buffer[i + 3] = 255;
    }
    canvasCtx.putImageData(idata, nxt_X_StartPt, nxt_Y_StartPt);
  }
};



///////////////////////////
/*
CARTOON EFFECT 


*/


export const GenerativeCartoon_Effects =  (canvasCtx, effectSubCategory, options) =>{
  if(canvasCtx){
        //PIXEL_EFFECT_001
        //PIXEL_EFFECT_002
        //effectSubCategory : "PIXEL_EFFECT_001",

        if(effectSubCategory  == "CARTOON_EFFECT_001")
        {
          pixelEffectWithCartoonEffect(canvasCtx, 
            { color: "white", 
              lineWidth: 0.124, 
              radius: 0.75, 
              numOfcells: options.numOfcells, 
              numberOfColors: options.numberOfColors,
              colorGradientValue: options.colorGradientValue,
              gradientColorItemsValue: options.gradientColorItemsValue});

        }else if(effectSubCategory  == "CARTOON_EFFECT_002")
        {
          pixelEffectWithCartoonEffectV2(canvasCtx, 
            { color: "white", 
              lineWidth: 0.124, 
              radius: 0.75, 
              numOfcells: options.numOfcells, 
              numberOfColors: options.numberOfColors,
              colorGradientValue: options.colorGradientValue,
              gradientColorItemsValue: options.gradientColorItemsValue});

        }
        

        
        
       
  }
}; 


// Returns an array of the surrounding pixels for a given pixel
function getSurroundingPixels(x, y, kernelSize, data, width, height) {
  const surroundingPixels = [];
  for (let i = -kernelSize; i <= kernelSize; i++) {
    for (let j = -kernelSize; j <= kernelSize; j++) {
      if (x + i >= 0 && x + i < width && y + j >= 0 && y + j < height) {
        const pixelIndex = ((y + j) * width + (x + i)) * 4;
        surroundingPixels.push(data[pixelIndex]);
      }
    }
  }
  return surroundingPixels;
}

function getMedian(values){
  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}


export const removeNoise =  (canvasCtx, options) =>{
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;
    var numberOfColors = options.numberOfColors;
    var colorGradientValue = options.colorGradientValue;
    var gradientColorItemsValue;
    //previous kernel size was 3
    const kernelSize = 1;

    if (typeof options.gradientColorItemsValue !== "undefined" && options.gradientColorItemsValue !== null)
    {
      //arrays of colourData template
      gradientColorItemsValue = options.gradientColorItemsValue;
    }
    var idata = canvasCtx.getImageData(nxt_X_StartPt, nxt_Y_StartPt, canvasWidth , canvasHeight);
    var buffer = idata.data;
    var lenBuffer = buffer.length;

  // Loop through each pixel in the image and apply the median filter
    for (let y = 0; y < canvasHeight; y++) {
      for (let x = 0; x < canvasWidth; x++) {
        const pixelIndex = (y * canvasWidth + x) * 4;

        // Calculate the median value of the surrounding pixels
        const surroundingPixels = getSurroundingPixels(x, y, kernelSize, buffer, canvasWidth, canvasHeight);
        //median
        const median = getMedian(surroundingPixels);

        // Replace the current pixel with the median value
        buffer[pixelIndex] = median;
        buffer[pixelIndex + 1] = median;
        buffer[pixelIndex + 2] = median;
      }
    }







    for (var i = 0; i < lenBuffer; i += 4) {
      var redValue = buffer[i];
      var greenValue = buffer[i + 1];
      var blueValue = buffer[i + 2];
      var alphaValue = buffer[i + 3]; //opacity
      let count = buffer[i] + buffer[i + 1] + buffer[i + 2];
      //using numberOfColors, and maximum possible value of count (i.e 256 + 256 + 256 = 768)
      //divide 256/numberOfColors 
      // for each numberOfColors find corresponding sets of colour 
      //eg numberOfColors , make use of gray, white, black   or dark blue/blue/pale blue 

      let colour = 0;
      if(numberOfColors > 0)
      {
        var rangeValue = (768)/numberOfColors; 
        for(var x = 1; x <= numberOfColors; x++)
        {
          if(count >= (rangeValue * x)){
            if(gradientColorItemsValue[x-1] !== null && typeof gradientColorItemsValue[x-1] !== "undefined")
            {
              redValue = gradientColorItemsValue[x-1].redValue;
              greenValue = gradientColorItemsValue[x-1].greenValue;
              blueValue = gradientColorItemsValue[x-1].blueValue;
            }
          }
        }
      } 
      buffer[i] = redValue;
      buffer[i + 1] = greenValue;
      buffer[i + 2] = blueValue;   
      buffer[i + 3] = 255;
    }
    canvasCtx.putImageData(idata, nxt_X_StartPt, nxt_Y_StartPt);
  }
};




export const pixelEffectWithCartoonEffect =  (canvasCtx, options) =>{
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;
    var numberOfColors = options.numberOfColors;
    var colorGradientValue = options.colorGradientValue;
    var gradientColorItemsValue;
    if (typeof options.gradientColorItemsValue !== "undefined" && options.gradientColorItemsValue !== null)
    {
      //arrays of colourData template
      gradientColorItemsValue = options.gradientColorItemsValue;
    }
    var idata = canvasCtx.getImageData(nxt_X_StartPt, nxt_Y_StartPt, canvasWidth , canvasHeight);
    var buffer = idata.data;
    var lenBuffer = buffer.length;
    for (var i = 0; i < lenBuffer; i += 4) {
      var redValue = buffer[i];
      var greenValue = buffer[i + 1];
      var blueValue = buffer[i + 2];
      var alphaValue = buffer[i + 3]; //opacity
      let count = buffer[i] + buffer[i + 1] + buffer[i + 2];
      //using numberOfColors, and maximum possible value of count (i.e 256 + 256 + 256 = 768)
      //divide 256/numberOfColors 
      // for each numberOfColors find corresponding sets of colour 
      //eg numberOfColors , make use of gray, white, black   or dark blue/blue/pale blue 

      let colour = 0;
      if(numberOfColors > 0)
      {
        var rangeValue = (768)/numberOfColors; 
        for(var x = 1; x <= numberOfColors; x++)
        {
          if(count >= (rangeValue * x)){
            if(gradientColorItemsValue[x-1] !== null && typeof gradientColorItemsValue[x-1] !== "undefined")
            {
              redValue = gradientColorItemsValue[x-1].redValue;
              greenValue = gradientColorItemsValue[x-1].greenValue;
              blueValue = gradientColorItemsValue[x-1].blueValue;
            }
          }
        }
      } 
      buffer[i] = redValue;
      buffer[i + 1] = greenValue;
      buffer[i + 2] = blueValue;   
      buffer[i + 3] = 255;
    }
    canvasCtx.putImageData(idata, nxt_X_StartPt, nxt_Y_StartPt);
  }
};



export const pixelEffectWithCartoonEffectV2 =  (canvasCtx, options) =>{
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;
    var numberOfColors = options.numberOfColors;
    var colorGradientValue = options.colorGradientValue;
    var gradientColorItemsValue;
    if (typeof options.gradientColorItemsValue !== "undefined" && options.gradientColorItemsValue !== null)
    {
      //arrays of colourData template
      gradientColorItemsValue = options.gradientColorItemsValue;
    }
    var idata = canvasCtx.getImageData(nxt_X_StartPt, nxt_Y_StartPt, canvasWidth , canvasHeight);
    var buffer = idata.data;
    var lenBuffer = buffer.length;

    for (var i = 0; i < lenBuffer; i += 4) {
      buffer[i] += 50; // red channel
      if (buffer[i] > 255) buffer[i] -= 255;
    }

    drawRandomCircle(canvasCtx);
    canvasCtx.putImageData(idata, nxt_X_StartPt, nxt_Y_StartPt);
  }
};

export const drawRandomCircle = (canvasCtx) => {
  //var canvas = document.getElementById("canvas");
  //var ctx = canvas.getContext("2d");

  var canvas = canvasCtx.canvas; 

  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = Math.random() * 50;
  var color = '#'+Math.floor(Math.random()*16777215).toString(16);

  canvasCtx.beginPath();
  canvasCtx.arc(x, y, radius, 0, 2 * Math.PI);
  canvasCtx.fillStyle = color;
  canvasCtx.fill();
};