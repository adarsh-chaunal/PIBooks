export declare class CreateBookDto {
    title: string;
    author: string;
    genre?: string;
    publishedYear: number;
    isAvailable?: boolean;
}
export declare class UpdateBookDto {
    title?: string;
    author?: string;
    genre?: string;
    publishedYear?: number;
    isAvailable?: boolean;
}
export declare class BookResponseDto {
    id: string;
    title: string;
    author: string;
    genre?: string;
    publishedYear: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=BookDto.d.ts.map