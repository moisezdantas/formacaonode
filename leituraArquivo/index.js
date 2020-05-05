const fs = require("fs");

function modificarUsuario(nome, curso, categoria){
    
    fs.readFile("./usuario.json", {encoding: 'utf-8'} , (erro, dados) => {
        if(erro){
            console.log("Um erro aconteceu!");
        }else{
            var conteudo = JSON.parse(dados);
            conteudo.nome = nome;
            conteudo.curso = curso;
            conteudo.categoria = categoria;
            
            fs.writeFile("./usuario.json", JSON.stringify(conteudo), (erro) => {
                if(erro){
                    console.log("Um erro aconteceu durante a escrita!");
                    
                }
            });
        }
    });
}

modificarUsuario("Moisez Dantas", "Node JS", "JS");