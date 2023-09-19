/* eslint-disable no-unused-vars */
import React,{useEffect,useRef,useState} from 'react';
import Dropzone from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Upload.css";

const Upload = () => {
    const [filename, setfilename] = useState(null)
  const [error, setError] = useState(null)
    const file = useRef(null);
    const handlefiles = async (param) => {
        if (param[0]) {
          const type = param[0].type
          const splitted = type.split("/")
    
          let temp1 = "jpeg"
          let temp2 = "png"
    
          if (splitted[1] === temp1 || splitted[1] === temp2) {
            file.current = param[0]
            setfilename(file.current.name)
            setError(null)
          } else {
            setError("Please upload supported files only")
            setfilename(null)
            file.current = null
          }
        } else {
          setError("Please upload single file only")
          setfilename(null)
          file.current = null
        }
    
        setTimeout(() => {
          setError(null)
        }, 4000)
      }
     
    

  return (
    <div>Upload</div>
  )
}

export default Upload