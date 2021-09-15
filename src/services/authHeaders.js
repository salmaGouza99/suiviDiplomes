import authService from "./authService";

export default function authHeaders() {
    const user = authService.getCurrentUser();

    if (user && user.accessToken) {
        return {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            }
        };
    } else {
        return { 
            headers: { user }
        };
    }
}