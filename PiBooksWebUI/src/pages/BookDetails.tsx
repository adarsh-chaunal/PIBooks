import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Edit as EditIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService, Book } from '../services/bookService';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    try {
      setLoading(true);
      const data = await bookService.getBookById(bookId);
      setBook(data);
    } catch (err) {
      setError('Failed to fetch book details');
      console.error('Error fetching book:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error || 'Book not found'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<BackIcon />}
          onClick={() => navigate('/books')}
          sx={{ mt: 2 }}
        >
          Back to Books
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={() => navigate('/books')}
          sx={{ mb: 2 }}
        >
          Back to Books
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={8}> */}
              <Typography variant="h4" component="h1" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                by {book.author}
              </Typography>
              
              <Box sx={{ mt: 2, mb: 2 }}>
                {book.genre && (
                  <Chip
                    label={book.genre}
                    color="primary"
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
                <Chip
                  label={book.isAvailable ? 'Available' : 'Unavailable'}
                  color={book.isAvailable ? 'success' : 'error'}
                  sx={{ mb: 1 }}
                />
              </Box>

              <Typography variant="body1" paragraph>
                <strong>Published Year:</strong> {book.publishedYear}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                <strong>Added:</strong> {new Date(book.createdAt).toLocaleDateString()}
              </Typography>
              
              {book.updatedAt && book.updatedAt !== book.createdAt && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Last Updated:</strong> {new Date(book.updatedAt).toLocaleDateString()}
                </Typography>
              )}
            {/* </Grid> */}
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/books/${book.id}/edit`)}
        >
          Edit Book
        </Button>
      </Box>
    </Container>
  );
};

export default BookDetails;
