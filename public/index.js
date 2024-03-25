const setLocalStorage = (usuario) => localStorage.setItem("usuario", JSON.stringify(usuario));//Colocamos os dados do usuário num armazenamento local
//const idioma = document.getElementById('lg').value;
//module.exports = idioma;

function btnEntrar() {
    var inputNome = document.getElementById('nome').value;//Pegamos o nome do usuário pelo id
    var idUsuario = (Math.random() * 1000).toString();//Criamos um id aleatório para cada usuário
   // var idiom = document.getElementById('lg').value;
    setLocalStorage({
        nome: inputNome,//Salvamos o nome do usuário num armazenamento local
        meuId: idUsuario//Salvamos o id do usuário num armazenamento local
    });
    window.location.href="chat.html?usuarionome="+ inputNome + "&meuid="+ idUsuario; // Vamos direcionar para a página do chat passando os parâmetros na url
}
