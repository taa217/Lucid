'use client'
import React, { useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function SendMessageInput({ init,onSend, disabled, istrying, fetchfunc, general, generalfunc, setLoading }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      if (!general) {
        generalfunc(message,init);
      } else {
        if (istrying) {
          fetchfunc(message);
        } else {
          onSend(message);
        }
      }
      setMessage('');
      setLoading(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={!general ? 'Message Q' : "Ask follow-up Question"}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      size="small"
      multiline
      maxRows={10}
      sx={{
        '& .MuiInputBase-root': {
          paddingRight: '8px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f0f0f0',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#1976d2',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#1565c0',
          },
        },
        overflowY: 'auto',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button 
              onClick={handleSend} 
              disabled={disabled || !message.trim()}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#87CEFA',
                borderRadius: '4px',
                minWidth: '40px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#87CEFA',
                },
              }}
            >
              <ArrowUpwardIcon sx={{ color: 'white', fontSize: '20px', fontWeight: '90px' }} />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}
