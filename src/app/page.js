// pages/index.js
'use client'
import { AppBar, Toolbar, Container, Box, Typography, Button, Grid, Paper, Link, TextField, IconButton,Snackbar, Fade,Alert } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image'; // Import Image component for logo and visuals
import { Facebook, X, Instagram, LinkedIn, Menu as MenuIcon } from '@mui/icons-material'; // Added MenuIcon for mobile navigation
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import emailjs from '@emailjs/browser';
import JoinDialog from './components/JoinDialog'; // Import the JoinDialog component
import GlowingQSVG from '../../components/GlowingQ';
import GlowingQ3D from '../../components/GlowingQ3D'

export default function Home() {
  // State to simulate book upload and email subscription
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [bookUploaded, setBookUploaded] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog



  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simulate book upload
  const handleUploadClick = () => {
    setBookUploaded(true);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle email subscription
  const handleSubscribe = async () => {
    if (!email) {
      setSubscriptionStatus('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus('');

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
          userEmail: email
        }),
      });

      
      if (response.ok) {
        // Add a small delay for smoother transition
        setSnackbar({ open: true, message: 'Thank you for subscribing!', severity: 'success' });
        setEmail('');
      } else {
        throw new Error('Failed to send subscription');
      }
      
    } catch (error) {
      setSnackbar({ open: true, message: 'Somethig went wrong. Please try again', severity: 'error' });
    } finally {
      setIsSubscribing(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleJoinClick = () => {
    setDialogOpen(true); // Open the dialog
  };

  return (
    <div style={{ fontSize: '30px', lineHeight: '2.6' }}> {/* Global font size and line height */}
      {/* Navbar */}
      <AppBar position="stick" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href='/' color='inherit' underline='none' display='flex' alignItems='center' sx={{ margin: 0, padding: 0}}>
          <Image src='/Lucid (5).svg' height={50} width={50} style={{ marginRight: '0px' }}/>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', margin: 0 }}>
            Lucid
          </Typography>
        </Link>
          <Box>
            <Link href='/mission' color='inherit'>
            <Button color="inherit" sx={{ mx: 0.5 }}>
              Mission
            </Button>
            </Link>
           
            <Button color="inherit" sx={{ mx: 1, textDecoration: 'underline' }} onClick={handleJoinClick}>
              Join
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 6, md: 10 },
            px: { xs: 2, md: 0.5 },
            background: 'linear-gradient(135deg, #81d4fa, #e1f5fe)',
            borderRadius: 3,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            mb: 6,
            width: '100%',
          }}
        >
          <Fade in timeout={500}>
            <div>
              <Typography variant={isMobile ? "h4" : "h3"} gutterBottom sx={{ fontWeight: 600,
                backgroundImage: 'linear-gradient(645deg, blue, #d18aff)', // Bright blue and purple split at 50%
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
               }}>
              Enhanced Learning. Unleashing the Power of Understanding.
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom sx={{ maxWidth: '800px', margin: '0 auto', color: 'black' }}>
                At Lucid, we strive to make understanding information easy and intuitive. Our mission is to empower
                researchers, students, and lifelong learners with tools that simplify complex ideas.
              </Typography>
              <Link href='/mission'>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                sx={{ mt: 4, fontWeight: 'bold', px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 } }}
              >
                Learn More
              </Button>
              </Link>
            </div>
          </Fade>
        </Box>

        {/* Introducing Prototype 'Q' */}
        <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Meet 'Q' – Our AI-Assisted Reading App (Prototype)
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', margin: '0 auto', mb: 4, color: 'inherit' }}>
            'Q' is currently in its prototype phase, and we’re gathering feedback to make it even better. Upload books,
            ask questions, and let 'Q' help you understand and learn more efficiently.
          </Typography>
          {/* Displaying 'Q' Logo */}
          <GlowingQSVG height='300px' width='80%'/>
          <Link href='/q'>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            sx={{ fontWeight: 'bold', mt: 2, px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 } }}
            onClick={handleUploadClick}
          >
            Try 'Q' Now
          </Button>
          </Link>
        </Box>

        {/* How 'Q' Works */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom textAlign="center">
            How 'Q' Works
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Upload Your Book
                </Typography>
                <Typography color="textSecondary">
                  Easily upload books in PDF format and get started right away.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Get Explanations Instantly
                </Typography>
                <Typography color="textSecondary">
                  Our AI breaks down complex concepts into easy-to-understand explanations as you read.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Ask and Discover
                </Typography>
                <Typography color="textSecondary">
                  Ask questions about the content and let 'Q' guide you to a deeper understanding.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* About Lucid Section */}
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 }, mt: { xs: 4, md: 8 } }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '800px', margin: '0 auto', color: 'inherit' }}>
          Our mission is to develop transformative technologies that enhance learning and research, simplify information
           comprehension, and accelerate knowledge acquisition, expediting the journey to understanding and shaping a
            brighter future for generations to come.

          </Typography>
          {/* Placeholder for additional imagery */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Image
              src="/air.jpg"
              alt="Research Illustration"
              width={isMobile ? 300 : 400}
              height={isMobile ? 225 : 300}
              style={{ marginTop: '20px', borderRadius: '8px' }}
            />
          </Box>
        </Box>

        {/* Future Plans Section */}
        <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#f5f5f5', borderRadius: 3, mt: { xs: 4, md: 8 }, color: 'black', px: { xs: 2, md: 0 } }}>
          <Typography variant={isMobile ? "h5" : "h4"} textAlign="center" gutterBottom>
            What’s Next for Lucid?
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '800px', margin: '0 auto', mb: 4, p: { xs: 1, md: 2 }, color: 'inherit' }}>
            Our vision extends beyond just reading assistance. We aim to create a suite of tools that make information
            accessible and easily digestible, transforming how knowledge is shared and consumed across the world.
          </Typography>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#222', color: '#fff', mt: 8, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom>
            Stay Connected
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ mb: 4 }}>
            Subscribe to our newsletter and follow us on social media to stay updated with our latest developments.
          </Typography>

          {/* Email Subscription Input */}
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              size="small"
              sx={{
                width: isMobile ? '100%' : '250px',
                backgroundColor: '#fff',
                borderRadius: 1,
                mr: isMobile ? 0 : 2,
                mb: isMobile ? 2 : 0
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribing}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                fontWeight: 'bold',
                width: isMobile ? '100%' : 'auto',
                position: 'relative',
                '&.Mui-disabled': {
          backgroundColor: 'lightgray', // Ensure styles apply when disabled
          color: 'blue',
        },
              }}
              onClick={handleSubscribe}
              disabled={isSubscribing}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </Button>
           
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <IconButton href="https://www.facebook.com/lucidai.company" target="_blank" color="inherit">
              <Facebook fontSize="large" />
            </IconButton>
            <IconButton href="#" target="_blank" color="inherit">
              <X fontSize="large" />
            </IconButton>
            <IconButton href="https://www.instagram.com/lucidai_company" target="_blank" color="inherit">
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton href="https://www.linkedin.com/company/lucidcompany" target="_blank" color="inherit">
              <LinkedIn fontSize="large" />
            </IconButton>
          </Box>

          {/* Footer Note */}
          <Typography variant="caption" color="inherit" sx={{ mt: 2, display: 'block' }}>
            &copy; {new Date().getFullYear()} Lucid. All rights reserved.
          </Typography>
        </Container>
      </Box>
      {/* Dialog for joining */}
      <JoinDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
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
    </div>
  );
}

