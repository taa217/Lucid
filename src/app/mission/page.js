'use client'
import { useState } from 'react';
import emailjs from '@emailjs/browser';
//import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Avatar,
    Divider,
    Grid,
    IconButton,
    TextField,
    Link,
    Snackbar,
    Alert
  } from '@mui/material';
  import { LinkedIn, Twitter, Facebook, Instagram, X } from '@mui/icons-material';
  import JoinDialog from '../components/JoinDialog'; // Import the JoinDialog component
import Image from 'next/image';
  
  export default function AboutPage() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [bookUploaded, setBookUploaded] = useState(false);
  const [email, setEmail] = useState('');
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

  const handleJoinClick = () => {
    setDialogOpen(true); // Open the dialog
  };

    return (
      <>
       {/* Navbar */}
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href='/' color='inherit' underline='none' display='flex' alignItems='center' sx={{ margin: 0, padding: 0}}>
          <Image src='/Lucid (5).svg' height={50} width={50} style={{ marginRight: '0px' }}/>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', margin: 0 }}>
            Lucid
          </Typography>
        </Link>
        
          <Box>
            <Link href='/mission' color='inherit'>
            <Button color="inherit" sx={{ mx: 1 }}>
              Mission
            </Button>
            </Link>
           
            <Button color="inherit" sx={{ mx: 0.5, textDecoration: 'underline' }} onClick={handleJoinClick}>
              Join
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#f5f7fa',
          py: 8,
          textAlign: 'center',
          borderBottom: '2px solid #ddd',
         
        }}
      >
        <Container>
          <Typography
            variant="h3"
            sx={{ fontWeight: '700', mb: 2, color: '#2c3e50',
              backgroundImage: 'linear-gradient(645deg, blue, #d18aff)', // Bright blue and purple split at 50%
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', }}
          >
            MISSION
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ maxWidth: '600px', margin: '0 auto', color: 'black' }}
          >
           Our mission is to create transformative technologies that enhance learning, make information intuitive, and accelerate knowledge acquisition to shape a brighter
               future.
          </Typography>
          <Link href='/q'>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4, fontWeight: 'bold', borderRadius: '25px' }}
          >
            Try 'Q' Now
          </Button>
          </Link>
        </Container>
      </Box>
  
        {/* Main About Section */}
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="body1" sx={{ mb: 3, }}>
              By: Clyde Tadiwa Rumombe, Founder & CEO . November 15, 2024
            </Typography>
          {/* Our Mission Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 4, color: 'inherit' }}>
          Our mission is to develop transformative technologies that enhance learning and research, simplify 
          information comprehension, and accelerate knowledge acquisition, expediting the journey to understanding and 
          shaping a brighter future for generations to come.
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* The Company Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            The Company
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 2 }}>
          Shaping the future of learning and research is, I believe, the moral priority of our time. 
          The most significant impact lies in channeling our resources into the development of transformative technologies. 
          With the coming wave of advancements in Artificial Intelligence (AI), our contributions at this foundational stage
          can help ensure that AI evolves to enhance learning and revolutionize how we consume and understand information.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 2 }}>
          This is the vision of Lucid: to develop transformative technologies that enhance learning and expedite 
          the learning and research process, shaping a brighter future for generations to come. By enhancing how we 
          understand and interact with information, we empower individuals to unlock new opportunities for growth, enabling
           them to make limitless discoveries.
          Lucid is our name; Lucidity is our mission. It defines our entire product roadmap and represents our sole
           focus. Our team are all aligned to achieve this vision - revolutionizing learning,
            expediting research, and transforming how the world understands and interacts with information.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 4 }}>
            Our company journey will take decades — and require a championship
            team dedicated to the mission and engineering innovation to achieve
            mass-market impact.<b> We face high risk and extremely low chances of
            success.</b> However, if we are successful, we have the potential to
            positively transform how information is consumed and to make a
            significant impact in research and learning.
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* Core Values Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Our Core Values
          </Typography>
          <Grid container spacing={3}>
            {/* Innovation */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Innovation
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: '1.8', color: 'black' }}>
                  We strive to create cutting-edge solutions that redefine how
                  information is consumed and understood.
                </Typography>
              </Box>
            </Grid>
            {/* Integrity */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Intuition
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: '1.8', color: 'black' }}>
                 We design solutions that anticipate user needs, creating experiences that feel natural, seamless, and effortless.
                </Typography>
              </Box>
            </Grid>
            {/* Impact */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Impact
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: '1.8', color: 'black' }}>
                  Our goal is to make a meaningful difference in how people learn and
                  comprehend information.
                </Typography>
              </Box>
            </Grid>
          </Grid>
  
          <Divider sx={{ my: 4 }} />
  
          {/* The Present Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            The Present
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 4 }}>
            Today, we are confronted with a myriad of challenges. Information is
            abundant but often fragmented, complex, and difficult to digest. The
            traditional learning methods have not kept pace with the exponential
            growth of knowledge and technological advancements. Researchers and
            students alike struggle to synthesize and understand critical
            information efficiently.
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* The Possibility Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            The Possibility
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 4 }}>
          Thankfully, we stand at the forefront of an AI, AR/VR, and spatial technology revolution. 
          This moment presents a unique opportunity to transform how we consume and interact with information, making it
           intuitive, immersive, and tailored to our needs. By harnessing these emerging technologies, we can redefine 
           learning and research—empowering individuals with deeper understanding, enhanced creativity, and more effective 
           problem-solving capabilities. We believe that AI, AR/VR, and spatial technologies together can revolutionize the 
           learning experience, making it more engaging, impactful, and accessible than ever before.
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* Conclusion */}
          <Typography variant="body1" sx={{ lineHeight: '1.8', mb: 4 }}>
            We have the potential to alter the trajectory of knowledge consumption
            and make a profound impact on society.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            It&apos;s time to build! <Typography component='span' sx={{ fontWeight: 'bold', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={handleJoinClick}>Join Us!</Typography>
          </Typography>
  
          {/* CEO Image and Signature */}
          <Grid container spacing={6} alignItems="center" sx={{ mt: 6 }}>
            <Grid item xs={4} sm={3}>
              <Avatar
                alt="Clyde Tadiwa Rumombe"
                src='/ceo1.jpg'
                sx={{ width: 120, height: 120 }}
              />
            </Grid>
            <Grid item xs={8} sm={9}>
              <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
                Clyde Tadiwa Rumombe
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                Founder & CEO
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  align: 'right',
                  pt: 0,
                  borderTop: '1px solid #e0e0e0',
                  mt: 0,
                }}
              >
                 <Image
                alt="signature"
                src='/signature.png'
                width={200}
                height={200}
              />
              </Typography>
            </Grid>
          </Grid>
        </Container>
  
        {/* Footer */}
 {/* Footer */}
 <Box sx={{ py: 6, backgroundColor: '#222', color: '#fff', mt: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom>
            Stay Connected
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ mb: 4 }}>
            Subscribe to our newsletter and follow us on social media to stay updated with our latest developments.
          </Typography>
          
          {/* Email Subscription Input */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              size="small"
              sx={{ 
                width: '250px', 
                backgroundColor: '#fff', 
                borderRadius: 1, 
                mr: 2 
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
            {subscriptionStatus && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  mt: 5,
                  color: subscriptionStatus.includes('thank you') ? 'green' : 'red'
                }}
              >
                {subscriptionStatus}
              </Typography>
            )}
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton href="https://www.facebook.com/profile.php?id=61570905955686" target="_blank" color="inherit">
              <Facebook fontSize="large" />
            </IconButton>
            <IconButton href="https://x.com/lucid_startup" target="_blank" color="inherit">
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
          <Typography variant="caption" color="inherit" sx={{ mt: 4, display: 'block' }}>
            &copy; {new Date().getFullYear()} Lucid. All rights reserved.
          </Typography>
        </Container>
      </Box>
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
      {/* Dialog for joining */}
      <JoinDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </>
    );
  }
  
