export interface Profile {
    id?: number;
    userId: number;
    profileId: string;
    name?: string;
    doc?: string;
    status: string;
    created_at: string | undefined;
    updated_at: string | undefined;
}
