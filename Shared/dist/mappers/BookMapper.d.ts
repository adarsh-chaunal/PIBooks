import { Book } from '../entities/Book';
import { CreateBookDto, UpdateBookDto, BookResponseDto } from '../dtos/BookDto';
export declare class BookMapper {
    static toEntity(createDto: CreateBookDto): Book;
    static toUpdateEntity(updateDto: UpdateBookDto, existingBook: Book): Book;
    static toResponseDto(book: Book): BookResponseDto;
    static toResponseDtoArray(books: Book[]): BookResponseDto[];
    static fromMongooseDocument(mongooseDoc: any): Book;
    static fromMongooseDocumentArray(mongooseDocs: any[]): Book[];
}
//# sourceMappingURL=BookMapper.d.ts.map