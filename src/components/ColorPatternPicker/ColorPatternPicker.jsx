import React, { useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './ColorPatternPicker.module.css';

const Patterns = ({ handlePatternPickerSelectionChange }) => {
const [patterns, setPatterns] = useState([]);



    const selectOptions = [
      { 
        funtionCall: "videoCanvasDefaultEffect", 
        defaultFunctionCall : "startCamera", 
        effectCategory : "DEFAULT_EFFECT", 
        effectSubCategory : "REMOVE_COLORPATTERN_EFFECT",
        numOfColoursValue : "",
        colorgradientValue : "", 
        numOfcells : "",
        effectLabel : "GenerativeArt 1"
      },
      { 
        funtionCall: "videoCanvasEffect", 
        defaultFunctionCall : "startCamera", 
        effectCategory : "GENERATIVE_ART", 
        effectSubCategory : "GENERATIVE_ART1",
        numOfColoursValue : "5",
        colorgradientValue : "colorGradients", 
        numOfcells : "20",
        effectLabel : "GenerativeArt 1"
      },
      { 
        funtionCall: "videoCanvasEffect", 
        defaultFunctionCall : "startCamera", 
        effectCategory : "GENERATIVE_ART", 
        effectSubCategory : "GENERATIVE_ART2",
        numOfColoursValue : "5",
        colorgradientValue : "colorGradients", 
        numOfcells : "20",
        effectLabel : "GenerativeArt 2"
      },
      { 
        funtionCall: "videoCanvasEffect", 
        defaultFunctionCall : "startCamera", 
        effectCategory : "GENERATIVE_ART", 
        effectSubCategory : "GENERATIVE_ART3",
        numOfColoursValue : "5",
        colorgradientValue : "colorGradients", 
        numOfcells : "20",
        effectLabel : "GenerativeArt 3"
        
      },
      { 
        funtionCall: "videoCanvasEffect", 
        defaultFunctionCall : "startCamera", 
        effectCategory : "GENERATIVE_ART", 
        effectSubCategory : "GENERATIVE_ART4",
        numOfColoursValue : "5",
        colorgradientValue : "colorGradients", 
        numOfcells : "35",
        effectLabel : "GenerativeArt 4"
      },
      { 
        funtionCall: "videoCanvasEffect", 
        defaultFunctionCall : "startCamera", 
        effectCategory : "GENERATIVE_ART", 
        effectSubCategory : "GENERATIVE_ART5",
        numOfColoursValue : "5",
        colorgradientValue : "colorGradients", 
        numOfcells : "20",
        effectLabel : "GenerativeArt 5"
      }
    ] ;

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handlePatternPickerSelectionChange(e.target.value)}>
        <option key={"GenArtDefault"} value={JSON.stringify(selectOptions[0])}>Select Pattern </option>
        {/*<option key={"GenArt001"} value={JSON.stringify(selectOptions[1])}>{"Pattern"} - {"001"}</option>   
        <option key={"GenArt002"} value={JSON.stringify(selectOptions[2])}>{"Pattern"} - {"002"}</option>   
        <option key={"GenArt006"} value={JSON.stringify(selectOptions[6])}>{"Pattern"} - {"006"}</option>    */}
        <option key={"GenArt003"} value={JSON.stringify(selectOptions[3])}>{"Pattern"} - {"001"}</option>    
        <option key={"GenArt004"} value={JSON.stringify(selectOptions[4])}>{"Pattern"} - {"002"}</option>    
        <option key={"GenArt005"} value={JSON.stringify(selectOptions[5])}>{"Pattern"} - {"003"}</option>    
          

      </NativeSelect>
    </FormControl>
  );
};

export default Patterns;