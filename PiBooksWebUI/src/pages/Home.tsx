import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { Book, Add, List } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to PiBooks
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your comprehensive book management system
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Book sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Browse Books
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Explore our collection of books and discover new reads
              </Typography>
              <Button
                variant="contained"
                startIcon={<List />}
                onClick={() => navigate('/books')}
                fullWidth
              >
                View All Books
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Add sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Add New Book
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Contribute to our library by adding new books
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Add />}
                onClick={() => navigate('/books/add')}
                fullWidth
              >
                Add Book
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Book sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Manage Library
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Organize and manage your book collection efficiently
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<Book />}
                onClick={() => navigate('/books')}
                fullWidth
              >
                Manage Books
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
