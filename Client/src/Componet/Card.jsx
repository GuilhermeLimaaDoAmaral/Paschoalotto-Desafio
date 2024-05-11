import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function OutlinedCard({ title, word, definition, example }) {
  const handleLearnMore = () => {
    window.location.href = 'https://randomuser.me/';
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent style={{ backgroundColor: '#2c2e31', color: 'white' }}>
          <Typography sx={{ fontSize: 10, textAlign: 'center', color: 'white' }} gutterBottom>
            <h1>
              RANDOM USER GENERATOR
            </h1>
            <p>A free, open-source API for generating random user data. Like Lorem Ipsum, but for people.</p>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
            Email: {definition}
            <br />
            Nome: {title}
            <br />
            Senha: {word}
          </Typography>        
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button size="small" onClick={handleLearnMore}>Saiba mais</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
