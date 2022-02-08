const express = require('express');
const app = express();
const port = 8082;
app.use('/assets',express.static('assets'));
app.use("/src",express.static("src"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/paginas/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/paginas/login.html');
});

app.get('/register',(req,res) => {
    res.sendFile(__dirname + '/paginas/register.html');
});

app.get('/recovery-password',(req,res) => {
    res.sendFile(__dirname + '/paginas/recovery-password.html');
});

app.get("/game/:id",(req, res) => {
    res.sendFile(__dirname + '/paginas/juego.html');
});


app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/paginas/404.html');
});

app.listen(port);