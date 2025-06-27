import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, Paper, Grid,
} from '@mui/material';
import { isValidUrl, isValidShortCode, isValidExpiry } from '../utils/validators';
import ErrorSnackBar from './ErrorSnackBar';

const UrlForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState([
    { url: '', customCode: '', expiry: '' },
  ]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  const addInputField = () => {
    if (formData.length >= 5) return;
    setFormData([...formData, { url: '', customCode: '', expiry: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const { url, customCode, expiry } of formData) {
      if (!isValidUrl(url)) return setError('Invalid URL found!');
      if (customCode && !isValidShortCode(customCode)) return setError('Invalid custom shortcode!');
      if (expiry && !isValidExpiry(expiry)) return setError('Invalid expiry time!');
    }

    onSubmit(
      formData.map((f) => ({
        ...f,
        expiry: f.expiry ? parseInt(f.expiry) : 30,
      }))
    );

    setFormData([{ url: '', customCode: '', expiry: '' }]);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        {formData.map((entry, i) => (
          <Box key={i} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Original URL"
                  value={entry.url}
                  onChange={(e) => handleChange(i, 'url', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Custom Shortcode (optional)"
                  value={entry.customCode}
                  onChange={(e) => handleChange(i, 'customCode', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Expiry (min, default 30)"
                  value={entry.expiry}
                  onChange={(e) => handleChange(i, 'expiry', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        ))}

        <Box display="flex" gap={2} mt={2}>
          <Button variant="contained" onClick={addInputField} disabled={formData.length >= 5}>
            Add More
          </Button>
          <Button variant="contained" color="success" type="submit">
            Shorten All
          </Button>
        </Box>
      </form>

      <ErrorSnackBar message={error} setMessage={setError} />
    </Paper>
  );
};

export default UrlForm;
