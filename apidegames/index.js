const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Games = require("./database/Games");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.get('/games', (req, res) => {
   
    Games.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(games => {
        res.status = 200;
        res.json(games);
    });
   
});

app.get('/game/:id', (req, res) => {
    
    if(isNaN(req.params.id)){
       res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);
        
        Games.findAll({
            where: {id: id},
            order: [['id', 'DESC']]
        }).then(game => {
            res.statusCode = 200;
            res.json(game);
        }).catch(err => {
            res.sendStatus(404);
        });
    }
});

app.post('/game', (req, res) => {
    var {title,price,year} = req.body;

    Games.create({
        title,
        price,
        year
    }).then(() =>{
        res.sendStatus(200);
    });

});

app.delete('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
     }else{
 
         var id = parseInt(req.params.id);
         Games.destroy({
            where: {id: id}
        }).then(() => {
            res.sendStatus(200);
        });
     }
});

app.put('/game/:id', (req, res) => {
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
     }else{
         var id = parseInt(req.params.id);
         var {title,price,year} = req.body;
        
         Games.findOne({
            where:{
                id
            }
        }).then((g) => {
            Games.update({
                title, 
                price, 
                year
            }, {
                where: {
                    id: id
                }
            })
            res.sendStatus(200);
        }).catch(err => res.sendStatus(404));
    }       
     
});

app.listen(8080, () => {
    console.log("Api Rodando");
});