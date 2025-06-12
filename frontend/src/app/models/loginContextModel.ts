import { LoginResponse } from "./responseLogin"
import { User } from "./userModel"

export interface LoginType {
    user: User | null,
    authUser: (email: string, password: string) => Promise<LoginResponse>
    logout: () => void
}