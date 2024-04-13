const express = require("express");
const cors = require("cors");
const User = require("./model/User");
const Post = require("./model/Post");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'ca0615e3849c50219c366a41f00b23d106ef01cb2b7e1517a46c56b6f834315d';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://kaveesha:kaveesha123@learnmongo.le3guvg.mongodb.net/?retryWrites=true&w=majority&appName=LearnMongo');


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token ', token).json({
                id: userDoc._id,
                username
            });
        });
    } else {
        res.status(400).json("wrong credentials");
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', ' ').json('ok');
});

app.post('/blogs', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, body} = req.body;
        try {
            const postDoc = await Post.create({
                title,
                summary,
                body,
                author: info.id,
            })
            res.json(postDoc);
        } catch {
            res.status(400).json(e);
        }
    })

});

app.put('/blogs', async (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {},async (err,info) => {
        if(err) throw err;
        const {id, title , summary, body} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor){
            return res.status(400).json("you are not the author");
        }
        await postDoc.updateOne({
            title,
            summary,
            body,
        });

        res.json(postDoc);
    })
})

app.get('/blogs', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .limit(20)
    );
});

app.get('/blogs/:id', async (req,res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})



app.listen(4000);

//mongodb+srv://kaveesha:kaveesha123@learnmongo.le3guvg.mongodb.net/?retryWrites=true&w=majority&appName=LearnMongo