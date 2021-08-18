export default function authHeaders() {
    const user = JSON.parse(localStorage.getItem("user"));

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