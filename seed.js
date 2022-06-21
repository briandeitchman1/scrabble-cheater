const fs = require('fs')
const mongoose = require('mongoose');
const WordsDB = require('./WordsDB')

try {

    mongoose.connect("mongodb://localhost/scrabble");
    console.log("connected to Database");
} catch (err) {
    console.log("couldn't connect to Database", err)
}


async function getData() {

    await WordsDB.deleteMany({});
    // const words = fs.readFileSync('testWords.txt', 'utf-8').toString().split('\r\n');
    const words = fs.readFileSync('wordList.txt', 'utf-8').toString().split('\r\n');
    let i = 0;

    sortedWordList = {}
    const map = new Map();
    for (let i = 0; i < words.length; i++) {
        let sortedWord = words[i].split('').sort().join("");
        if (!map.has(sortedWord)) {
            let arr = [words[i]];
            map.set(sortedWord, arr);
        } else {
            map.get(sortedWord).push(words[i])
        }
    }



    for (let [key, value] of map) {
        let newWordsList = new WordsDB({ wordsList: value, key: key })
        await newWordsList.save();
    }



}
async function test() {
    let words = await WordsDB.find({ key: "DGO" })
    console.log(words);
}
test();
//getData();
console.log("done")
//export default getData;