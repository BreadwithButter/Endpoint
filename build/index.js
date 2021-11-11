"use strict";
/**Import of libraries; books.JSON - input file; response / reposnse_short - JSON input settings*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = require("body-parser");
/**
 *  Encoding of JSON file
*/
let app;
const myFile = fs_1.default.readFileSync("books.json");
var myFile_enc = JSON.parse(myFile.toString());
/**Search ID in book.JSON file*/
let myMap = new Map();
myFile_enc.forEach((responses) => myMap.set(responses.id, responses));
/**
 * Creating a htttp server, seting up .post() and .get() settings
*/
function createServer() {
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(3000, () => {
        console.log('Server ON, port :3000');
    });
    /**
     *  .post() declaration
     */
    app.post('/api/library/book/:id/info', (req, res) => {
        const id = req.params['id'];
        let _id = parseInt(id);
        let lookfor_id = myMap.get(_id);
        if (myMap.has(_id)) {
            res.json(lookfor_id);
        }
        else {
            res.json({ id: 'Kniha s daným ID nebola nájdená' });
        }
    });
    /**
     *  .get() declaration
    */
    app.get('/api/library/book/:id/info', (req, res) => {
        const id = req.params['id'];
        let _id = parseInt(id);
        let lookfor_id = myMap.get(_id);
        if (myMap.has(_id)) {
            let write_book_short = {
                id: lookfor_id.name,
                name: lookfor_id.name,
                author: lookfor_id.author,
                genre: lookfor_id.genre,
            };
            res.json(write_book_short);
        }
        else {
            res.json({ id: 'Kniha s daným ID nebola nájdená' });
        }
    });
}
createServer();
