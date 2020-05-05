var pdf = require("html-pdf");
var ejs = require("ejs");

var nomedoUsuario = "Moisez Dantas";
var curso = "Formação Node.js";
var categoria = "JavaScript";

ejs.renderFile("./meuarquivo.ejs", {
    nome: nomedoUsuario,
    curso,
    categoria
},(err, html) => {
    if(err){
        console.log("erro");
    }else{
        pdf.create(html, {}).toFile("./meupdf.pdf", (err,res) => {
            if(err){
                console.log("Erro");
            }else{
                console.log(res);
            }
        })
    }
});

