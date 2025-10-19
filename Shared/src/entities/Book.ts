import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class Book {
  @IsString()
  id?: string;

  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsNumber()
  publishedYear!: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  constructor(data?: Partial<Book>) {
    if (data) {
      Object.assign(this, data);
    }
    this.isAvailable = this.isAvailable ?? true;
  }
}
