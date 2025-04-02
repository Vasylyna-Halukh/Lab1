// script.js (фронтенд логіка)
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const client = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        country: document.getElementById('country').value,
        agreement: document.getElementById('agreement').checked
    };
    
    const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    });
    
    if (response.ok) {
        alert('Клієнт успішно зареєстрований!');
        document.getElementById('registrationForm').reset();
    } else {
        alert('Помилка при реєстрації.');
    }
});
