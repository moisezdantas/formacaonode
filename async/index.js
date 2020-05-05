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

function pegarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                [
                    {name: "Moisez", lang:"JS"},
                    {name: "Lima", lang:"JS"},
                    {name: "Daniel", lang:"JS"},
                ]
            )
        }, 3000);
    })
}

async function principal() {
    const id = await pegarId();
    const email = await buscarEmailNoBanco(id);
    try {
        await enviarEmail("Olá", email);
        console.log("Email enviado com sucesso")
    } catch (erro) {
        console.log(erro);        
    }
}

principal();


// pegarId().then((id) => {
//     buscarEmailNoBanco(id).then((email) => {
//         enviarEmail("OLá, como vai?", email).then(() => {
//             console.log("Email enviado, para usuário com id: " + id);
//         }).catch(err => {
//             console.log(err);
//         })
//     })
// })