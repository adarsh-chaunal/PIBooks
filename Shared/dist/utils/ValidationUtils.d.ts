export declare class ValidationUtils {
    static validateDto<T extends object>(dtoClass: new () => T, plainObject: any): Promise<{
        isValid: boolean;
        errors: string[];
        dto?: T;
    }>;
    static isValidObjectId(id: string): boolean;
    static sanitizeString(str: string): string;
    static isValidEmail(email: string): boolean;
}
//# sourceMappingURL=ValidationUtils.d.ts.map