const inputTexto = document.getElementById('enviarMensagem');//Criamos uma variável que recebe o campo de texto aonde será digitada a mensagem a ser enviada
const btnSair  = document.getElementById('btnSair');//Criamos uma variável que recebe o button com o id btnsair
const getLocalStorage = () =>JSON.parse(localStorage.getItem('usuario')) ?? [];//Criamos uma váriavel que vai buscar os usuários e caso não encontre vai mostrar uma lista vazia
//var Msglobal = "";
const socket = io();//Criamos uma váriavel que vai armazenar o metódo io()
const { usuarionome, meuid } = Qs.parse(location.search, { ignoreQueryPrefix: true });//Vamos pegar o usuarionome e meuid através de pârametros
//var lg = getLocalStorage.lingua;
//const idioma =require('./index.js');

socket.emit('entrarSala', { usuarionome, meuid});//Emitimos o nome do usuário que entrou na sala
const menTransl = '';
/*function loadTranslation(menTransl){
    const lg = {
        "pt-BR" : "Português",
        "en-GB": "Inglês",
    };
    fetch(
        //`https://api.mymemory.translated.net/get?q=${inputTexto.value}&langpair="pt-BR": "Português"|"en-GB": "Inglês"`
        `https://api.mymemory.translated.net/get?q=${mensagem.mensagem}&langpair=${lg[0].value}|${lg[1].value}`
    )
    .then((res) => res.json())
    .then((data) =>{
  mensagem.mensagem = data.responseData.translatedText;
    })
  //  console.log("Resultado: ", loadTranslation());
}*/

//console.log("Resultado: ", loadTranslation());

function loadTranslation(texto){
    const pt = "pt-BR";
    const en = "en-GB";
    var vl;
    var link = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${pt}|${en}`
    $.get(link,function(rs){
        console.log(rs.responseData.translatedText);
        return rs.responseData.translatedText;
    })
    //console.log("vl: ",vl); 
    /*
    fetch(
        `https://api.mymemory.translated.net/get?q=${texto}&langpair=${pt}|${en}`
      //  `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
    .then((res) => res.json())
    .then((data) =>{
       // console.log(data);
       console.log(data.responseData.translatedText);
      // Msglobal = data.responseData.translatedText;
        vl = data.responseData.translatedText;
    })
    console.log("Vl: ",vl);
    return vl;*/
}

inputTexto.addEventListener('keyup', function(e){//criamos um evento que vai ser executado quando eu pressionar qualquer tecla
    var key = e.key === 'Enter';//Criamos uma variavel que vai executar o evento quando pressionar a tecla Enter   
    //var idioma =require('./index.js');
    var idioma = document.getElementById('lg').value;
    if(idioma == "pt-BR"){
    if(key && this.value) {//Criamos uma condição que vai verificar se pressionei a tecla enter e se há algum texto escrito no campo de texto
      console.log("Resultado: ", this.value);
      console.log("Meu Nome: ",usuarionome);
      var texto = this.value;
      
     // var msg = loadTranslation(texto);
     // console.log("MsG: ",msg);
     
     const pt = "pt-BR";
     const en = "en-GB";
     var link = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${pt}|${en}`
     $.get(link,function(rs){
         console.log(rs.responseData.translatedText);
         socket.emit('mensagemChat',rs.responseData.translatedText);//Emitimos a mensagem que foi enviada para todos da sala
        // this.value = '';//Depois de digitar a mensagem o campo de texto ficará limpo
       // $("#enviarMensagem").val("");
       //  return rs.responseData.translatedText;
     })

      //  socket.emit('mensagemChat',texto);//Emitimos a mensagem que foi enviada para todos da sala
      /// this.value = '';//Depois de digitar a mensagem o campo de texto ficará limpo
    }
}else if(idioma == "en-GB"){
    if(key && this.value) {//Criamos uma condição que vai verificar se pressionei a tecla enter e se há algum texto escrito no campo de texto
        console.log("Resultado: ", this.value);
        console.log("Meu Nome: ",usuarionome);
        var texto = this.value;
        
       // var msg = loadTranslation(texto);
       // console.log("MsG: ",msg);
       
       const pt = "pt-BR";
       const en = "en-GB"
       var link = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${en}|${pt}`
       $.get(link,function(rs){
           console.log(rs.responseData.translatedText);
           socket.emit('mensagemChat',rs.responseData.translatedText);//Emitimos a mensagem que foi enviada para todos da sala
          // this.value = '';//Depois de digitar a mensagem o campo de texto ficará limpo
         // $("#enviarMensagem").val("");
         //  return rs.responseData.translatedText;
       })
  
        //  socket.emit('mensagemChat',texto);//Emitimos a mensagem que foi enviada para todos da sala
        /// this.value = '';//Depois de digitar a mensagem o campo de texto ficará limpo
      }
}
});

btnSair.addEventListener('click', function() {//Criamos um evento para o btnSair
    
    const sairSala = confirm('Certeza que deseja sair da sala?');//Criamos uma mensagem de confirmação para o usuário confirmar se realmente deseja sair da sala
    
    if (sairSala) {//Se o usuário confirmar que quer sair da sala então
        socket.emit('sairSala');//emitimos o metódo para retirar o usuário da sala
        window.location.href='index.html';//Voltamos para o arquivo de login
    }
    
});

function adicionarNovaMensagem(mensagem) {//Função criada para adicionar uma mensagem na área de mensagem com o parâmetro 'mensagem' que aqui está a identificar o inputTexto
    const usuarioStorage = getLocalStorage();//Criamos uma variável para buscar o local onde estão armazenados os usuários
    let minhaMensagem = false;//Criamos uma variável que lhe foi atribuída um resultado false
   console.log(mensagem);
   // console.log("----------");
   // console.log("Msg: ",Msglobal);
    if(mensagem.meuid) {//Criamos uma condição para verificar se há um id na mensagem
        minhaMensagem = mensagem.meuid === usuarioStorage.meuId;//a váriavel minhaMemsagem vai guardar o id igual ao id da condição buscado no local de armazenamento de id dos usuários
    }

    var divMensagem = '';//Criamos uma váriavel para separar as mensagens
    var divDetalhes = '';//Criamos uma váriavel para separar os detalhes da mensagm
   
    var quadroMensagens = document.getElementById('quadro-mensagens');//variável que vai guardar o quadro de mensagens
   // var li = criarElementoHtml('li', ['clearfix']);//vamos criar um elemento para a mensagem numa lista(clearfix)
    var li = criarElementoHtml('li', ['clearfix']);//vamos criar um elemento para a mensagem numa lista(clearfix)
    var span = criarElementoHtml('span', ['message-data-time']);//vamos criar um elemento para guardar a data de da envio damensagem

    if(minhaMensagem) {//Criamos uma condição para verificar se a mensagem foi enviada por mim e coloca-lá do lado direito da área de mensagem
        divMensagem = criarElementoHtml('div', ['message', 'other-message', 'float-right' ]);//Div criada para separar as mensagens e colocar a direita
        divDetalhes = criarElementoHtml('div', ['message-data', 'text-right']);//Div para separar as datas de envio de mensagem e colocar a direita
    } else {//Criamos um else para verificar se a mensagem não foi enviada por nós então mantém-na do lado esquerdo
        divMensagem = criarElementoHtml('div', ['message', 'my-message']);//Div criada para separar as mensagens
        divDetalhes = criarElementoHtml('div', ['message-data']);//Div para separar as datas de envio de mensagem
    }
   // minhaMensagem
    span.innerHTML = (minhaMensagem ? "eu" : mensagem.usuarioNome) + ', ' + mensagem.horario;//adicionando a mensagem e a data na área de mensagem e identificando por 'eu' caso eu tenha enviado a mensagem ou 'usuarioNome' caso outra pessoa tenha enviado a mensagem
    //divMensagem.innerHTML = mensagem.mensagem;//Adicionando a mensagem na área de mensagem

    if(minhaMensagem){
        divMensagem.innerHTML = $("#enviarMensagem").val();
        $("#enviarMensagem").val(""); 
    }else{
        divMensagem.innerHTML = mensagem.mensagem;
    }

    divDetalhes.appendChild(span);//adicionando o elemento data de envio para o elemento onde será apresentada a mensagem
    li.appendChild(divDetalhes);//adicionando a data de envio
    li.appendChild(divMensagem);//adicionando a mensagem
    quadroMensagens.appendChild(li);//adicionando os elementos todos no elemento da área de mensagem
    realizarScrollChat();//função reponsável por realizar o scroll automático na área de mensagens enviadas

   /* console.log("1: ",minhaMensagem);
    console.log("2: ",quadroMensagens);
    console.log("3: ",inputTexto);
    console.log("4: ",divMensagem.innerHTML);
    console.log("5: ",mensagem.mensagem);*/
}

function criarElementoHtml(nomeElemento, classeElemento, atributosElemento) {//Essa função vai criar um elemento para a mensagem a ser enviada
    var elemento = document.createElement(nomeElemento);//variavel que recebe o parãmetro nomeElemento
    for (var classe of classeElemento) {//Criamos uma estrutura que vai guardar todos os elementos de uma classe
        elemento.classList.add(classe);//A variável elemento vai armazenar a classeElemento em forma de lista
    }

    return elemento;//vamos retornar o valor armazenado pela variável elemento
}

function realizarScrollChat() {//Função que vai fazer o scroll(rolamento) da área de mensagem automaticamente
    var elem = document.getElementById('chat');//variável criada para guardar as alterações da área de mensagens enviadas
    elem.scrollTop = elem.scrollHeight;//comando que vai realizar o scroll automático na área de mensagens enviadas
}

/*Socket.io*/
socket.on('salaUsuarios', ({sala, usuarios}) => {//Criamos um metódo para adicionar um usuário na sala
    document.getElementById("salaId").innerHTML = sala;//Atribuímos o nome da sala no elemento por id 'salaId'
 /*0*/   document.getElementById("listaUsuarios").innerHTML = '';//Atribuímos a listaUsuarios no elemento por id 'listaUsuarios' como vazio para sempre limpar a lista de usuário e adicionar os novos para não duplicar os nomes
    for (var usuario of usuarios) {// Criamos uma estrutura de repetição para guardar todos os usuários da sala
        criarListaUsuarios(usuario.nome);// Criamos a lista de usuários e passamos como pârametro todos os usuários da sala
    }
});

socket.on('novaMensagem', (mensagem) => {//Criamos um metódo para adicionar uma nova mensagem
   // console.log("Socket.on : ",Msglobal)
    adicionarNovaMensagem(mensagem);//Adicionamos a nova mensagem
});

function criarListaUsuarios(usuarioNome) {//Criamos uma função para criar a lista de usuários na sala
    
    var listaUsuarios = document.getElementById("listaUsuarios");//Criamos uma váriavel que vai guardar a lista de usuários
    var liUsuario = criarElementoHtml("li", ["clearfix"]);//Criamos uma váriavel que vai guardar o elemento usuário criado
    var divDescricaoUsuario = criarElementoHtml('div', ["about"]);//Criamos uma váriavel que vai guardar o elemento de descrição do usuário criado
    var divNomeUsuario = criarElementoHtml('div', ["name"]);//Criamos uma váriavel que vai guardar o elemento nome do usuário criado
    var divStatusUsuario = criarElementoHtml('div', ["status"]);//Criamos uma váriavel que vai guardar o elemento status do usuário criado
    var iconeStatus = criarElementoHtml("i" , ["fa", "fa-circle", "online"]);//Criamos uma váriavel que vai guardar o elemento ícone status do usuário criado

    iconeStatus.innerHTML = "online";//atribuímos um texto na váriavel íconeSatus escrito 'Online'
    divNomeUsuario.innerHTML = usuarioNome;//atribuímos um texto na váriavel divNomeUsuario que vai receber o nome de usuário que entrou na sala

    divStatusUsuario.appendChild(iconeStatus);//Adicionamos o elemento divStatusUsuário na lista de usuários com o pârametro iconeStatus
    divDescricaoUsuario.appendChild(divNomeUsuario);//Adicionamos o elemento divDescricaoUsuario na lista de usuários com o pârametro divNomeUsuario
    divDescricaoUsuario.appendChild(divStatusUsuario);//Adicionamos o elemento divDescricaoUsuario na lista de usuários com o pârametro divStatusUsuario
    liUsuario.appendChild(divDescricaoUsuario);//Adicionamos o elemento liUsuario na lista de usuários com o pârametro divDescricaoUsuario
    listaUsuarios.appendChild(liUsuario);//Adicionamos o elemento listaUsuarios na lista de usuários com o pârametro liUsuario
}