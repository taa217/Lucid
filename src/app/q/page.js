'use client';
import { useState, useRef, useEffect , useCallback} from 'react';
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  TextField,
  Paper,
  CircularProgress,
  Divider,
  LinearProgress,
  Snackbar,
  Alert,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  Backdrop,
  Grid,
  Card,
  Switch,
  CardContent,
  CardMedia,
  CardActionArea, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Try from '@mui/icons-material/Try';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import SendMessageInput from '../../../components/FollowUpQuestionInput';
import Markdown from 'react-markdown';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import '@fontsource/roboto-slab/700.css';
import Image from 'next/image';
//import { pdfjs } from '@react-pdf-viewer/core';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GlowingQ from '../../../components/GlowingQ';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Import the user icon
import { Copyright } from '@mui/icons-material'; // Import copyright icon
import Link from 'next/link';


export default function Reader() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [theSwitch,setThesWitch] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const fileInputRef = useRef(null);
  const [ai, setAI] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hasUserResponded, setHasUserResponded] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPdfUploaded,setIsPdfUploaded] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [aiError, setAiError] = useState(false)
  const [initialChat, setInitialChat] = useState(true)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [fetchTry,setFetchTry] = useState(false)
  const [feedbackAnswers, setFeedbackAnswers] = useState({
    desired: [],
    structure: [],
    want: [],
    dislike: [],
    improvement: [],
    other: [],
    moreDetails: ''
  });
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState({ 
    submitted: false, 
    error: false,
    processing: false 
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null); // State for loading message
  const chatContainerRef = useRef(null); // Create a ref for the chat container
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if device is mobile

  // Custom theme for the application with sky blue as primary
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#87CEFA', // Sky blue
      },
      secondary: {
        main: '#ffffff', // White
      },
      background: {
        default: '#f0f4f8',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#555555',
      },
    },
    typography: {
      fontFamily: '"Roboto Slab", serif',
      h6: {
        fontWeight: 700,
        fontSize: '1.8rem',
        color: '#87CEFA', // Sky blue for headers
      },
      body1: {
        fontSize: '1.1rem',
        lineHeight: 1.8,
        color: '#333333', // Dark text for readability
      },
      a: {
        color: '#87CEFA',
        textDecoration: 'underline',
        '&:hover': {
          color: '#00BFFF',
        },
      },
    },
  });

  // Styled component for animated Markdown with improved scrollbar
  const AnimatedMarkdown = styled(motion.div)({
    '& p': {
      marginBottom: '1rem',
    },
    '& li': {
      marginBottom: '0.5rem',
    },
    '& a': {
      color: '#87CEFA',
      textDecoration: 'underline',
      '&:hover': {
        color: '#00BFFF',
      },
    },
    /* Custom Scrollbar Styles */
    '&::-webkit-scrollbar': {
      width: '6px', // Reduced width for a slimmer scrollbar
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent', // Transparent track for minimalistic look
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(135, 206, 250, 0.6)', // Semi-transparent sky blue thumb
      borderRadius: '3px', // Rounded corners for the thumb
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(135, 206, 250, 1)', // Solid sky blue on hover
    },
    /* Firefox Scrollbar Styles */
    scrollbarWidth: 'thin', // Thin scrollbar for Firefox
    scrollbarColor: 'rgba(135, 206, 250, 0.6) transparent', // Semi-transparent thumb and transparent track
  });

  // Check if on mobile and user hasn't responded yet
  useEffect(() => {
    if (isMobile && !hasUserResponded && !fileUrl) {
      setDialogOpen(true);
    }
  }, [isMobile, hasUserResponded, fileUrl]);

  // Simulate component loading
  useEffect(() => {
    // Simulate loading delay (e.g., fetching resources)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = (proceed) => {
    setDialogOpen(false);
    setHasUserResponded(true);
    
    // If user chooses to proceed, no additional action is needed; app continues responsively
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const aiResponse = async () => {
    //setAiError(false);

 if (isPdfUploaded == false){

    if (!file) {
      setSnackbar({ open: true, message: 'No PDF file uploaded.', severity: 'error' });
      return;
    }

   // setExplanationLoading(true);
    
    try {
      // First, upload the PDF to initialize the chat
      const arrayBuffer = await file.arrayBuffer();
      const initResponse = await fetch("/api/response", {
        method: "POST",
        body: arrayBuffer,
        headers: {
          'Content-Type': 'application/pdf'
        }
      });
      
      if (!initResponse.ok){
      
        if((await initResponse.text()).includes('overloaded')){
          setSnackbar({ open: true, message: 'Model Overloaded. Please try again later.', severity: 'error' });

        }else{

        setSnackbar({ open: true, message: 'Error uploading document to Q model.', severity: 'error' });
        }
        
      }
      else{
       // setFetchTry(false)
        setIsPdfUploaded(true) 
        setThesWitch(true)
      setSnackbar({ open: true, message: 'PDF uploaded successfully!', severity: 'success' });

      }
      
      // Then get the first page's explanation
      //await handlePageChange(currentPage);
      
     
    } catch (error) {
      console.error("Error starting explanations:", error);
      setSnackbar({ open: true, message: 'Error uploading document to Q model.', severity: 'error' });
    } finally {
      setExplanationLoading(false);
    }
  }else{
    setSnackbar({ open: true, message: 'Chat initialized already.', severity: 'success' });
  }
  };

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const fileType = uploadedFile.type;
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer); // Convert to Uint8Array
        const blob = new Blob([uint8Array], { type: fileType });
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
        setIsPdfUploaded(false)
      };
      reader.readAsArrayBuffer(uploadedFile); // Ensure reading as ArrayBuffer
    }
  };

  // New function to reset to initial state
  const handleHomeClick = () => {
    setFile(null);
    setFileUrl(null);
    setIsPdfUploaded(false)
    setThesWitch(false)
    setSearchText('');
    setAI('');
    setFetchTry(false)
    setUploadProgress(0);
    // Add any other state resets if necessary
  };

  // Loading Screen Component
  const LoadingScreen = () => (
    <Backdrop
      open={loading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #f0f4f8, #87CEFA)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        animation: 'fadeIn 1s ease-out',
      }}
    >
      {/* Animated Logo and "Q" Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      >
        <motion.img
          src='/lucidlogo.svg'
          alt="Q Logo"
          width={80}
          height={80}
          style={{ marginRight: '10px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Q
        </Typography>
      </motion.div>

      {/* Enhanced Loading Spinner */}
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={80}
          thickness={4}
          sx={{
            color: 'rgba(255, 255, 255, 0.3)',
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <CircularProgress color="secondary" size={80} thickness={4} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          Loading...
        </Typography>
      </Box>

      {/* "From Lucid" Text with Fade-In Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 30,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 'medium', fontSize: '1rem' }}>
          From Lucid
        </Typography>
      </motion.div>

      {/* Additional Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          gap: '10px',
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
          }}
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
          }}
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 1 }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
          }}
        />
      </motion.div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Backdrop>
  );

  
  const getCurrentPageText = async (pageNumber) => {
    if (!file) {
      console.log('noooooooo file')

      return ''
    };
    
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(pageNumber + 1);
      const textContent = await page.getTextContent();
      
      return textContent.items.map(item => item.str).join(' ');
    } catch (error) {
      console.error('Error extracting page text:', error);
      return '';
    }
  };

  const fetchRetry = async (message) => {
       await aiResponse()
        await handlePageChange(message ? message : currentPage)
  }


  const handlePageChangeDebounced = useCallback((page) => {
    if (timeoutId) {
        clearTimeout(timeoutId); // Clear any previous timeout
    }

    const newTimeoutId = setTimeout(() => {
        if (!file) {
            console.log("File not ready for page change:", page);
            return; // Exit if the file is not yet ready
        }
        handlePageChange(page); // Call the actual page change handler
    }, 2500); // Debounce delay of 2.5 seconds

    setTimeoutId(newTimeoutId);
}, [timeoutId, file]); // Include `file` in dependencies


  const generalChat = async (prompt, initialChatt) => {
    try {
      if(initialChatt == false){
        setChatMessages(prev => [...prev, { user: prompt, ai: 'Loading...' }]); // Show loading message
      }
      

      const response = await fetch("/api/response", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageText: false, prompt, initialChatt })
      });

      if (!response.ok){
        const errormsg = 'Error generating response.Please try again.'
        setInitialChat(true)
      }

      const aiResult = await response.text();
      if (aiResult == 'chat initialized')
      {
        console.log(aiResult)
        setInitialChat(false)
        
          generalChat(prompt,false)
        
        
      }else{
        console.log(aiResult)
        setChatMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = { user: prompt, ai:!response.ok ? 'Something went wrong.Please try again.' : aiResult }; // Replace loading with AI response
        return updatedMessages;
        });

      }
      
    } catch (e) {
      setSnackbar({ open: true, message: e.message || 'Something went wrong. Try again.', severity: 'error' });
    }
  };

  const handlePageChange = async (pageNumber) => {
    //setFetchTry(false)
    setCurrentPage(pageNumber);
    console.log(pageNumber,typeof(pageNumber))
    setExplanationLoading(true);
   // if (isPdfUploaded == true) {
      //setFetchTry(false)
      
        try {
            const pageText = typeof(pageNumber) == 'string' ? pageNumber : await getCurrentPageText(pageNumber);
           /// console.log(await getCurrentPageText(2))
           // console.log(pageText)
            //console.log(pageText,typeof(pageText))
            const response = await fetch("/api/response", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pageText })
            });

            // Check if the response is not ok
            if (!response.ok) {
                // Throw an error with a message from the response
                let errorMessage = await response.text(); // Get the error message from the response
                if (errorMessage.includes("Chat not initialized. Please upload PDF first.")){
                  errorMessage = 'Failed to upload PDF to Q model. Please retry loading the document'
                 // setFetchTry(true)
                }
                else if(errorMessage.includes("[503 Service Unavailable] The model is overloaded. Please try again later.")){
                  errorMessage = "Q Model is overloaded. Please try again later"
                 // setFetchTry(true)
                }
                else if(errorMessage.includes("fetch failed")){
                  errorMessage = "Something went wrong. Please check your connection and retry"
                 // setFetchTry(true)
                }
                else if(errorMessage.includes("[429 Too Many Requests] Resource has been exhausted")){
                  errorMessage = "Model Overloaded. Please try again."
                 // setFetchTry(true)
                }
                else{
                   errorMessage = "Something went wrong. Try again"
                  // setFetchTry(true)
                  
                }
                throw new Error(errorMessage); // This will be caught in the catch block
            }

              const explanation = await response.text();
              setAiError(false)
              setAI(explanation);
              setFetchTry(false)
        if(response.ok){
          setAiError(false)
        }
            

           
        } catch (error) {
            setAiError(true)
            console.error(error);
            setFetchTry(true) 
            setAI(error.message)// Log the error for debugging
            setSnackbar({ open: true, message: error.message || 'Something went wrong.Try again.', severity: 'error' });
            setIsPdfUploaded(false)
          
           // aiResponse()
        } finally {
            setExplanationLoading(false);
        }
    // } else {
    //     console.log('pdf not uploaded to Q model');
    //    aiResponse();
    // }
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const bookList = await response.json();
        setBooks(bookList);
        setFilteredBooks(bookList);
      } catch (error) {
        console.error('Error loading books:', error);
        setSnackbar({ open: true, message: 'Error loading books.', severity: 'error' });
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchText, books]);

  // const generateThumbnail = async (pdfUrl) => {
  //   try {
  //     const pdf = await pdfjs.getDocument(pdfUrl).promise;
  //     const page = await pdf.getPage(1);
  //     const viewport = page.getViewport({ scale: 0.5 });
      
  //     const canvas = document.createElement('canvas');
  //     const context = canvas.getContext('2d');
  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;
      
  //     await page.render({
  //       canvasContext: context,
  //       viewport: viewport
  //     }).promise;
      
  //     return canvas.toDataURL();
  //   } catch (error) {
  //     console.error('Error generating thumbnail:', error);
  //     return null;
  //   }
  // };

  const handleBookSelect = async (bookPath) => {
    try {
      const response = await fetch(bookPath);
      const blob = await response.blob();
      const fileName = bookPath.split('/').pop();
      const file = new File([blob], fileName, { type: 'application/pdf' });
      
     // setFile(file); // Schedule state update
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
       
      setFile(file);
      console.log(url)
      console.log(file)
      
      setSnackbar({ open: true, message: 'Book loaded successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error loading book:', error);
      setSnackbar({ open: true, message: 'Error loading book.', severity: 'error' });
    }
  };

  // Add this useEffect to log the updated file


  const questions = [
    {
      id: 'desired',
      question: 'What would your ideal learning experience look like?',
      options: [
        "Personalized Learning (Learning content tailored to my specific needs, interests, or goals.)",
         "Interactive Learning (Interactive quizzes, activities, or games to reinforce concepts.)",
         "Simplified Explanations",
         "AI-Powered Assistance",
         "Other"
      ]
    },
    {
      id: 'structure',
      question: "Which structure of learning would you prefer?",
      options: [
        "AI-guided learning",
        "More interactive exercises",
        "Video tutorials",
        "Step-by-step guides",
        "Practice problems",
        "Other"
      ]
    },
    {
      id: 'want',
      question: "Whats one feature or ability youve always wanted in a learning tool? Please describe below",
      options:[
        
      ]

    },
    {
      id: 'dislike',
      question: "What didn't you like about Lucid Q?",
      options: [
        "Interface is confusing",
        "Too slow",
        "Features are limited",
        "Not what I expected",
        "Other"
      ]
    },
    {
      id: 'improvement',
      question: "What can be improved?",
      options: [
        "Speed and performance",
        "User interface",
        "More features",
        "Better explanations",
        "Other"
      ]
    },
   
    {
      id: 'other',
      question:"Anything you would like us to know?",
      options: [

      ]
    }
   
    // ... add other questions similarly
  ];

  const totalQuestions = 6; // Update this based on your total number of questions

  const handleFeedbackSubmit = async () => {
    setSubmissionStatus(prev => ({ ...prev, processing: true }));
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'lucidinc11@gmail.com',
          feedback: feedbackAnswers,
          userEmail: userEmail || 'Not provided'
        }),
      });

      if (response.ok) {
        // Add a small delay for smoother transition
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmissionStatus({ submitted: true, error: false, processing: false });
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setSubmissionStatus({ submitted: false, error: true, processing: false });
      setSnackbar({ 
        open: true, 
        message: 'Unable to send feedback. Please try again.', 
        severity: 'error' 
      });
    }
  };

  const resetFeedback = () => {
    setFeedbackAnswers({
      desired: [],
      structure: [],
      want: [],
      dislike: [],
      improvement: [],
      other: [],
      moreDetails: ''
    });
    setUserEmail('');
    setCurrentQuestion(0);
  };

  const SuccessDialog = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(135, 206, 250, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <CheckCircleIcon 
            sx={{ 
              fontSize: 50, 
              color: '#00BFFF',
              filter: 'drop-shadow(0 2px 4px rgba(0,191,255,0.3))'
            }} 
          />
        </Box>
      </motion.div>
      
      <Typography variant="h5" sx={{ 
        color: '#00BFFF', 
        fontWeight: 600,
        mb: 2 
      }}>
        Thank You for Your Feedback!
      </Typography>
      
      <Typography variant="body1" sx={{ 
        color: 'text.secondary',
        mb: 4,
        maxWidth: '80%',
        margin: '0 auto 2rem'
      }}>
        Your insights help us improve Q and create a better experience for everyone.
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setFeedbackDialogOpen(false);
          resetFeedback();
          setSubmissionStatus({ submitted: false, error: false });
        }}
        sx={{
          background: 'linear-gradient(45deg, #87CEFA, #00BFFF)',
          boxShadow: '0 4px 10px rgba(0,191,255,0.3)',
          padding: '10px 30px',
          borderRadius: '25px',
          '&:hover': {
            background: 'linear-gradient(45deg, #00BFFF, #87CEFA)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(0,191,255,0.4)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Close
      </Button>
    </motion.div>
  );

  const handleCheckboxChange = (questionId, option) => {
    setFeedbackAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId] ? 
        (prev[questionId].includes(option)
          ? prev[questionId].filter(item => item !== option)
          : [...prev[questionId], option]) 
        : [option] // Initialize if undefined
    }));
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const lastMessage = chatContainerRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the last message
      }
    }
  }, [chatMessages]);

  // Function to handle opening the dialog
  const handleInfoDialogOpen = () => {
    setInfoDialogOpen(true);
  };

  // Function to handle closing the dialog
  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      {loading && <LoadingScreen />} {/* Display loading screen while loading */}
      {!loading && (
        <Box sx={{ display: 'flex', height: isMobile ? '' : '100vh', backgroundColor: customTheme.palette.background.default, pt: 0 }}>
          
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept="application/pdf"
          />

          {/* Left Sidebar - Desktop */}
          {!isMobile && (
            <Drawer
              variant="permanent"
              sx={{
                width: '4rem',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: '4rem',
                  boxSizing: 'border-box',
                  paddingTop: '0.4rem',
                  background: 'linear-gradient(180deg, #87CEFA 0%, #00BFFF 100%)',
                  color: '#ffffff',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton sx={{ color: '#fff', mb: 2  }} onClick={handleHomeClick}>
                    <GlowingQ height='100px' width='85%'/>
                  </IconButton>
                <Tooltip title="Home" placement="right">
                  <IconButton sx={{ color: '#fff', mb: 2 }} onClick={handleHomeClick}>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Upload PDF" placement="right">
                  <IconButton
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    sx={{
                      color: '#fff',
                      transition: 'transform 0.3s, background-color 0.3s',
                      '&:hover': {
                        transform: 'scale(1.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      mb: 2,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Information" placement="right">
                  <IconButton sx={{ color: '#fff', mb: 2 }} onClick={handleInfoDialogOpen}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings" placement="right">
                  <IconButton onClick={handleSettingsClick} sx={{ color: '#fff', mb: 2 }}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem sx={{display: 'flex', flexDirection: "row"}}><Typography>On Page Change Explanations</Typography><Switch label="On Page Explanations" size="big" onChange={()=> setThesWitch(!theSwitch)} checked={theSwitch && isPdfUploaded}/></MenuItem>
  
</Menu>
                <Tooltip title="Feedback" placement="right">
                  <IconButton 
                    sx={{ color: '#fff', mb: 2 }}
                    onClick={() => setFeedbackDialogOpen(true)}
                  >
                    <FeedbackIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Drawer>
          )}

          {/* Main Content */}
          <Box sx={{ flexGrow: 1, p: { xs: 2, md: '0.3rem' }, display: 'flex', flexDirection: 'column', gap: '0.9625rem' }}>
            {/* Top Bar with Sidebar Icon on Mobile */}
            {isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton onClick={toggleLeftSidebar} color="primary">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="primary">
                  Q Prototype
                </Typography>
                <IconButton onClick={toggleRightSidebar} color="primary">
                  <Try />
                </IconButton>
              </Box>
            )}

            {/* Title for the App */}
            {!fileUrl && !isMobile &&
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold', 
                color: '#00BFFF', 
                mb: '0.00000000000000008rem',
                mt: 0,
                 // Reduced margin to minimize space
                textAlign: 'center' // Center the title
              }}
            >
              Q prototype
            </Typography>}

            {/* Search Bar */}
            {!fileUrl && (
              <TextField
                placeholder="Search books..."
                variant="outlined"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
                size='small'
                sx={{ mb: '0.00875rem', backgroundColor: '#ffffff', borderRadius: 2 }} // Reduced margin-bottom from 2 to 1
              />
            )}

            {/* File Upload Section */}
            {!fileUrl && (
              <Box sx={{ mt: 1 }}> {/* Reduced margin-top from 3 to 2 */}
                <Button
                  variant="contained"
                  onClick={() => fileInputRef.current?.click()}
                  startIcon={<AddIcon />}
                  sx={{
                    fontSize: '0.7rem',
                    mb: '0.5rem', // Keep this margin as is for spacing
                    background: 'linear-gradient(45deg, #87CEFA 30%, #00BFFF 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Upload New Book
                </Button>

                <Grid container spacing={3}>
                  {filteredBooks.map((book, index) => (
                    <Grid item  xs={12} sm={6} md={4} lg={3} key={book.id} >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                              '& .book-overlay': {
                                opacity: 1,
                              },
                            },
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <CardActionArea
                            onClick={() => handleBookSelect(book.path)}
                            sx={{ height: '100%' }}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                height: '14rem',
                                backgroundColor: 'rgba(135, 206, 250, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {book.thumbnail ? (
                               <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
                               <Image
                                 src={book.thumbnail} // The image source
                                 alt={book.title} // Alternative text for accessibility
                                 layout="fill" // Fills the container
                                 objectFit="cover" // Equivalent to `object-fit: cover`
                               />
                             </Box>
                              ) : (
                                <PictureAsPdfIcon sx={{ fontSize: 60, color: '#87CEFA' }} />
                              )}
                            </CardMedia>
                            <Box
                              className="book-overlay"
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease-in-out',
                              }}
                            >
                              <Typography
                                variant="button"
                                sx={{
                                  color: '#fff',
                                  backgroundColor: 'rgba(135, 206, 250, 0.9)',
                                  padding: '0.5rem 1rem',
                                  borderRadius: 1,
                                }}
                              >
                                Open Book
                              </Typography>
                            </Box>
                            <CardContent>
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                  fontWeight: '1rem',
                                  fontSize: '0.9rem',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {book.title}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Document Viewer */}
            {fileUrl && file &&(
              <Box sx={{ flexGrow: 1, overflow: 'auto', borderRadius: 2.5, mt: 0.5, position: 'relative', backgroundColor: '#ffffff', height: 'calc(100vh - 80px)' }}>
                {file && file.type === 'application/pdf' && fileUrl && (
                  <Worker workerUrl="/pdf.worker.min.js">
                    <Viewer
                    onDocumentLoad={aiResponse}
                      fileUrl={fileUrl}
                      plugins={[defaultLayoutPluginInstance]}
                      onPageChange={theSwitch ? (e) => { handlePageChangeDebounced(e.currentPage);setCurrentPage(e.currentPage) } : (e)=> setCurrentPage(e.currentPage)}
                      initialPage={currentPage - 1}
                    />
                  </Worker>
                )}
              </Box>
            )}
          </Box>



          {/* Right Sidebar - Desktop */}
          {!isMobile && (
            <ThemeProvider theme={customTheme}>
              <Drawer
                variant="permanent"
                anchor="right"
                open={isRightSidebarOpen}
                sx={{
                  width: '21rem',
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: '21rem',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 3,
                    backgroundColor: customTheme.palette.background.paper,
                    color: customTheme.palette.text.primary,
                    boxShadow: '-2px 0px 5px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '0.0625rem' }}>
                  <Typography variant="h6" sx={{ fontFamily: '"Roboto Slab", serif', color: 'primary.main',fontSize: '1.5rem'  }}>
                    {fileUrl ? 'Q Explanations' : 'Chat'}
                  </Typography>
                  <IconButton onClick={toggleRightSidebar} sx={{ color: 'primary.main' }}>
                    <Switch label="On Page Explanations" size="big" onChange={()=> setThesWitch(!theSwitch)} checked={theSwitch && isPdfUploaded}/>
                  </IconButton>
                </Box>
                <Divider sx={{ mb: '0.0625rem', backgroundColor: '#87CEFA33' }} />
                {fileUrl ? ( // Check if a document is opened
                  <AnimatedMarkdown
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      pr: 1,
                    }}
                  >
                    <Markdown
                      components={{
                        h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} sx={{color: aiError  ? 'red' : 'gray'}} />,
                        h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} sx={{color: aiError  ? 'red' : 'gray'}}/>,
                        p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} sx={{color: aiError  ? 'red' : 'gray'}} />,
                        li: ({ node, ...props }) => <li style={{ marginBottom: '0.75rem', paddingLeft: '1.2rem' }} {...props} />,
                        a: ({ node, ...props }) => (
                          <a
                            href={props.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#87CEFA', textDecoration: 'underline' }}
                          >
                            {props.children}
                          </a>
                        ),
                      }}
                    >
                      {ai}
                    </Markdown>
                  </AnimatedMarkdown>
                ) : !(chatMessages.length > 0) ? (
                  // Add GlowingQ component when no document is opened
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    <GlowingQ height='200px' width='70%'/>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        marginTop: 2, 
                        textAlign: 'center', 
                        color: 'transparent', 
                        background: 'linear-gradient(45deg, #4fcaff, #7b65ff, #f57cff)', 
                        WebkitBackgroundClip: 'text', 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold' 
                      }}
                    >
                      What do you want to discuss?

                    </Typography>
                  </Box>
                ) :  (<AnimatedMarkdown
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  pr: 1,
                }}
              >
                
                     
                      {/* <Box sx={{ overflowY: 'auto', maxHeight: '400px', border: '1px solid #ccc', borderRadius: '4px', padding: 2 }}> */}
                        {chatMessages.map((msg, index) => (
                          <Box ref={chatContainerRef} key={index} sx={{ marginBottom: 1, display: 'flex', flexDirection: 'column', alignItems: msg.user ? 'flex-start' : 'flex-end' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {msg.user && <AccountCircle sx={{ marginRight: 1, fontSize: 30 }} />} {/* User icon with adjusted size */}


                             



                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'bold', 
                                  color: msg.user ? 'blue' : 'gray', 
                                  lineHeight: '30px', // Match line height to icon size
                                  display: 'flex', 
                                  alignItems: 'center' // Center align text vertically
                                }}
                              >
                                {msg.user ? msg.user : 'AI:'} {/* Display user text next to the icon */}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: msg.ai == "Something went wrong.Please try again." ? 'red' : 'gray', fontSize: '20px', backgroundColor: msg.user ? '#e1f5fe' : '#f1f1f1', borderRadius: '8px', padding: '8px', maxWidth: '100%', alignSelf: msg.user ? 'flex-start' : 'flex-end' }}>
                              {msg.ai === 'Loading...' ? (
                                
                                <CircularProgress size={20} sx={{ marginRight: 1 }} /> // Show loading spinner
                              ) :  <Markdown
                              components={{
                                h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} sx={{color: aiError || msg.ai === "Something went wrong.Please try again." ? 'red' : 'gray'}} />,
                                h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} sx={{color: aiError || msg.ai === "Something went wrong.Please try again." ? 'red' : 'gray'}} />,
                                p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} sx={{color: aiError || msg.ai === "Something went wrong.Please try again." ? 'red' : 'gray'}} />,
                                li: ({ node, ...props }) => <li style={{ marginBottom: '0.75rem', paddingLeft: '1.2rem' }} {...props} />,
                                a: ({ node, ...props }) => (
                                  <a
                                    href={props.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#87CEFA', textDecoration: 'underline' }}
                                  >
                                    {props.children}
                                  </a>
                                ),
                              }}
                            >
                              {msg.ai}
                            </Markdown>}
                            </Typography>
                          </Box>
                        ))}
                      {/* </Box> */}
                    
                {/* </Markdown> */}
              </AnimatedMarkdown>) }
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  {!chatHistory?.length && fileUrl && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if(fetchTry){
                          fetchRetry()
                        }else{
                        handlePageChange(currentPage)
                        }
                      }}
                      disabled={!file || explanationLoading}
                      sx={{
                        transition: 'background-color 0.3s, transform 0.3s',
                        '&:hover': {
                          backgroundColor: '#00BFFF',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      {fetchTry ? 'Retry' : 'Explain'}
                    </Button>
                  )}
                  {explanationLoading && fileUrl && <CircularProgress />}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    
                    <SendMessageInput 
                    init = {initialChat}
                      onSend={handlePageChange} 
                      disabled={explanationLoading} 
                      istrying={fetchTry} 
                      general={file && fileUrl} 
                      generalfunc={generalChat} 
                      setLoading={setLoadingMessage}
                    />
                  </Box>
                </Box>
              </Drawer>
            </ThemeProvider>
          )}

          {/* Left Sidebar - Mobile (Temporary Drawer) */}
          {isMobile && (
            <Drawer
              variant="temporary"
              anchor="left"
              open={isLeftSidebarOpen}
              onClose={toggleLeftSidebar}
              ModalProps={{
                keepMounted: true, // Improve performance on mobile
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 250,
                  boxSizing: 'border-box',
                  background: 'linear-gradient(180deg, #87CEFA 0%, #00BFFF 100%)',
                  color: '#ffffff',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <IconButton onClick={toggleLeftSidebar} sx={{ color: '#fff', mb: 2 }}>
                  <CloseIcon />
                </IconButton>
                <Tooltip title="Home" placement="right">
                  <IconButton sx={{ color: '#fff', mb: 2 }} onClick={handleHomeClick}>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Upload PDF" placement="right">
                  <IconButton
                    onClick={() => {
                      toggleLeftSidebar();
                      fileInputRef.current && fileInputRef.current.click();
                    }}
                    sx={{
                      color: '#fff',
                      transition: 'transform 0.3s, background-color 0.3s',
                      '&:hover': {
                        transform: 'scale(1.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      mb: 2,
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Information" placement="right">
                  <IconButton sx={{ color: '#fff', mb: 2 }} onClick={handleInfoDialogOpen}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
               
                <Tooltip title="Feedback" placement="right">
                  <IconButton 
                    sx={{ color: '#fff', mb: 2 }}
                    onClick={() => setFeedbackDialogOpen(true)}
                  >
                    <FeedbackIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Drawer>
          )}

          {/* Right Sidebar - Mobile (Temporary Drawer) */}
          {isMobile && (
            <Drawer
              variant="temporary"
              anchor="right"
              open={isRightSidebarOpen}
              onClose={toggleRightSidebar}
              ModalProps={{
                keepMounted: true, // Improve performance on mobile
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#ffffff',
                  padding: 2,
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" color="primary">
                  {fileUrl ? 'Q Explanations' : 'Chat'}
                  </Typography>
                  <IconButton onClick={toggleRightSidebar} color="primary">
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2, backgroundColor: '#87CEFA33' }} />
                
                {/* Display explanations if a document is uploaded */}
                {fileUrl ? (
                  <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Typography variant="body1" sx={{ padding: 2 }}>
                      {ai} {/* Display the explanation here */}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ flexGrow: 1, overflowY: 'auto' }} ref={chatContainerRef}>
                    {chatMessages.length > 0 ? (
                      chatMessages.map((msg, index) => (
                        <Box key={index} sx={{ marginBottom: 1, display: 'flex', flexDirection: 'column', alignItems: msg.user ? 'flex-start' : 'flex-end' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {msg.user && <AccountCircle sx={{ marginRight: 1, fontSize: 30 }} />} {/* User icon with adjusted size */}
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: 'bold', 
                                color: msg.user ? 'blue' : 'gray', 
                                lineHeight: '30px', // Match line height to icon size
                                display: 'flex', 
                                alignItems: 'center' // Center align text vertically
                              }}
                            >
                              {msg.user ? msg.user : 'AI:'} {/* Display user text next to the icon */}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: msg.ai === "Something went wrong.Please try again." ? 'red' : 'gray', fontSize: '20px', backgroundColor: msg.user ? '#e1f5fe' : '#f1f1f1', borderRadius: '8px', padding: '8px', maxWidth: '100%', alignSelf: msg.user ? 'flex-start' : 'flex-end' }}>
                            {msg.ai === 'Loading...' ? (
                              <CircularProgress size={20} sx={{ marginRight: 1 }} /> // Show loading spinner
                            ) :  <Markdown
                            components={{
                              h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
                              h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
                              p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} sx={{color: aiError || msg.ai === "Something went wrong.Please try again." ? 'red' : 'gray'}} />,
                              li: ({ node, ...props }) => <li style={{ marginBottom: '0.75rem', paddingLeft: '1.2rem' }} {...props} />,
                              a: ({ node, ...props }) => (
                                <a
                                  href={props.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#87CEFA', textDecoration: 'underline' }}
                                >
                                  {props.children}
                                </a>
                              ),
                            }}
                          >
                            {msg.ai}
                          </Markdown>}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                        <GlowingQ />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            marginTop: 2, 
                            textAlign: 'center', 
                            color: 'transparent', 
                            background: 'linear-gradient(45deg, #4fcaff, #7b65ff, #f57cff)', 
                            WebkitBackgroundClip: 'text', 
                            fontSize: '1.5rem', 
                            fontWeight: 'bold' 
                          }}
                        >
                          What do you want to discuss?
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Input for sending messages and Explain button at the top */}
                 <Box sx={{ mt: 2 }}>
                 {fileUrl && <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if(fetchTry){
                        fetchRetry()
                      }else{
                        handlePageChange(currentPage)
                      }
                    }}
                    disabled={!file || explanationLoading}
                    sx={{
                      width: '100%', // Make the button full width
                      mb: 1, // Add margin-bottom for spacing
                      transition: 'background-color 0.3s, transform 0.3s',
                      '&:hover': {
                        backgroundColor: '#00BFFF',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {fetchTry ? 'Retry' : 'Explain'}
                  </Button>}
                  {explanationLoading && fileUrl && <CircularProgress />}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {/* SendMessageInput at the bottom */}
                <SendMessageInput 
                init = {initialChat}
                  onSend={handlePageChange} 
                  disabled={explanationLoading} 
                  istrying={fetchTry} 
                  general={file && fileUrl} 
                  generalfunc={generalChat} 
                  setLoading={setLoadingMessage}
                />
                 </Box>
              </Box>
            </Drawer>
          )}

          {/* Snackbar Notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* Dialog for Mobile Users */}
          <Dialog
            open={dialogOpen}
            onClose={() => handleDialogClose(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" sx={{ backgroundColor: '#87CEFA', color: '#ffffff' }}>
              {"Lucid Q Works Best on Larger Screens"}
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f0f4f8' }}>
              <DialogContentText>
                Q is optimized for use on desktops and larger platforms. Using it on smaller screens may reduce functionality.
                You can chat with Q.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#f0f4f8' }}>
              <Button onClick={() => handleDialogClose(false)} color="primary" variant="outlined">
                Continue
              </Button>
              <Button onClick={() => {handleDialogClose(true);toggleRightSidebar()}} color="primary" variant="contained">
                Just Chat
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog 
            open={feedbackDialogOpen}
            onClose={() => {
              if (submissionStatus.submitted) {
                setSubmissionStatus({ submitted: false, error: false, processing: false });
                resetFeedback();
              }
              setFeedbackDialogOpen(false);
            }}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 2,
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {submissionStatus.processing && (
                <Backdrop
                  open={true}
                  sx={{
                    position: 'absolute',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CircularProgress 
                      size={60}
                      sx={{
                        color: '#00BFFF',
                        filter: 'drop-shadow(0 2px 4px rgba(0,191,255,0.3))'
                      }}
                    />
                  </motion.div>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#00BFFF',
                      fontWeight: 500,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Sending your Feedback
                  </Typography>
                </Backdrop>
              )}
              {!submissionStatus.submitted ? (
                <>
                  <DialogTitle sx={{ 
                    background: 'linear-gradient(45deg, #87CEFA, #00BFFF)',
                    color: 'white',
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FeedbackIcon />
                      <Typography variant="h6" sx={{color: 'white'}}>Help Us Improve Q</Typography>
                    </Box>
                    <IconButton
                      onClick={() => setFeedbackDialogOpen(false)}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent sx={{ py: 3 }}>
                    <Box sx={{ 
                      px: 3, 
                      pt: 2, 
                      pb: 1,
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2 
                    }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(currentQuestion + 1) / totalQuestions * 100}
                        sx={{
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(135, 206, 250, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: 'linear-gradient(45deg, #87CEFA, #00BFFF)',
                          }
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        color="textSecondary"
                        sx={{ 
                          minWidth: 'fit-content',
                          fontWeight: 500 
                        }}
                      >
                        {currentQuestion + 1} of {totalQuestions}
                      </Typography>
                    </Box>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentQuestion === 0 && (
                        <TextField
                          fullWidth
                          label="Your Email (Optional)"
                          variant="outlined"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          type="email"
                          placeholder="example@email.com"
                          sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.3s',
                              '&:hover': {
                                backgroundColor: 'rgba(135, 206, 250, 0.05)',
                              },
                              '&.Mui-focused': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#00BFFF',
                                  borderWidth: 2,
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(0, 0, 0, 0.6)',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#00BFFF',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <Tooltip title="Your email will only be used to follow up on your feedback if needed" placement="top">
                                <IconButton size="small">
                                  <InfoIcon fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                                </IconButton>
                              </Tooltip>
                            ),
                          }}
                        />
                      )}
                      {questions.map((q, index) => (
                        <Box
                          key={q.id}
                          sx={{
                            display: currentQuestion === index ? 'block' : 'none',
                            mt: 2,
                            animation: 'fadeIn 0.5s ease-out',
                          }}
                        >
                          <FormControl component="fieldset" sx={{ width: '100%' }}>
                            <FormLabel component="legend" sx={{ 
                              color: 'primary.main',
                              fontSize: '1.2rem',
                              mb: 2,
                              fontWeight: 500
                            }}>
                              {q.question}
                            </FormLabel>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {q.options.map((option) => (
                                <FormControlLabel
                                  key={option}
                                  control={
                                    <Checkbox
                                      checked={feedbackAnswers[q.id]?.includes(option) || false}
                                      onChange={() => handleCheckboxChange(q.id, option)}
                                      sx={{
                                        color: '#87CEFA',
                                        '&.Mui-checked': {
                                          color: '#00BFFF',
                                        },
                                        '& .MuiSvgIcon-root': {
                                          fontSize: 28,
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      sx={{
                                        fontSize: '1rem',
                                        transition: 'color 0.3s',
                                        '&:hover': {
                                          color: '#00BFFF',
                                        }
                                      }}
                                    >
                                      {option}
                                    </Typography>
                                  }
                                  sx={{
                                    mb: 1,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                      transform: 'translateX(8px)',
                                    },
                                    borderRadius: 1,
                                    padding: '8px 12px',
                                    '&:hover': {
                                      backgroundColor: 'rgba(135, 206, 250, 0.1)',
                                    }
                                  }}
                                />
                              ))}
                            </Box>
                            <TextField
                              multiline
                              rows={3}
                              fullWidth
                              placeholder="Add additional comments..."
                              variant="outlined"
                              value={feedbackAnswers[`${q.id}_details`] || ''}
                              onChange={(e) => setFeedbackAnswers(prev => ({
                                ...prev,
                                [`${q.id}_details`]: e.target.value
                              }))}
                              sx={{
                                mt: 3,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  transition: 'all 0.3s',
                                  '&:hover': {
                                    backgroundColor: 'rgba(135, 206, 250, 0.05)',
                                  },
                                  '&.Mui-focused': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#00BFFF',
                                      borderWidth: 2,
                                    },
                                  },
                                },
                              }}
                            />
                          </FormControl>
                        </Box>
                      ))}
                    </motion.div>
                  </DialogContent>
                  <DialogActions sx={{ 
                    p: 3, 
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <Button
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(prev => prev - 1)}
                      variant="outlined"
                      startIcon={<ArrowBackIcon />}
                      sx={{
                        borderColor: '#87CEFA',
                        color: '#87CEFA',
                        '&:hover': {
                          borderColor: '#00BFFF',
                          backgroundColor: 'rgba(135, 206, 250, 0.1)',
                        },
                      }}
                    >
                      Previous
                    </Button>
                    <Box>
                      {currentQuestion < questions.length - 1 ? (
                        <Button
                          onClick={() => setCurrentQuestion(prev => prev + 1)}
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            background: 'linear-gradient(45deg, #87CEFA, #00BFFF)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #00BFFF, #87CEFA)',
                            },
                            boxShadow: '0 4px 10px rgba(0,191,255,0.3)',
                          }}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFeedbackSubmit}
                          variant="contained"
                          disabled={submissionStatus.processing}
                          sx={{
                            background: 'linear-gradient(45deg, #87CEFA, #00BFFF)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #00BFFF, #87CEFA)',
                            },
                            boxShadow: '0 4px 10px rgba(0,191,255,0.3)',
                            minWidth: 150, // Ensure consistent width during loading
                            position: 'relative', // For loading spinner positioning
                          }}
                        >
                          {submissionStatus.processing ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress
                                size={20}
                                sx={{ 
                                  color: 'white',
                                  position: 'absolute',
                                  left: '50%',
                                  marginLeft: '-10px',
                                }}
                              />
                              <Typography
                                component="span"
                                sx={{
                                  opacity: 0,
                                  display: 'inline-block',
                                  width: '100%',
                                }}
                              >
                                Submit Feedback
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              Submit Feedback
                              <SendIcon sx={{ ml: 1 }} />
                            </>
                          )}
                        </Button>
                      )}
                    </Box>
                  </DialogActions>
                </>
              ) : (
                <SuccessDialog />
              )}
            </Box>
          </Dialog>

          {/* Dialog for Information */}
          <Dialog open={infoDialogOpen} onClose={handleInfoDialogClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#00BFFF', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
              <Typography variant="h5">About Q</Typography>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f0f4f8', padding: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <GlowingQ width='50%' height='100px'/>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', fontSize: '1.1rem', lineHeight: 1.5 }}>
                Q, a prototype from <Link href='/' style={{color: 'blue'}}>Lucid</Link> is designed to provide an interactive reading experience with PDF documents.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  We are currently gathering feedback to improve the your learning experience. Your insights are invaluable to us!
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
                  Features include:
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="body2">📄 Upload and view PDF documents.</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="body2">💡 Get explanations and insights on the content.</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="body2">💬 Interactive chat for user queries.</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', lineHeight: 1.5 }}>
                  Please provide your feedback to help us make Q even better.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                  <Copyright sx={{ fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                    Lucid 2024
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
             <DialogActions sx={{ backgroundColor: '#f0f4f8', justifyContent: 'center' }}>
                <Button onClick={handleInfoDialogClose} variant="contained" sx={{ backgroundColor: '#00BFFF', color: '#ffffff', '&:hover': { backgroundColor: '#87CEFA' } }}>
                  Close
                 </Button>
  </DialogActions>
          </Dialog>
        </Box>
      )}

      {/* Custom Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </ThemeProvider>
  );
}
