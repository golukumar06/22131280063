import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlResultCard from '../components/UrlResultCard';
import { logAction } from '../utils/loggerMiddlewares';

const Home = () => {
  const [results, setResults] = useState([]);

  const handleShorten = (entries) => {
    const now = new Date();

    const processed = entries.map(({ url, customCode, expiry }) => {
      const code = customCode || Math.random().toString(36).substr(2, 6);
      const validUntil = new Date(now.getTime() + (expiry || 30) * 60000); // default 30 minutes

      const entry = {
        code,
        url,
        expiry: validUntil.toISOString(),
        clicks: [],
      };

      // Save to localStorage
      localStorage.setItem(code, JSON.stringify(entry));
      logAction('SHORTEN_URL', { url, code, expiry: validUntil.toISOString() });

      return entry;
    });

    setResults(processed);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          🔗 URL Shortener
        </Typography>
        <UrlForm onSubmit={handleShorten} />
        <Grid container spacing={2} mt={2}>
          {results.map((res) => (
            <Grid item xs={12} md={6} key={res.code}>
              <UrlResultCard {...res} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
