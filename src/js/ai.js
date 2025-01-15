

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

export { generateTextFromUrl }