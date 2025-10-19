import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { bookService, CreateBookRequest } from '../services/bookService';

const AddBook: React.FC = () => {
  const [formData, setFormData] = useState<CreateBookRequest>({
    title: '',
    author: '',
    genre: '',
    publishedYear: new Date().getFullYear(),
    isAvailable: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Clean up form data
      const submitData = {
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre?.trim() || undefined,
        publishedYear: Number(formData.publishedYear),
      };

      await bookService.createBook(submitData);
      navigate('/books');
    } catch (err) {
      setError('Failed to create book. Please try again.');
      console.error('Error creating book:', err);
    } finally {
      setLoading(false);
    }
  };

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
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Book
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
              value={formData.title}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Published Year"
              name="publishedYear"
              type="number"
              value={formData.publishedYear}
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
                  checked={formData.isAvailable}
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
                {loading ? 'Creating...' : 'Create Book'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/books')}
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

export default AddBook;
