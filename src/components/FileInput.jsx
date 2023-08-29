import { useState } from "react"

const FileInput = ({photo, setPhoto}) => {
  const [fileName, setFileName] = useState(photo)
  
  return (
    <div className="form-field">
    <label htmlFor="profilePhoto" >Profile Photo (optional)</label>
      <input type="file" className="input-field file-input" name="profilePhoto" id="profilePhoto" data-name={fileName} accept="image/png, image/jpg, image/jpeg" onChange={e=>{setPhoto(e.target.files[0]); setFileName(e.target.files[0].name)}}/>
    </div>
  )
}

export default FileInput