function pegarId(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 1000);
    })
}

function buscarEmailNoBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("moises1695@gmail.com");
        }, 3000);
    })
}

function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            var deuErro = false;

            if(!deuErro){
                resolve({time:6, to: "moises1695@gmail.com"}); //Promessa Ok
            }else{
                reject("Fila cheia"); // Foi mal, eu falhei :(
            }
        }, 4000)
    });
}

pegarId().then((id) => {
    buscarEmailNoBanco(id).then((email) => {
        enviarEmail("OLá, como vai?", email).then(() => {
            console.log("Email enviado, para usuário com id: " + id);
        }).catch(err => {
            console.log(err);
        })
    })
})