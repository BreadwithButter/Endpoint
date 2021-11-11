/**Import of libraries; books.JSON - input file; response / reposnse_short - JSON input settings*/

import cors from "cors";
import http from "http";
import express from "express";
import fs, { writeSync } from "fs";
import bodyParser, { json, urlencoded } from "body-parser";
import { response, response_short } from "./types/JSON_resp";

/**
 *  Encoding of JSON file 
*/

let app;
const myFile = fs.readFileSync("books.json");
var myFile_enc: response[] = JSON.parse(myFile.toString());

/**Search ID in book.JSON file*/
let myMap = new Map();
myFile_enc.forEach((responses: response) => myMap.set(responses.id , responses))


/**
 * Creating a htttp server, seting up .post() and .get() settings
*/
function createServer() {
    
    app = express();
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false}));


    http.createServer(app).listen(3000, () =>{
        console.log('Server ON, port :3000')
    })


    /**
     *  .post() declaration
     */
    app.post('/api/library/book/:id/info',(req, res) =>
    {
            const id = req.params['id'];
            let _id = parseInt(id);
            let lookfor_id = myMap.get(_id);
            if (myMap.has(_id))
            {
                res.json(lookfor_id);
                
            }
            else 
            {
                res.json({id: 'Kniha s daným ID nebola nájdená'})
            }
    })


    /**
     *  .get() declaration
    */
    app.get('/api/library/book/:id/info',(req, res) => 
    {
        const id = req.params['id'];
        let _id = parseInt(id);
        let lookfor_id = myMap.get(_id);

        if (myMap.has(_id))
        {
            let write_book_short: response_short = 
            {
                id: lookfor_id.name,
                name: lookfor_id.name,
                author: lookfor_id.author,
                genre: lookfor_id.genre,
            }
            res.json(write_book_short)
        }
        else 
        {
            res.json({id: 'Kniha s daným ID nebola nájdená'})
        }
    })

}

createServer()