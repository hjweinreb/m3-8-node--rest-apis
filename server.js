'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const { words } = require("./data/words");

const PORT = process.env.PORT || 8500;

global.enteredLetter = "none";

const handleHangman = (req, res) => {
    //let i = Math.floor(Math.random() * 10);   
    global.currentWordID = words[Math.floor(Math.random() * 10)].id;
    console.log("The current word ID is" + currentWordID)
    let enteredLetter = "none";
    global.foundWordObject = words.find(words => words.id === currentWordID);
    global.currentWordLength = foundWordObject.length;
    console.log("The world length is " + currentWordLength)
    global.letterSpots = [];
    for (let x = 0; x < currentWordLength; x++) {
        letterSpots.push(" _ ")
    }
    console.log(letterSpots);
    res.render("pages/hanger", { title: "IT WORKED!", enteredLetter, currentWordLength, letterSpots });

};

const handleLetter = (req, res) => {
    let enteredLetter = req.body.guess;
    console.log("entered letter is " + enteredLetter)
    //if ((words[currentWordID].includes(enteredLetter))) { console.log(enteredLetter + " is included!") }
    console.log("Checking if entered letter is in word" + currentWordID)
    //words.find(currentWordID)
    //const foundWordObject = words.find(words => words.id === currentWordID);
    console.log(foundWordObject.word)
    const currentWord = foundWordObject.word;
    global.arrayOfWord = currentWord.split("")
    console.log(arrayOfWord)
    //arrayOfWord.find(enteredLetter)
    arrayOfWord.forEach(replaceIndex)

    function replaceIndex(item, index) {
        if (item === enteredLetter) {
            console.log("it's in there" + item);
            letterSpots.splice(index, 1, enteredLetter)
            console.log(index)
        }
    }


    if ((currentWord.includes(enteredLetter))) {
        console.log("Yes!")
    } else { console.log("No!") }
    res.render("pages/hanger", { title: "IT WORKED!", enteredLetter, currentWordLength, letterSpots, arrayOfWord });



    //res.render("pages/hanger", { title: "IT WORKED!" });
};

express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json('test'))
    .use(express.urlencoded({ extended: false }))
    .set('view engine', 'ejs')

    // endpoints
    .get("/game", handleHangman)
    .post("/getguess", handleLetter)
    .get('*', (req, res) => res.send('404.'))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));