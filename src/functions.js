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

async function generateTextFromUrl(url) {

  let hf_key = import.meta.env.VITE_HUGGING_FACE_TOKEN;
  const client = new HfInference(hf_key);

  const chatCompletion = await client.chatCompletion({
    model: "meta-llama/Llama-3.2-11B-Vision-Instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify the specific plant in the image."
          },
          {
            type: "image_url",
            image_url: {
              url: url
            }
          }
        ]
      }
    ],
    max_tokens: 500
  });

  return chatCompletion.choices[0].message;
}



export { urlToBLob, uploadImgToServer, generateTextFromUrl }