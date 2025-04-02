const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'clients.json');

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // Віддає статичні файли

// Віддаємо admin.html при запиті на /admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Отримати список клієнтів
app.get('/clients', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Помилка читання бази даних' });
        }
        res.json(JSON.parse(data));
    });
});

// Додати нового клієнта
app.post('/clients', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Помилка читання бази даних' });
        }
        let clients = JSON.parse(data);
        const newClient = { id: clients.length + 1, ...req.body };
        clients.push(newClient);
        fs.writeFile(DATA_FILE, JSON.stringify(clients, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Помилка запису в базу даних' });
            }
            res.json(newClient);
        });
    });
});

// Видалити клієнта
app.delete('/clients/:id', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Помилка читання бази даних' });
        }
        let clients = JSON.parse(data);
        const clientId = parseInt(req.params.id);
        clients = clients.filter(client => client.id !== clientId);
        fs.writeFile(DATA_FILE, JSON.stringify(clients, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Помилка запису в базу даних' });
            }
            res.json({ message: 'Клієнт видалений' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
