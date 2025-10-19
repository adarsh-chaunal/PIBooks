import { Book } from '../entities/Book';
import { CreateBookDto, UpdateBookDto, BookResponseDto } from '../dtos/BookDto';

export class BookMapper {
  static toEntity(createDto: CreateBookDto): Book {
    return new Book({
      title: createDto.title,
      author: createDto.author,
      genre: createDto.genre,
      publishedYear: createDto.publishedYear,
      isAvailable: createDto.isAvailable ?? true
    });
  }

  static toUpdateEntity(updateDto: UpdateBookDto, existingBook: Book): Book {
    return new Book({
      id: existingBook.id,
      title: updateDto.title ?? existingBook.title,
      author: updateDto.author ?? existingBook.author,
      genre: updateDto.genre ?? existingBook.genre,
      publishedYear: updateDto.publishedYear ?? existingBook.publishedYear,
      isAvailable: updateDto.isAvailable ?? existingBook.isAvailable,
      createdAt: existingBook.createdAt,
      updatedAt: new Date()
    });
  }

  static toResponseDto(book: Book): BookResponseDto {
    return {
      id: book.id!,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear,
      isAvailable: book.isAvailable!,
      createdAt: book.createdAt!,
      updatedAt: book.updatedAt!
    };
  }

  static toResponseDtoArray(books: Book[]): BookResponseDto[] {
    return books.map(book => this.toResponseDto(book));
  }

  static fromMongooseDocument(mongooseDoc: any): Book {
    return new Book({
      id: mongooseDoc._id?.toString(),
      title: mongooseDoc.title,
      author: mongooseDoc.author,
      genre: mongooseDoc.genre,
      publishedYear: mongooseDoc.publishedYear,
      isAvailable: mongooseDoc.isAvailable,
      createdAt: mongooseDoc.createdAt,
      updatedAt: mongooseDoc.updatedAt
    });
  }

  static fromMongooseDocumentArray(mongooseDocs: any[]): Book[] {
    return mongooseDocs.map(doc => this.fromMongooseDocument(doc));
  }
}
