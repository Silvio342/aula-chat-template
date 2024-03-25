const express = require("express");//variável criada para usarmos a dependência express
const path = require("path");//variável para direcionarmos as nossas abas
const http = require("http");//variável utilizada para nos permitir usar o protocolo http(porta 80)
const socketIO = require("socket.io");//variável criada para usarmos a dependência socket.io
const { usuarioEntrarSala, getUsuariosSala, mensagemFormatada, getUsuario, usuarioSairSala } = require('./usuarios');//Importamos os metódos do arquivo usuario.js

const app = express();//criamos um app para a dependência express
const server = http.createServer(app);//criamos um servidor http para adicionar a variável app
const PORT = 4002;//criando uma porta para o nosso site
const io = socketIO(server);//variável que vai permitir usar o nosso chat no servidor http

app.use(express.static(path.join(__dirname, 'public')));//partilhamos o diretório das nossas páginas

const nomeSala = "sala-escolaDevs"//criamos uma váriavel que vai armazenar o nome da sala

/*Socket.IO*/
io.on("connection", socket => {//Criamos uma conexão com o socket
    socket.on('entrarSala', ({usuarionome, meuid}) => {//Criamos um metódo que vai pedir o usuarionome e o meuid para entrar na sala
        const usuario = usuarioEntrarSala(socket.id, usuarionome, nomeSala, meuid);//criamos uma váriavel que vai guardar o metódo usuarioEntrarSala juntamento com os párametros
        socket.join(nomeSala);//Esse metódo vai permitir entrar na sala
        
        socket.broadcast.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome));//Vamos emitir uma nova mensagem a ser enviada
        io.to(usuario.sala).emit("salaUsuarios", {sala: usuario.sala, usuarios: getUsuariosSala()});//vamos indicar para qual sala a mensagem vai ser enviada
    });

    socket.on('mensagemChat', mensagem => {//Metódo que vai permitir receber a mensagem
       // console.log(mensagem);
        const usuario = getUsuario(socket.id);//criamos uma váriavel que vai buscar o nome do usuário que enviou a mensagem
        io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, mensagem, usuario.meuid));//criamos uma váriavel que vai emitir a busca da mensagem a ser enviada
    });

    socket.on('sairSala', () => {//Criamos um metódo para sair da sala
        const usuario = usuarioSairSala(socket.id);//criamos uma váriavel que vai armazenar o id do usuário que vai sair da sala
        if (usuario) {//Criamos uma condição para verifcar se o usuário vai sair da sala
            io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, 'saiu da sala', usuario.id));//Emitimos uma mensagem para informar que o usuário saiu da sala
            io.to(nomeSala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getUsuariosSala() });//Emitimos o nome da sala que o usuário saiu
        }
    });
});


server.listen(PORT, () => console.log("Servidor online na porta " + PORT));//passamos o número da nossa porta para o servidor verificar
