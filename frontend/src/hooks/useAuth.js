const isAuthenticated = async () => {

    const res  = await fetch('http://localhost:8000/auth/isauth', {
        credentials: "include",
        method:'GET'
    });
    const data = await res.json();
    return data.auth;
}

export default isAuthenticated;