import { jwtDecode } from "jwt-decode";

export const jwtParser = (token: string | null) => {
    if (!token) {
        return null;
    }
    return jwtDecode(token);
};
