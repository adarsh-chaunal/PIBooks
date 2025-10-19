"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ValidationUtils {
    static async validateDto(dtoClass, plainObject) {
        const dto = (0, class_transformer_1.plainToClass)(dtoClass, plainObject);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            const errorMessages = errors.flatMap(error => Object.values(error.constraints || {}));
            return { isValid: false, errors: errorMessages };
        }
        return { isValid: true, errors: [], dto };
    }
    static isValidObjectId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
    static sanitizeString(str) {
        return str.trim().replace(/\s+/g, ' ');
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
exports.ValidationUtils = ValidationUtils;
//# sourceMappingURL=ValidationUtils.js.map