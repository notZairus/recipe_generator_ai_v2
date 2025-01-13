import { useState, useEffect, useRef } from "react"
import cameraIcon from "./assets/camera.svg";
import { urlToBLob } from "./functions.js";

export default function App() {
  
  const [images, setImages] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.log(error);
      }
    }

    startCamera();
  }, [])

  useEffect(() => {

    if (images.length == 0) return;
    
    const analyzeImage = async () => {
      const last_image_url = images[images.length - 1];
      const image = await urlToBLob(last_image_url);

      const formData = new FormData();
      formData.append('image', image);
      
      let response = await fetch(`https://api.imgbb.com/1/upload?key=cd016d985edb7a8252293b9296f13217`, {
        method: 'POST',
        body: formData
      });

      let result = await response.json();

      alert(result.data.url);
    }

    analyzeImage();

  }, [images]);

  


  function captureImage(e) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      let newImage = new File([blob], 'new-image.png', {type: 'image/png'});
      let newImgUrl = URL.createObjectURL(newImage)
      setImages(prev => [...prev, newImgUrl]);
    })
  }


  return (
    <>
      <div className="w-screen min-h-screen bg-zinc-800 flex justify-center">
        <main className="w-full h-full rounded text-white py-4 px-2 space-y-4">
          
          <section className="px-2 justify-between items-center">
            <h1 className="text-4xl font-bold">RG</h1>
            <p className="text-white/40 mt-1">Developer: Zairus V. Bermillo</p>
          </section>

          <section className="relative">
            <video 
              ref={videoRef} 
              className="w-full h-96 bg-black rounded-lg"
              autoPlay
              playsInline
            >
            </video>
            <button onClick={captureImage} className="aspect-square w-20 bg-zinc-800 absolute m-auto flex items-center justify-center rounded-full inset-x-0 bottom-8">
              <img src={cameraIcon} alt="camera-icon" className="w-2/3"/>
            </button>
          </section>

          <section className="w-full h-auto min-h-20 flex justify-center items-center">
            <ul className="flex-1 grid grid-cols-4 gap-3 px-8 my-4">
            {
              images.map((image, index) => (
                <li key={image} class="bg-gray-500 aspect-auto rounded-md overflow-hidden shadow-md flex justify-center items-center">
                  <img src={image} className="flex-1"/>
                </li>
              ))
            }
            </ul>
          </section>

        </main>
      </div>
    </>
  )
}