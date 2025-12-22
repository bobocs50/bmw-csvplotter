export async function loginUser(inputEmail: string, inputPassword: string) {
    if (!inputEmail || !inputPassword) {
        return {success: false, data: undefined};
    }
    
    const credentials = {
        email: inputEmail,
        password: inputPassword,
    };

    const options : RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    }