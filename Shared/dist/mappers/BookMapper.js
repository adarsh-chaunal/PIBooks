"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMapper = void 0;
const Book_1 = require("../entities/Book");
class BookMapper {
    static toEntity(createDto) {
        return new Book_1.Book({
            title: createDto.title,
            author: createDto.author,
            genre: createDto.genre,
            publishedYear: createDto.publishedYear,
            isAvailable: createDto.isAvailable ?? true
        });
    }
    static toUpdateEntity(updateDto, existingBook) {
        return new Book_1.Book({
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
    static toResponseDto(book) {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            publishedYear: book.publishedYear,
            isAvailable: book.isAvailable,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        };
    }
    static toResponseDtoArray(books) {
        return books.map(book => this.toResponseDto(book));
    }
    static fromMongooseDocument(mongooseDoc) {
        return new Book_1.Book({
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
    static fromMongooseDocumentArray(mongooseDocs) {
        return mongooseDocs.map(doc => this.fromMongooseDocument(doc));
    }
}
exports.BookMapper = BookMapper;
//# sourceMappingURL=BookMapper.js.map