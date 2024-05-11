import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard({word, definition, example }) {
  const handleLearnMore = () => {
    window.location.href = 'https://randomuser.me/';
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '16px' }}>
            Informações do Usuário
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>Email:</strong> {definition}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>Nome:</strong> {word}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px' }}>
            <strong>Senha:</strong> {example}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
        </CardActions>
      </Card>
    </Box>
  );
}
