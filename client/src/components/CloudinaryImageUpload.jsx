import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import x from '../../dist/assets/x.png';
import ImageDirection from './ImageDirection.jsx';

export default function CloudinaryImageUpload ({closeModal, item}) {

  const [imageUrl, setImageUrl] = useState('');
  const [readInfo, setReadInfo] = useState(localStorage.readInfo);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Cloudinary API configuration
    const cloudName = 'dfxarumgq';
    const uploadPreset = 'krundzwn';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    // Perform the image upload using Axios
    axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then((response) => {
        // Get the URL of the uploaded image from the response
        const imageUrl = response.data.secure_url;

        // Set the uploaded image URL
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const handleSubmit = () => {
    axios.post('/api/img', {imageUrl, id:item.id})
    .then(({data}) => console.log(data));
    closeModal();
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3>Add a image for {item.name}</h3>
        </div>
        <div className='modal-body'>
          {!readInfo && <ImageDirection closeModal={() => setReadInfo(true)}/>}
          {imageUrl ? (
            <CloudinaryContext cloudName="your_cloud_name">
              <Image publicId={imageUrl} width="400" crop="scale" />
            </CloudinaryContext>
            ) : <input className='file-upload' type="file" onChange={handleImageUpload} />}
          {imageUrl && <div onClick={handleSubmit} className='file-upload-btn'>Upload this image</div>}
        </div>
      </div>
    </div>
  );
};