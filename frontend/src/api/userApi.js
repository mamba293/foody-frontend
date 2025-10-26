export const registerUserAction = async (userData) => {
    const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
};