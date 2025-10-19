import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService, Book, UpdateBookRequest } from '../services/bookService';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<UpdateBookRequest>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    try {
      setFetching(true);
      const data = await bookService.getBookById(bookId);
      setBook(data);
      setFormData({
        title: data.title,
        author: data.author,
        genre: data.genre || '',
        publishedYear: data.publishedYear,
        isAvailable: data.isAvailable,
      });
    } catch (err) {
      setError('Failed to fetch book details');
      console.error('Error fetching book:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      // Clean up form data
      const submitData = {
        ...formData,
        title: formData.title?.trim(),
        author: formData.author?.trim(),
        genre: formData.genre?.trim() || undefined,
        publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
      };

      await bookService.updateBook(id, submitData);
      navigate(`/books/${id}`);
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
          onClick={() => navigate(`/books/${book.id}`)}
          sx={{ mb: 2 }}
        >
          Back to Book Details
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Book
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author || ''}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={formData.genre || ''}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Published Year"
              name="publishedYear"
              type="number"
              value={formData.publishedYear || ''}
              onChange={handleChange}
              required
              margin="normal"
              inputProps={{
                min: 1000,
                max: new Date().getFullYear() + 1,
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="isAvailable"
                  checked={formData.isAvailable || false}
                  onChange={handleChange}
                />
              }
              label="Available"
              sx={{ mt: 2, mb: 2 }}
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Book'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/books/${book.id}`)}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditBook;
