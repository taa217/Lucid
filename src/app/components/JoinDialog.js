import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Snackbar, CircularProgress,Typography } from '@mui/material';
import { Person, Email, Work, Description } from '@mui/icons-material';

const JoinDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedInUrl: '',
    experience: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setLoading(false); // Stop loading

    if (response.ok) {
      setSnackbarMessage('Application submitted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setSuccessDialogOpen(true);
      onClose();
    } else {
      setSnackbarMessage('Failed to submit application. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        sx={{ 
          '& .MuiDialog-paper': { 
            borderRadius: '16px', 
            padding: '20px', 
            width: '500px', 
            maxWidth: '90%', 
          } 
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#1976d2' }}>
          Join Us
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>
              You have experience in any of the following tech stack: LangChain,Hugging Face Transformers, Rust Programming,Apache Spark/Flink, ReAct (Reasoning + Acting) Framework,Coqui, Neo4j? Join Us!
            </Typography>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
              variant="outlined"
              sx={{ borderRadius: '8px' }}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
              variant="outlined"
              sx={{ borderRadius: '8px' }}
            />
              <TextField
              name="linkedInUrl"
              label="LinkedIn / X / Facebook url"
              fullWidth
              margin="normal"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
              variant="outlined"
              sx={{ borderRadius: '8px' }}
            />
           
            <TextField
              name="experience"
              label="Experience"
              placeholder = "ex: Rust programming"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Description sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
              variant="outlined"
              sx={{ borderRadius: '8px' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={onClose} variant="outlined" color="error" sx={{ borderRadius: '8px' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained" 
            sx={{ borderRadius: '8px' }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </DialogActions>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleSuccessDialogClose}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            padding: '20px',
            backgroundColor: '#f0f4f8',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#00BFFF' }}>
          Application Received!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            We have received your application. We will get back to you as soon as possible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleSuccessDialogClose} variant="contained" color="primary" sx={{ borderRadius: '8px' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinDialog; 
