import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ValidationUtils {
  static async validateDto<T extends object>(
    dtoClass: new () => T,
    plainObject: any
  ): Promise<{ isValid: boolean; errors: string[]; dto?: T }> {
    const dto = plainToClass(dtoClass, plainObject);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.flatMap(error => 
        Object.values(error.constraints || {})
      );
      return { isValid: false, errors: errorMessages };
    }

    return { isValid: true, errors: [], dto };
  }

  static isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  static sanitizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
