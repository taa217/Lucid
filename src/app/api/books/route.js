export async function GET() {
  // This is just example data - in a real app you'd want to maintain this list
  // in a database or configuration file
  const books = [
    
    {
      id: 1,
      title: "Meta Text - Speech Research",
      path: "/books/meta research paper text to speech.pdf",
      thumbnail: "/meta-text-to-speech.jpg"
    },
    {
      id: 2,
      title: "Astin Theory of Development",
      path: "/books/astin.pdf",
      thumbnail: "/air.jpg" // Optional: if you have thumbnails
    },
    {
        id: 3,
        title: "Driving with LLMs",
        path: "/books/Driving with LLMs.pdf",
        thumbnail: "/drivingai.jpg"
    },
    {
      id: 9,
      title: "AI In Biology",
      path: "/books/AI in Biology.pdf",
      thumbnail: "/airesearch.jpg"
  },
    {
        id: 4,
        title: "Statistics - Probability - UZ",
        path: "/books/stats.pdf",
        thumbnail: "/statistics.webp"
    },
     {
        id: 5,
        title: "A Definition of Law",
        path: "/books/A Definition of Law.pdf",
        thumbnail: "/law.jpg"
    },
     {
        id: 6,
        title: "Emotional Design",
        path: "/books/emotion.pdf",
        thumbnail: "/emotional_design.webp"
    },
    {
      id: 7,
      title: "Reconciling the Event Calculus",
      path: "/books/Reconciling the Event Calculus.pdf",
      thumbnail: "/calculus.jpg"
  },
 

    // Add more books as needed
  ];

  return new Response(JSON.stringify(books), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 
