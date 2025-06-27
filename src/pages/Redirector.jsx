import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logAction } from '../utils/loggerMiddlewares';

const Redirector = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem(shortCode);
    if (!data) return navigate('/');

    const parsed = JSON.parse(data);
    const now = new Date();
    const expiry = new Date(parsed.expiry);

    if (now > expiry) {
      alert('Link has expired!');
      return navigate('/');
    }

    parsed.clicks.push({
      time: now.toISOString(),
      ip: 'mocked-ip',
      location: 'mocked-city',
    });

    localStorage.setItem(shortCode, JSON.stringify(parsed));
    logAction('URL_REDIRECT', { shortCode, time: now.toISOString() });

    window.location.href = parsed.url;
  }, [shortCode]);

  return <p>Redirecting...</p>;
};

export default Redirector;
