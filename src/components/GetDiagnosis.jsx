import Dropzone from "react-dropzone";
import "../stylesheets/Dash.css";
import React, { useState, useEffect, useRef } from "react";

function GetDiagnosis() {
  const [filename, setfilename] = useState(null)
  const file = useRef(null)

  const handleSubmit = async () => {
    if (file.current) 
      const cloud = new FormData()
      cloud.append("file", file.current)
      cloud.append("upload_preset", "dermai")
      cloud.append("cloud_name", "dl0vgqzdf")

      const response1 = await fetch(
        "https://api.cloudinary.com/v1_1/dl0vgqzdf/image/upload",
        {
          method: "POST",
          body: cloud,
        }
      )

      const data1 = await response1.json()

      console.log(data1.url) // url of the image stored in cloudinary
    }
  }

  const handlefiles = async (param) => {
    if (param[0]) {
      const type = param[0].type
      const splitted = type.split("/")

      let temp1 = "jpeg"
      let temp2 = "png"

      if (splitted[1] === temp1 || splitted[1] === temp2) {
        file.current = param[0]
        setfilename(file.current.name)
        // setError(null)
      } else {
        // setError("Please upload supported files only")
        setfilename(null)
        file.current = null
      }
    } else {
      // setError("Please upload single file only")
      setfilename(null)
      file.current = null
    }

    // setTimeout(() => {
    //   setError(null)
    // }, 4000)
  }

  const [symptoms, setSymptoms] = useState('');

  return (<div className="backgnd">
    <div className="prof">

      <Dropzone
        onDrop={(acceptedFiles) => handlefiles(acceptedFiles)}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                {/* <img src={imguploadsvg} alt="Image upload svg" /> */}
                <p>
                  Drag and drop your image here, or click to select a
                  file
                </p>
                <p>
                  Accepts JPEG and PNG formats, limited to one image at
                  a time.
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>

    <div className="detaildisp">
      <div className="disp1">
        <label htmlFor="symptomsInput" style={{ fontWeight: '700', fontSize: 'large' }}>Enter your symptoms:</label>
        <input
          type="text"
          id="symptomsInput"
          name="symptomsInput"
          placeholder="Describe your symptoms..."
          onChange={(e) => { setSymptoms(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            wordWrap: 'break-word',
            height: '70%',
            marginTop: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: 'medium',
          }}
        />
      </div>

      <div className="disp2" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontWeight: '700', textAlign: 'center', fontSize: 'large' }}>Discover your path to better health. Take the first step with DermAI's precise and empowering diagnosis platform.</p>
        <button
          style={{
            width: '12vw',
            height: '7vh',
            backgroundColor: '#068FFF',
            color: 'aliceblue',
            border: 'none',
            outline: 'none',
            borderRadius: '2vh',
            fontWeight: '700',
            fontSize: 'large',

            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer', // Optional: Add pointer cursor for better UX
          }}

          onClick={handleSubmit}
        >
          View Results✨
        </button>
      </div>

    </div>
  </div>)

}

export default GetDiagnosis;