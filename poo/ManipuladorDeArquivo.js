class Leitor {
    Ler(caminho){
        return "Conteúdo do arquivo!";
    }
}

class Escritor {
    Escrever(arquivo, conteudo){
        console.log("ConteÚdo escrito!"); 
    }
}

class Criador{
    Criar(nome){
        console.log("Arquivo criado!");
    }
}

class Destruidor {
    Deletar(nome){
        console.log("Deletando arquivo!");
    }
}

class ManipuladorDeArquivo {
    constructor(nome){
        this.arquivo = nome;
        this.leitor = new Leitor();
        this.escritor = new Escritor();
        this.criador = new Criador();
        this.destruidor = new Destruidor();
    }
}

class GerenciadorDeUsuario{
    constructor(){
        this.criador = new Criador();
        this.escritor = new Escritor();
    }

    SalvarListaDeUsuarios(lista){
        this.criador.Criar("usuario.txt");
        this.escritor.Escrever("usuario.txt", lista);
    }
}

var manipulador = new ManipuladorDeArquivo("meuarquivo.txt");
manipulador.leitor.Ler();
manipulador.escritor.Escrever();
manipulador.criador.Criar();
manipulador.destruidor.Deletar();

