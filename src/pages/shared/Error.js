import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({ errorCode = 500, errorMessage = "Unexpected error occurred." }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚨 Dev Error Log:', { errorMessage, errorCode });
    }
  }, [errorMessage, errorCode]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
      </Box>

      <Typography variant="h4" gutterBottom color="error">
        Oops! Something went wrong
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {errorMessage}
      </Typography>

      <Typography variant="caption" sx={{ mb: 4 }} color="textSecondary">
        Error Code: {errorCode}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ textTransform: 'none' }}
        >
          Go to Home
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ textTransform: 'none' }}
          href="mailto:dev@example.com?subject=App Error Report"
        >
          Contact Developer
        </Button>
      </Box>
    </Container>
  );
}
