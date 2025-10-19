import api from './api';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  publishedYear: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre?: string;
  publishedYear: number;
  isAvailable?: boolean;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  genre?: string;
  publishedYear?: number;
  isAvailable?: boolean;
}

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data;
  },

  // Get book by ID
  getBookById: async (id: string): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Create new book
  createBook: async (bookData: CreateBookRequest): Promise<Book> => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // Update book
  updateBook: async (id: string, bookData: UpdateBookRequest): Promise<Book> => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Delete book
  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};
