export interface User {
    id?: number;
    email: string;
    password: string;
    role?: string;
    created_at: string | undefined;
    updated_at: string | undefined;
}
