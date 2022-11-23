import * as utilHelper from "./artUtilitiesHelper"; 

export const drawSquaresOnImgCanvas =  (canvasCtx, options) =>{
  //convert canvas in sub cells 
  // for each cells get average pixel values and set color on sub cells 
  // Note may be used as template 
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var thresholdCount = options.numOfcells;
    var cellWidth = canvasWidth/thresholdCount;
    var cellHeight = canvasHeight/thresholdCount;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;

    for(var y = 0; y < thresholdCount; y++){
      for(var x=0; x< thresholdCount; x++){
        canvasCtx.beginPath();
        canvasCtx.moveTo(nxt_X_StartPt, nxt_Y_StartPt);  
        canvasCtx.lineTo(nxt_X_StartPt + cellWidth, nxt_Y_StartPt);   
        canvasCtx.lineTo(nxt_X_StartPt + cellWidth, nxt_Y_StartPt + cellHeight);    
        canvasCtx.lineTo(nxt_X_StartPt, nxt_Y_StartPt + cellHeight);
        canvasCtx.lineTo(nxt_X_StartPt, nxt_Y_StartPt);  
        utilHelper.fillSectionWithAvgColour(canvasCtx, (nxt_X_StartPt + (cellWidth/2)), (nxt_Y_StartPt + (cellHeight/2)), 1);
        nxt_X_StartPt = nxt_X_StartPt + cellWidth;
      }
      nxt_X_StartPt = 0;
      nxt_Y_StartPt = nxt_Y_StartPt + cellHeight;
    }
  }
};


export const averagePixelsOnImgCanvas =  (canvasCtx, options) =>{
  //Fill canvas with subcells and average pixel values
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width ;
    var canvasHeight  =  canvasss.height ;
    var thresholdCount = 70;
    var cellWidth = canvasWidth/thresholdCount;
    var cellHeight = canvasHeight/thresholdCount;
    var nxt_X_StartPt = 0;
    var nxt_Y_StartPt = 0;
    var colorItems = ["Red", "Orange", "Yellow", "Green", "Cyan", "Magenta"];
    canvasCtx.fillStyle  =  colorItems[Math.floor(Math.random()*colorItems.length)];
    for(var y = 0; y < thresholdCount; y++){
      for(var x=0; x < thresholdCount; x++){
        canvasCtx.beginPath();
        canvasCtx.moveTo(nxt_X_StartPt, nxt_Y_StartPt);  
        canvasCtx.lineTo(nxt_X_StartPt + cellWidth, nxt_Y_StartPt);   
        canvasCtx.lineTo(nxt_X_StartPt + cellWidth, nxt_Y_StartPt + cellHeight);    
        canvasCtx.lineTo(nxt_X_StartPt, nxt_Y_StartPt + cellHeight);
        canvasCtx.lineTo(nxt_X_StartPt, nxt_Y_StartPt);  
        var averageData = canvasCtx.getImageData((nxt_X_StartPt  + (thresholdCount/2)), (nxt_Y_StartPt + (thresholdCount/2)), 1, 1);
        var bufferAvg = averageData.data;
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
        nxt_X_StartPt = nxt_X_StartPt + cellWidth;
      }
      nxt_X_StartPt = 0;
      nxt_Y_StartPt = nxt_Y_StartPt + cellHeight;
    }
  }
};

/////////////////////////////////
///////   START : GENERATIVE ARTS
/////////////////////////////////

//video_GenerativeArt1
export const video_GenerativeArt1 =  (canvasCtx, options) =>{
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var size = 420;
    var dpr = window.devicePixelRatio;
    canvasss.width= (size * dpr) ;
    canvasss.height = (size * dpr)  ;
    canvasCtx.scale(dpr, dpr);
    canvasCtx.lineJoin = 'bevel';      
    var line, dot,
    odd = false, 
    lines = [], 
    gap = size / 10;

    for(var y = gap / 2; y <= size; y+= gap) {
      odd = !odd;
      line = [];
      for(var x = gap / 4; x <= size; x+= gap) {
        dot = {x: x + (odd ? gap/2 : 0), y: y};
        line.push({
          x: x + (Math.random()*.8 - .4) * gap  + (odd ? gap/2 : 0),
          y: y + (Math.random()*.8 - .4) * gap
        });
        //canvasCtx.fill();
      }
      lines.push(line);
    }

    function drawSquareSets(pointA, pointB, pointC) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(pointA.x, pointA.y);
      canvasCtx.lineTo(pointB.x, pointB.y);
      canvasCtx.lineTo(pointC.x, pointC.y);
      canvasCtx.lineTo(pointA.x, pointA.y);
      canvasCtx.closePath();
      var ctxImgdata = canvasCtx.getImageData((pointA.x + pointB.x + pointC.x)/3, (pointA.y + pointB.y + pointC.y)/3 , 1, 1).data;
      var bufferAvg = ctxImgdata;
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
      canvasCtx.stroke();
    }
    var dotLine;
    odd = true;
    for(var y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      dotLine = [];
      for(var i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);
        dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
      }
      for(var i = 0; i < dotLine.length - 2; i++) {
        drawSquareSets(dotLine[i], dotLine[i+1], dotLine[i+2]);
      }
    }
  }
};




export const pixelEffect1 =  (canvasCtx, options) =>{
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
            if(colorGradientValue >= 1){
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




/////////////////////////////////////
///////////////GENERATIVE ART 
/////////////////////////////////////
//utilities.GenerativeArt_Square1(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});

export const GenerativeArt_Effects =  (canvasCtx, effectSubCategory, options, globalnumOfcells, globalgradientColorItemsValue) =>{
  if(canvasCtx){
        if(effectSubCategory  == "REMOVE_COLORPATTERN_EFFECT")
        {
          GenerativeArt_Square1(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
        else if(effectSubCategory  == "GENERATIVE_ART1")
        {
          GenerativeArt_Square1(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
        else if(effectSubCategory  == "GENERATIVE_ART2")
        {
          GenerativeArt_Square2(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
        else if(effectSubCategory  == "GENERATIVE_ART3")
        {
          //pixelEffect1(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numberOfColors: 4, colorGradientValue : 3, gradientColorItemsValue: globalgradientColorItemsValue});
          GenerativeArt_Square3(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
        else if(effectSubCategory  == "GENERATIVE_ART4")
        {
          GenerativeArt_Square4(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
        else if(effectSubCategory  == "GENERATIVE_ART5")
        {
          GenerativeArt_5(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
        else if(effectSubCategory  == "GENERATIVE_ART6")
        {
          //utilities.GenerativeArt_6(canvasCtx, { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalnumOfcells});
        }
  }
}; 
export const GenerativeArt_Square1 =  (canvasCtx, options) =>{
  if(canvasCtx){
    var globalgradientColorItemsValue = utilHelper.getImageColorArray(8);
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var horizontalsize = canvasss.width;
    var verticalsize = canvasss.height;
    canvasCtx.lineWidth = 0.2;
    var finalSize = 10;
    var startSteps;
    var offset = 2;
    var tileStep = (canvasWidth - offset * 2) / options.numOfcells;
    var startSize = tileStep;
    var directions = [1, 1, 1];
    function draw(x, y, width, height, xMovement, yMovement, steps) {
      canvasCtx.beginPath();
      canvasCtx.rect(x, y, width, height);
      if(typeof globalgradientColorItemsValue[steps] !== "undefined" && globalgradientColorItemsValue[steps] !== null)
      {
        canvasCtx.fillStyle = "rgba("+globalgradientColorItemsValue[steps].redValue+", "+globalgradientColorItemsValue[steps].greenValue+", "+globalgradientColorItemsValue[steps].blueValue+", " + 0.1 + ")";
        canvasCtx.fill();
      }else{
        canvasCtx.fillStyle = "rgba("+globalgradientColorItemsValue[0].redValue+", "+globalgradientColorItemsValue[0].greenValue+", "+globalgradientColorItemsValue[0].blueValue+", " + 0.1 + ")";
        canvasCtx.fill();
      }
      canvasCtx.stroke();
      if(steps >= 0) {
        var newSize = (startSize) * (steps / startSteps) + finalSize;
        var newX = x + (width - newSize) / 2
        var newY = y + (height - newSize) / 2
        newX = newX - ((x - newX) / (steps + 2)) * xMovement
        newY = newY - ((y - newY) / (steps + 2)) * yMovement
        draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
      }
    }
    
    for( var x = offset; x < horizontalsize - offset; x += tileStep) {
      for( var y = offset; y < verticalsize - offset; y += tileStep) {
        startSteps = 2 + Math.ceil(Math.random() * 3);
        var xDirection = directions[Math.floor(Math.random() * directions.length)];
        var yDirection = directions[Math.floor(Math.random() * directions.length)];
        draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
      }
    }
  }
}; 


export const GenerativeArt_Square2 =  (canvasCtx, options) =>{
  //Fill canvas with irregular boxes
  if(canvasCtx){
    var globalgradientColorItemsValue = utilHelper.getImageColorArray(8);
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var canvasWidth  = canvasss.width;
    var canvasHeight  =  canvasss.height;
    var horizontalsize = canvasss.width;
    var verticalsize = canvasss.height;
    canvasCtx.lineWidth = 0.2;
    var finalSize = 10;
    var startSteps;
    var offset = 2;
    var xtileStep = (canvasWidth - offset * 2) / options.numOfcells;
    var ytileStep = (canvasHeight - offset * 2) / options.numOfcells;
    var startSize = xtileStep;
    var directions = [-1, 0, 1];

    function draw(x, y, width, height, xMovement, yMovement, steps) {
      canvasCtx.beginPath();
      canvasCtx.rect(x, y, width, height);
      utilHelper.fillSectionWithAvgColour(canvasCtx, (x + (width/2)), (y + (height/2)), 1);
      canvasCtx.stroke();
      if(steps >= 0) {
        var newSize = (startSize) * (steps / startSteps) + finalSize;
        var newX = x + (width - newSize) / 2
        var newY = y + (height - newSize) / 2
        newX = newX - ((x - newX) / (steps + 2)) * xMovement
        newY = newY - ((y - newY) / (steps + 2)) * yMovement
        draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
      }
    }
    
    for( var x = offset; x < horizontalsize - offset; x += xtileStep) {
      for( var y = offset; y < verticalsize - offset; y += ytileStep) {
        startSteps = 3;
        var xDirection = directions[Math.floor(Math.random() * directions.length)];
        var yDirection = directions[Math.floor(Math.random() * directions.length)];
        draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
      }
    }
  }
};



export const GenerativeArt_Square3 =  (canvasCtx, options) =>{
  // Fill canvas with Circles of range radiuses
  // circles are drawn to avoid colisions
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    canvasCtx.lineWidth = 1;
    var size = canvasss.width;
    canvasCtx.lineWidth = 2;
    var circles = [];
    var minRadius = 2;
    var maxRadius = 5;
    var totalCircles = options.numOfcells;
    var createCircleAttempts = options.numOfcells;
    function createAndDrawCircle() {
      var newCircle;
      var circleSafeToDraw = false;
      for(var tries = 0; tries < createCircleAttempts; tries++) {
        newCircle = {
          x: Math.floor(Math.random() * size),
          y: Math.floor(Math.random() * size),
          radius: minRadius
        }
        if(doesCircleHaveACollision(newCircle)) {
          continue;
        } else {
          circleSafeToDraw = true;
          break;
        }
      }
      if(!circleSafeToDraw) {
        return;
      }
      for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
        newCircle.radius = radiusSize;
        if(doesCircleHaveACollision(newCircle)){
          newCircle.radius--;
          break;
        } 
      }
      circles.push(newCircle);
      canvasCtx.beginPath();
      canvasCtx.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
      utilHelper.fillSectionWithAvgColour(canvasCtx, newCircle.x, newCircle.y, 1);
    }

    function doesCircleHaveACollision(circle) {
      for(var i = 0; i < circles.length; i++) {
        var otherCircle = circles[i];
        var a = circle.radius + otherCircle.radius;
        var x = circle.x - otherCircle.x;
        var y = circle.y - otherCircle.y;
        if (a >= Math.sqrt((x*x) + (y*y))) {
          return true;
        }
      }
      
      if(circle.x + circle.radius >= size ||
        circle.x - circle.radius <= 0) {
        return true;
      }
        
      if(circle.y + circle.radius >= size ||
          circle.y - circle.radius <= 0) {
        return true;
      }
      return false;
    }
    for( var i = 0; i < totalCircles; i++ ) {  
      createAndDrawCircle();
    }
  }
};


export const GenerativeArt_Square4 =  (canvasCtx, options) =>{
  //fill canvas with Tile likes sections 
  //NO collisions
  if(canvasCtx){
    //var globalgradientColorItemsValue = utilHelper.getImageColorArray(8);
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var horizontalsize = canvasss.width;
    var verticalsize = canvasss.height;
    var startSteps;
    var xtileStep = (horizontalsize) / options.numOfcells;; //130
    var ytileStep = (verticalsize) / options.numOfcells;; //130
    var widthSize = xtileStep;
    var heightSize = ytileStep;

    function drawHor(x, y, width, height, steps, hor) {
      canvasCtx.beginPath();
      var newWidth = width;
      var newHeight = height;
      var newX = x;
      var newY = y;
      canvasCtx.rect(newX, newY, newWidth, newHeight);
      var shadowColor = utilHelper.getAndfillSectionWithAvgColour(canvasCtx, (newX + (width/2)), (newY + (height/2)), 1);
      canvasCtx.shadowColor = shadowColor;
      canvasCtx.shadowOffsetX = 0; //integer Horizontal distance of the shadow, in relation to the text.
      canvasCtx.shadowOffsetY = 0; // integer Vertical distance of the shadow, in relation to the text.
      canvasCtx.shadowBlur = 10; // integer Blurring effect to the shadow, the larger the value, the greater the blur.
      //canvasCtx.fill();
      //canvasCtx.stroke();//uncomment if using linewidth
    }

    var hor= true;
    for( var x = 0; x < horizontalsize; x += xtileStep) {
      for( var y = 0; y < verticalsize; y += ytileStep) {
        startSteps = 4;
        var updatedWidthSize = widthSize;
        var updatedHeightSize = heightSize;
        if(hor){
          updatedHeightSize = updatedHeightSize;
          drawHor(x, y, updatedWidthSize, (updatedHeightSize / 5), startSteps, hor); 
          drawHor(x, y + (0.2 * updatedHeightSize), updatedWidthSize, (updatedHeightSize / 5), startSteps, hor); 
          drawHor(x, y + (0.4 * updatedHeightSize), updatedWidthSize, (updatedHeightSize / 5), startSteps, hor); 
          drawHor(x, y + (0.6 * updatedHeightSize), updatedWidthSize, (updatedHeightSize / 5), startSteps, hor); 
          drawHor(x, y + (0.8 * updatedHeightSize), updatedWidthSize, (updatedHeightSize / 5), startSteps, hor); 
        }else{
          updatedWidthSize = updatedWidthSize;
          drawHor(x , y, (updatedWidthSize / 5), updatedHeightSize, startSteps, hor); 
          drawHor(x + (0.2 * updatedWidthSize), y , (updatedWidthSize / 5), updatedHeightSize, startSteps, hor); 
          drawHor(x + (0.4 * updatedWidthSize), y , (updatedWidthSize / 5), updatedHeightSize, startSteps, hor); 
          drawHor(x + (0.6 * updatedWidthSize), y , (updatedWidthSize / 5), updatedHeightSize, startSteps, hor); 
          drawHor(x + (0.8 * updatedWidthSize), y , (updatedWidthSize / 5), updatedHeightSize, startSteps, hor); 
          
        }
        hor = hor ? false : true;
        startSteps =  startSteps - 1;
      }
    }
  }
};



export const GenerativeArt_5 =  (canvasCtx, options) =>{
  //fill canvas with circles of random radius and set average pixel values
  // Collisions and overlaps may be present 
  if(canvasCtx){
    canvasCtx.save();
    var canvasss = canvasCtx.canvas; 
    var horizontalsize = canvasss.width;
    var verticalsize = canvasss.height;
    var startSteps;
    var xtileStep = (horizontalsize) / options.numOfcells;; //130
    var ytileStep = (verticalsize) / options.numOfcells;; //130
    var widthSize = xtileStep;
    var heightSize = ytileStep;

    function drawCirc(x, y, width, height, steps, hor) {
      canvasCtx.beginPath();
      var newRadius = width;
      var newX = x;
      var newY = y;
      canvasCtx.arc(newX, newY, (newRadius/2) * Math.random(), 0, 2*Math.PI);
      utilHelper.fillSectionWithAvgColour(canvasCtx, newX, newY, 1);
    }
    
    var hor= true;
    for( var x = 0; x < horizontalsize; x += xtileStep) {
      for( var y = 0; y < verticalsize; y += ytileStep) {
        startSteps = 4;
        var updatedWidthSize = widthSize;
        var updatedHeightSize = heightSize;
        if(hor){
          updatedHeightSize = updatedHeightSize;
        }else{
          updatedWidthSize = updatedWidthSize;
        }
          drawCirc(x, y, updatedWidthSize, updatedHeightSize, startSteps, hor); 

          drawCirc(x, y + (0.2 * updatedHeightSize), updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.2 * updatedWidthSize), y , updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.2 * updatedWidthSize), y + (0.2 * updatedHeightSize) , updatedWidthSize, updatedHeightSize, startSteps, hor); 
        
          drawCirc(x, y + (0.4 * updatedHeightSize), updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.4 * updatedWidthSize), y , updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.4 * updatedWidthSize), y + (0.4 * updatedHeightSize) , updatedWidthSize, updatedHeightSize, startSteps, hor); 

          drawCirc(x, y + (0.6 * updatedHeightSize), updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.6 * updatedWidthSize), y , updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.6 * updatedWidthSize), y + (0.6 * updatedHeightSize) , updatedWidthSize, updatedHeightSize, startSteps, hor); 
        
          drawCirc(x, y + (0.8 * updatedHeightSize), updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.8 * updatedWidthSize), y , updatedWidthSize, updatedHeightSize, startSteps, hor); 
          drawCirc(x + (0.8 * updatedWidthSize), y + (0.8 * updatedHeightSize) , updatedWidthSize, updatedHeightSize, startSteps, hor); 

        hor = hor ? false : true;
        startSteps =  startSteps - 1;
      }
    }
  }
};




/////////////////////////////////
///////   END : GENERATIVE ARTS
/////////////////////////////////