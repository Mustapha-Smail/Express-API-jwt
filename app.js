import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app = express()
import pug from 'pug';
import bodyParser from 'body-parser';
const { urlencoded } = bodyParser
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt; 

app.use(express.json()); 
app.set('view engine', 'pug');
app.use(urlencoded({ extended: false })); 
app.use(express.static('public'));

let users = []; 

app.get('/create', (req, res)=>{
    res.render('index');
})

app.post('/create', async (req, res)=>{

    try {
        const nom = req.body.nom; 
        const email = req.body.mail;
        const hashedPassword = await hash(req.body.password, 10);
        const user ={
            'nom': nom,  
            'email': email, 
            'password': hashedPassword 
        }
        users.push(user);
        res.status(201).redirect('connect'); 
    } catch {
        res.status(500).send("Echoué à créer un nouvel utilisateur!");
    }  

})

app.get('/connect', (req, res)=>{
    res.render('connect'); 
})

app.post('/login', async (req, res)=>{
    const user = users.find(user => user.email === req.body.email);

    if (user == null) {
        return res.status(400).send('Utilisateur introuvable! ');
    }
    try {
        if(await compare(req.body.password, user.password)) {
            
            const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' }); 
            res.cookie('token', accessToken).redirect('/restricted'); 

        } else {
            res.render('connect', {message:'Mot de passe incorrect!'});
        }
    } catch {
        res.status(500).send();
    }
})

app.get('/restricted', authenticateToken, (req, res) => {
    res.render('restricted', {message: req.user.nom}); 
})

function authenticateToken(req, res, next) {
    const token = req.headers.cookie.substring(6); // enlenver 'token=' au debut 

    if (token == null) return res.sendStatus(401); 
        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403); 
        req.user = user
        next()
    })
}

app.listen(3000, ()=>{
    console.log("server started on http://localhost:3000/create");
})

export default app; 