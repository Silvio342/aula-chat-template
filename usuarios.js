

const usuarios = [];//variável para guardar os usuários
const moment = require('moment');// variável para usar a dependência 'moment', responsável por armazenar as datas de evnvio de mensagens
moment.locale('pt-br');//pegar as datas no formato português

function usuarioEntrarSala(id, nome, sala, meuid) {//função para adicionar um usuário no chat
    const usuario = {id, nome, sala, meuid};//variável que guarda os dados do usuário
    usuarios.push(usuario);//vamos adicionar o usuário na lista criada
    return usuario;//vamos retornar o usuário adicionado
}

function usuarioSairSala(id) {//função para verificar o usuário que saiu da sala a partir do id
    const index = usuarios.findIndex(usuario => usuario.id === id);//variável que me permite descobrir o indíce do meu usuário na lista

    if (index !== -1){//vamos criar uma estrutura de condição que vai verificar se o usuário foi encontrado
        return usuarios.splice(index, 1)[0];//vai retirar o aluno da sala
    }
}

function mensagemFormatada(usuarioNome, mensagemParam, meuid) {//Função para formatar a mensagem a ser enviada e deixar pronta para nós
    console.log("mensagemParam");
    var mensagem = mensagemParam ? mensagemParam : "Oi, tudo bem? Acabei de entrar =)";//variável que vai guardar a mensagem se a lista mensagemParam tiver alguma mensagem caso não vai enviar uma mensagem padrão

    return {
        usuarioNome,
        mensagem,
        horario: moment().format('lll'),
        meuid
    };//vai retornar o usuário, mensagem, data de envio e o seu id
}

function getUsuariosSala() {//funcão para pegar todos os usuários da sala
    return usuarios;//retorna os usuários
}

function getUsuario(idUsuario) {//função para pegar o usuário pelo id
    return usuarios.find(usuario => usuario.id === idUsuario);//vai retornar todos os usuários encontrados na lista
}


module.exports = {// Esse módulo vai permitir utilizar as funções fora deste arquivo
    usuarioEntrarSala,
    getUsuariosSala,
    mensagemFormatada,
    getUsuario,
    usuarioSairSala
};