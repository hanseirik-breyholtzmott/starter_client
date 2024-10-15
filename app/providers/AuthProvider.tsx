interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
interface AtuhResponse {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: number;
  message: string;
  success: boolean;
  redirectUrl?: string;
}

export interface AuthProvider {
  login: (email?: string, password?: string) => Promise<AtuhResponse>;
  register: (
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) => Promise<AtuhResponse>;
}
