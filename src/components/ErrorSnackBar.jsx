import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorSnackBar = ({ message, setMessage }) => {
  const handleClose = () => setMessage('');

  return (
    <Snackbar open={!!message} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">{message}</Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
