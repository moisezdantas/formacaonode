class Filme {

    constructor(titulo, ano, genero, diretor, duracao){
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.diretor = diretor;
        this.duracao = duracao;
        this.autores = [];
    }

    Reproduzir(){
        console.log("Reproduzindo.....");
    }

    Pausar(){
        console.log("Pausando ||");
    }

    Avancar(){
        console.log("Avançar >>");
    }

    Fechar(){
        console.log("Fechar X");
    }

    Ficha(){
        console.log(
            `
            Título: ${this.titulo}
            ------------------------
             Ano: ${this.ano}
            ------------------------
            Gênero: ${this.genero}
            ------------------------
            `
        )
        this.Reproduzir();
        this.Avancar();
    }
}

var vingadores = new Filme("Vingadores", 2014,"Ação","Alguem","2h");
vingadores.Ficha();