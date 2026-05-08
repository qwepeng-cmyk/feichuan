async function testLogin() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'admin123' })
        });
        const result = await response.json();
        console.log('Login Test Result:', result);
    } catch (error) {
        console.error('Login Test Error:', error.message);
    }
}

testLogin();
