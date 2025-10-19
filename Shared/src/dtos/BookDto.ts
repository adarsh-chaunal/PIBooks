import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear() + 1)
  publishedYear!: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear() + 1)
  publishedYear?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

export class BookResponseDto {
  id!: string;
  title!: string;
  author!: string;
  genre?: string;
  publishedYear!: number;
  isAvailable!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
