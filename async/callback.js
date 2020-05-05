function enviarEmail(corpo, para, callback) {
    setTimeout(() => {
        // ... logica

        var deuErro = false;

        if(deuErro){
            callback(12, "O Envio do e-mail falhou!");
        }else{
            callback(12);
        }
    }, 2000);
}

console.log("Inicio do envio de e-mail");
enviarEmail("Oi, seja bem vindo ao Guia", "moises1695@gmail.com", (time, erro) => {
   if(erro === undefined){
    console.log("Tudo Ok");
    console.log(`Tempo: ${2}S`);
   }else{
       console.log("Ocorreu um erro: " + erro);
   }
   
});