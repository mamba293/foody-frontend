export const registerUserAction = async (email, phone, password) => {
    try {
        const res = await fetch('http://localhost:5000/api/users/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, phone, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Check your email for activation link!');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
}