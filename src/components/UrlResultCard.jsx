import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const UrlResultCard = ({ url, code, expiry }) => {
  const shortUrl = `${window.location.origin}/${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">Original: {url}</Typography>
        <Typography variant="subtitle1" color="primary">Short: <a href={shortUrl}>{shortUrl}</a></Typography>
        <Typography variant="caption">Valid till: {new Date(expiry).toLocaleString()}</Typography>
        <Stack direction="row" mt={1}>
          <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
            Copy
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UrlResultCard;
