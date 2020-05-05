var Reader = require("./Reader");
var Writer = require("./Writer");
var Process = require("./Processor");
var Table = require('./Table');
var HtmlParser = require("./HtmlParser");
var PDFWriter = require("./PDFWriter");

var leitor = new Reader();
var escritor = new Writer();

async function main(){
    var dados = await leitor.Read("./users.csv");
    var dadosProcessados = Process.Process(dados);
    var usuarios = new Table(dadosProcessados);
    var html = await HtmlParser.Parse(usuarios);
    escritor.Write(Date.now() + ".html", html);
    PDFWriter.WriterPDF(Date.now() + ".pdf", html);

    console.log(html);
}

main();