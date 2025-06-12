export interface LoginResponse {
    success: boolean
    message: string
    status?: number
    role?: string | null
}