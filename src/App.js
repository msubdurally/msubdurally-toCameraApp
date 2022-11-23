import React, { useRef, useEffect , useState, Fragment} from "react";
import canvasToImage from 'canvas-to-image';
import {  ColorPatternPicker } from './components';

import * as artUtil from "./artUtilities"; 
import * as artUtilHelper from "./artUtilitiesHelper"; 

import * as pixelUtil from "./pixelUtilities"; 
import * as pixelUtilhelper from "./pixelUtilitiesHelper"; 


import './menu.css';
import mainMenu from '../src/menuIcons/MainMenu.png';
import startCamIco from '../src/menuIcons/startCamera.png';
import stopCamIco from '../src/menuIcons/stopCamera.png';
import takePictureIco from '../src/menuIcons/takePicture.png';
import camEffect1Ico from '../src/menuIcons/cameraEffect1.png';
import camEffect2Ico from '../src/menuIcons/cameraEffect2.png';
import canvasEffectico from '../src/menuIcons/canvasEffectV2.png';
import backgroundArrowImg from '../src/menuIcons/backgroundMenuArrow.png';





var selectedEffectMenu = "";
var globalnumOfColoursValue = "";
var globalcolorgradientValue = "";
var globalEffectSubCategory = "";
var globalnumOfcells = 10;
var globalgradientColorItemsValue;


//First Effect is reserved for Pixel Effect
//Second Effect is reserved for Pattern Effect
var globalEffectListOption = [
  {
     "globalEffectCategory":"",
     "globalEffectSubCategory":"",
     "globalnumOfColoursValue": 0,
     "globalcolorgradientValue": 0,
     "globalnumOfcells": 0,
     "globalgradientColorItemsValue": []
  },
  {
    "globalEffectCategory":"",
    "globalEffectSubCategory":"",
    "globalnumOfColoursValue": 0,
    "globalcolorgradientValue": 0,
    "globalnumOfcells": 0,
    "globalgradientColorItemsValue": []
 }
];


function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  let menuRef = useRef();

  //START Picture Buttons
  const takePhoto = () => {
    const width =  canvasRef.current.width;
    const height = canvasRef.current.height;
    let video = canvasRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  }

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  }

  const downloadPhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hrs = newDate.getHours();
    let mins = newDate.getMinutes();

    var imageName = 'tocamera_'+date+'_'+month+'_'+year+'_'+hrs+'_'+mins;
    canvasToImage(ctx.canvas, {
      name: imageName,
      type: 'png',
      quality: 1
    });

  }

  //END Picture Buttons

  const stopCamera = () =>{
    console.log(' stopCamera');
    selectedEffectMenu = "";
    setCameraOn(false);
    turnCameraOn(false);
  }


  const startCamera = () =>{
    console.log(' startCamera');
    selectedEffectMenu = "";
    setCameraOn(true);
    turnCameraOn(true);
  }


  const turnCameraOn =  (turnOn) => {
    if(cameraOn && turnOn)
    {
      navigator.mediaDevices
      .getUserMedia({ 
        video: {width: 640, height: 480 } 
      }).then(stream => {
          let video = videoRef.current;
          if (typeof videoRef.current !== "undefined" && videoRef.current !== null)
          {
            video.srcObject = stream;
            var playPromise =  video.play();        
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                //video.stop();
                console.log(' Automatic playback started!');
                if (typeof video !== "undefined" && video !== null)
                {
                  console.log('    videoFrame : ', video.video);
                }
                else
                {
                  console.log('web cam is undefined');
                }
              }) 
              .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                console.log('startPlayingVideo : Error :', error);
              });
            }
          }
      }).catch(err => {
        console.log('startPlayingVideo : Err :', err);
      });
    }

    if(!turnOn){
      window.location.reload(true);
      console.log('need to turn off camera');
    }
  }


  const generateRandomColorEffectV1 = () => {
    videoCanvasEffect("PIXEL", "PIXEL", "PIXEL_EFFECT_001", 5, 5, 20);
  }

  const generateRandomColorEffectV2 = () => {
    videoCanvasEffect("PIXEL", "PIXEL", "PIXEL_EFFECT_002", 5, 10, 20);
  }


  const videoCanvasEffect = (videoCanvasEffectParam, effectCategory, effectSubCategory, numOfColoursValue, colorgradientValue, numOfcells) =>{
    selectedEffectMenu = videoCanvasEffectParam;
    if (typeof videoRef.current !== "undefined" && videoRef.current !== null)
    {
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");

      if(cameraOn && typeof videoRef.current !== "undefined" && videoRef.current !== null)
      {
        if(effectCategory == "PIXEL")
        {
          globalnumOfColoursValue = numOfColoursValue == 0 ? 8 : numOfColoursValue;
          globalcolorgradientValue = colorgradientValue == 0 ? 8 : colorgradientValue;
          globalgradientColorItemsValue = pixelUtilhelper.generateRandomHexColors(globalcolorgradientValue);
          if(globalgradientColorItemsValue && globalgradientColorItemsValue.length > 0){
            globalnumOfColoursValue = globalgradientColorItemsValue.length;
          }
        }
        else
        {
          globalgradientColorItemsValue = artUtilHelper.getImageColorArray(globalcolorgradientValue);
        }

        if(effectCategory == "GENERATIVE_ART")
        {
          globalnumOfcells = numOfcells == 0 ? 10 : numOfcells;
          if(effectSubCategory  == "GENERATIVE_ART3")
          {
            globalgradientColorItemsValue = artUtilHelper.getImageColorArray(3);
          }
        }

        
        globalEffectSubCategory = effectSubCategory;
        
        //globalEffectListOption
        //First Effect is reserved for Pixel Effect
        //Second Effect is reserved for Pattern Effect

        if(typeof globalEffectListOption !== "undefined" && globalEffectListOption !== null && globalEffectListOption.length > 0)
        {
          if(effectCategory == "PIXEL")
          {
            globalEffectListOption[0].globalEffectCategory = effectCategory;
            globalEffectListOption[0].globalEffectSubCategory = globalEffectSubCategory;
            globalEffectListOption[0].globalnumOfColoursValue = globalnumOfColoursValue;
            globalEffectListOption[0].globalcolorgradientValue = globalcolorgradientValue;
            globalEffectListOption[0].globalnumOfcells = globalnumOfcells;
            globalEffectListOption[0].globalgradientColorItemsValue = globalgradientColorItemsValue;

          }
          else if (effectCategory == "GENERATIVE_ART")
          {
            globalEffectListOption[1].globalEffectCategory = effectCategory;
            globalEffectListOption[1].globalEffectSubCategory = globalEffectSubCategory;
            globalEffectListOption[1].globalnumOfColoursValue = globalnumOfColoursValue;
            globalEffectListOption[1].globalcolorgradientValue = globalcolorgradientValue;
            globalEffectListOption[1].globalnumOfcells = globalnumOfcells;
            globalEffectListOption[1].globalgradientColorItemsValue = globalgradientColorItemsValue;

          }
          
        }


        const intervalddd = setInterval(() => {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
              
          if(videoRef.current !== null)
          {
            canvasCtx.drawImage(
            videoRef.current,
            0,
            0,
            canvasElement.width,
            canvasElement.height); 

            if(globalEffectListOption[0] && globalEffectListOption[0].globalEffectCategory == "PIXEL")
            {

              pixelUtil.GenerativePixel_Effects(canvasCtx,
                    globalEffectListOption[0].globalEffectSubCategory,
                   { color: "white", 
                      lineWidth: 0.124, 
                      radius: 0.75, 
                      numberOfColors: globalEffectListOption[0].globalnumOfColoursValue, 
                      colorGradientValue : globalEffectListOption[0].globalcolorgradientValue, 
                      gradientColorItemsValue: globalEffectListOption[0].globalgradientColorItemsValue
                    });

            }
            
            if(globalEffectListOption[1] && globalEffectListOption[1].globalEffectCategory == "GENERATIVE_ART")
            {
              artUtil.GenerativeArt_Effects(canvasCtx,
                globalEffectListOption[1].globalEffectSubCategory, 
                 { color: "white", lineWidth: 0.124, radius: 0.75, numOfcells: globalEffectListOption[1].globalnumOfcells}, 
                 globalEffectListOption[1].globalnumOfcells, 
                 globalEffectListOption[1].globalgradientColorItemsValue);
              
            }

            if(selectedEffectMenu == "NONE")
            {
              console.log('No Effect Selected');
            }
            
          }
          else
          {
            setCameraOn(false);
            clearInterval(intervalddd); 
          }
          canvasCtx.restore();
        }, 50);

          if(typeof videoRef.current == "undefined" ||  videoRef.current == null)
          {
            console.log('CLEARING OUT INTERVAL ');
            clearInterval(intervalddd);
          }
      }
      else
      {
        console.log('Something went worng, please refresh the page. Sincere Apologies for inconveniences. Work is still in progress..');
      }
    }
    else
    {
      console.log('....  videoRef is NULL   ....');
    }
  }



  
  const handlePatternPickerSelectionChange = (selectedOption) => {
    if(selectedOption != null || selectedOption !== "")
    {
        var optionOject = JSON.parse(selectedOption);
        if (typeof optionOject !== "undefined" && optionOject !== null)
        {
          // check function call and then call corresponding function accordingly 
          // add support to set order of video manipulation technique
          // i.e colour effect followed by generative art or Vice versa
          videoCanvasEffect(optionOject.effectCategory, 
            optionOject.effectCategory, 
            optionOject.effectSubCategory, 
            optionOject.numOfColoursValue, 
            optionOject.colorgradientValue,  
            optionOject.numOfcells);
        }
    }
  }

  
  useEffect(() => {
    turnCameraOn(true);
  }, [cameraOn]);
  //videoRef
  //[cameraOn]


  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenMenu(false);
      }      
    }; 
    document.addEventListener("mousedown", handler);
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  //END UseEffects


  return (
    <center>
      <div className="App">
        <div className="camera">
          {cameraOn ? (
            <video
            preload="none"
            ref={videoRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480 ,
              }}
            />
          ) : (
            <>
            <h1>Turn Camera On <img className='arrowOnbackground' src={backgroundArrowImg}></img></h1>
            
            </>
          )}
          {" "}
          <canvas
            ref={canvasRef}
            className="output_canvas"
            style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480 ,
            }}
          ></canvas>
        </div>
        <div className='menu-container' ref={menuRef}>
          <div className='menu-trigger' onClick={()=>{setOpenMenu(!openMenu)}}>
            <img src={mainMenu}></img>
          </div>
          <div className={`dropdown-menu ${openMenu? 'active' : 'inactive'}`} >
            <h3>ToCamera<br/><span> Effects</span></h3>
            

            <div className='ul-container'>
              <ul className = 'dropdownItem_ul'>

                  {/* Basic photo button actions */}

                  {cameraOn ? (
                              <>
                                <DropdownItem funtionCall = {stopCamera} canvasEffect = {"NONE"} img = {stopCamIco} text = {"Stop Camera"} />
                                <DropdownItem funtionCall = {takePhoto} canvasEffect = {"NONE"} img = {takePictureIco} text = {"Take Picture"}/>
                                <DropdownItem funtionCall = {generateRandomColorEffectV1} canvasEffect = {"NONE"} img = {camEffect1Ico} text = {"Random 5 Color Effect"}/>
                                <DropdownItem funtionCall = {generateRandomColorEffectV2} canvasEffect = {"NONE"} img = {camEffect2Ico} text = {"Random 10 Color Effect"}/>


                                <li className = 'dropdownItem_li'>
                                  <img src={canvasEffectico}></img>
                                  <ColorPatternPicker handlePatternPickerSelectionChange={handlePatternPickerSelectionChange} />
                                </li>

                              </>

                            ) : (
                              <DropdownItem funtionCall = {startCamera} canvasEffect = {"NONE"} img = {startCamIco} text = {"Start Camera"} />
                            )}
                  
              </ul>
            </div>
          </div>
        </div>
        {cameraOn ? (
          <button onClick={takePhoto} className="btnClick"> CLICK </button>) :
          (<></>)
        }
        
        <div 
          className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
            <canvas ref={photoRef} className="photoCanvas"></canvas>
            <button onClick={closePhoto} className="btnClose"> CLOSE </button>
            <button onClick={downloadPhoto} className="btnSave"> SAVE </button>
        </div>
      </div>
    </center>
  );
}


function DropdownItem(props){
  if(props.canvasEffect == "NONE" || props.canvasEffect == "REMOVE_EFFECT")
  {
    return(
      
      <li className = 'dropdownItem_li'>
        <img src={props.img}></img>
        <a onClick={() => props.funtionCall()}> {props.text} </a>
      </li>
    );
  }
}

export default App;