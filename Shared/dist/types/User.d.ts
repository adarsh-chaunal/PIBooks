export declare enum UserRole {
    ADMIN = "admin",
    AUTHOR = "author",
    READER = "reader"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface Author extends User {
    bio?: string;
    website?: string;
    socialMedia?: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
}
export interface Reader extends User {
    preferences?: {
        favoriteGenres?: string[];
        readingGoals?: {
            booksPerYear?: number;
            currentYear?: number;
        };
    };
}
//# sourceMappingURL=User.d.ts.map