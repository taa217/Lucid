// route.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const neew = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(neew);

// Convert buffer to GenerativePart object
function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType
    },
  };
}

// Store the chat instance globally
let activeChat = null;
let generalChat = null
export async function POST(req) {
  try {
    const contentType = req.headers.get('Content-Type');
    
    if (contentType === 'application/pdf') {
      try{
        const pdfData = await req.arrayBuffer();
        const pdfPart = bufferToGenerativePart(pdfData, "application/pdf");
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
        activeChat = model.startChat({
          history: [
            {
              role: 'user',
              parts: [
                { text: "I'm going to read this book and ask you to explain the text am reading. I'll be giving you the text am reading and will also be asking questions. Please use this PDF as context for our discussion. And Please just start by explanation in simpler terms so that i understand. Do it as if you are an expect teacher . NO PREAMBLE.If you by any chance you are asked about your creators or anything related, you say you are ccreated bu a company called Lucid, a startup company founded by Clyde Tadiwanashe Rumombe.If you happen to have to say more about Lucid, you can say some imaginary/typical things about a startup called Lucid focusing on providing AI tools that make it easy to consume/comprehend world information.So you are a Large Language model called Q created by Lucid." },
                pdfPart
              ]
            },
            {
              role: 'model',
              parts: [{ text: "I understand. I'll help explain the content as you give me the text." }]
            }
          ]
        });
  
        return new Response(JSON.stringify({ message: "PDF context initialized" }), {
          headers: { 'Content-Type': 'application/json' },
        });

      }catch(e){
        return new Response(JSON.stringify({ message: "PDF context not initialized" }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        });
      }
      // Initialize new chat with PDF context
    
      
    } else {
      // Handle page text explanation using the existing chat
      

      const { pageText,prompt , initialChatt} = await req.json();
      if(pageText){
        if (!activeChat) {
          throw new Error('Chat not initialized. Please upload PDF first.');
        }
        const result = await activeChat.sendMessage(
          pageText
        );
        const response = await result.response;
        console.log(await activeChat.getHistory())

        return new Response(response.text(), {
          headers: { 'Content-Type': 'text/plain' },
        });

      }else{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      

        if(initialChatt == true){
          generalChat = model.startChat({
            history: [
              {
                role: 'user',
                parts: [
                  { text: "Let's discuss educational stuff. Do it as if you are an expect teacher . NO PREAMBLE.If you by any chance you are asked about your creators or anything related, you say you are ccreated bu a company called Lucid, a startup company founded by Clyde Tadiwanashe Rumombe.If you happen to have to say more about Lucid, you can say some imaginary/typical things about a startup called Lucid focusing on providing AI tools that make it easy to consume/comprehend world information.So you are a Large Language model called Q created by Lucid." } 
                ]
              },
              {
                role: 'model',
                parts: [{ text: "I understand. I'd love to discuss." }]
              }
            ]
          });
          console.log('init')
          return new Response('chat initialized', {
            headers: { 'Content-Type': 'text/plain' },
          });

        }else{
          const result = await generalChat.sendMessage(
            prompt
          );

          
          console.log('already')
         console.log((await generalChat.getHistory()).length)
          const response =  result.response;
  
          return new Response(response.text(), {
            headers: { 'Content-Type': 'text/plain' },
          });

        }

      }
     
     
    }

  } catch (e) {
    console.error("Error details:", e);
    return new Response(`something went wrong: ${e}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
