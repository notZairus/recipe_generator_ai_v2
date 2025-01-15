import { HfInference } from "@huggingface/inference";

async function urlToBLob(url) {
  let res = await fetch(url);
  let blob = await res.blob();
  return blob;
}

async function uploadImgToServer(image) {
  const formData = new FormData();
  formData.append('image', image);
  
  let imgbb_key = import.meta.env.VITE_IMGBB_API_KEY;
  let response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbb_key}`, {
    method: 'POST',
    body: formData
  });

  let result = await response.json();
  
  return result.data.url;
}

function drawFocusBox(canvas) {
  let quarterWidth = canvas.width / 4;
  let quarterHeight = canvas.height / 5;

  const context = canvas.getContext('2d');
  context.strokeStyle = 'white';
  context.lineWidth = 1;

  context.strokeRect(quarterWidth, quarterHeight, quarterWidth * 2, quarterHeight * 3)
}



export { urlToBLob, uploadImgToServer, drawFocusBox }