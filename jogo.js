

var altura = 0 // precisamos colocar as vaariáveis no escopo global, para que assim consigamos ver o tamanho real da tela que o usuário esta usando
var largura = 0
var vidas = 1
var tempo = 20

var criaMosquitoTempo = 1500

var nivel = window.location.search // retorna somente o valor que está a direita do ponto interrogação (parametro)
nivel = nivel.replace('?', '') // isso é quando queremos substituir um caracater (quando localizado), por outro (pós a virgula)

if (nivel === 'normal') {
	//1500
	criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
	//1000
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	//750
	criaMosquitoTempo = 750
}



function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight // para sabermos as dimensões que o usuário está utilizando para que não aparça o mosquito onde ele não ira enxergar
	largura = window.innerWidth 
	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo() // para que essa função seja executada, e mostrada, devemos colocar ela no onresize do body, nos codigos HTML

var cronometro = setInterval(function() {


	tempo -= 1 
	if (tempo < 0) {
		clearInterval(cronometro) // com esse comando eliminamos essa função da memoria da aplicação
		clearInterval(criaMosquito) // no momento certo estamos eliminando a criação de mosquitos, aplicando o clearInterval a partir da função setInterval no HTML
		window.location.href = 'vitoria.html'
	} else {

	document.getElementById('cronometro').innerHTML = tempo// todo valor que vai entre as tags é inner (esta dentro)
	}
	

	} ,1000)

function posicaoRandomica() { // devemos criar uma função, pois o document.body.appendChield, só pode ser lido após a criação do body, e neste caso, o script ta sendo chamado antes da leitura do body, por isso, devemos fazer uma função e chama-la dentro do body

	// remnover o mosquito anterior caso exista
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()


		if(vidas > 3) { //aqui definimos a remoção das vidas se o elemento for removido pela programação, se executar o comando a cima, perderemos uma vida, caso não segue o jogo
			window.location.href = 'fim_de_jogo.html'
		} else {	
		document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

		vidas++
		}
	}
	


	var posicaoX = Math.floor(Math.random() * largura) - 90 //o math.random gera valores aleatórios (de 0 até muito proximo de 1) neste caso, posições aleatórias do mosquito. o math.floor elimina as casas decimais.
	var posicaoY = Math.floor(Math.random() * altura) - 90 // neste caso estamos multiplicando porque os valores gerados aleatóriamente são sempres <= 1 e queremos que o mosquito fique sempre dentro da tela do usuário

	posicaoX = posicaoX < 0 ? 0 : posicaoX // isso é para garantir que a imágem não fique fora da tela pois, ali em cima subtraímos 90 para que a imagem não passe do limite, mas se acaso o valor for igual a 0 ele subtrairá 90 e a imagem sumirá, então fizemos isso para garantir que esse problema n ocorra
	posicaoY = posicaoY < 0 ? 0 : posicaoY // isso é um operador ternário, verifica se posicaoX é menor que 0, se for recebe 0 senão recebe ela mesmo.


	// CRIAR O ELEMENTO HTML

	var mosquito = document.createElement('img') //estamos usando o DOM (arvore de elementos) para criar os conteudos HTML
	mosquito.src = 'imagens/mosca.png' // estamos colocando a imagem da mesma forma que é colocada no HTML, porém de forma programática, utilizando todos os recursos necessários para adicionar uma imagem (exemplo o src). e em seguida estamos adicionando esse elemento ao body da página, como no exemplo abaixo
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //para que fique no estilo que programamos, precisamos chamar com o atributo className.
	//colocamos o tamanhoAleatorio() e ladoAleatorio() a cima, pois na função é definido o estilo que queremos.
	// aquele espaço no meio serve para que o codigo não leia por exemplo 'mosquito1ladoA', pois isso não significa nada, entao temos que dar esse espaço para que seja separado as funções, para que sejam lidas no mesmo tempo mas separadamente.
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() { // nesta função fazemos com que o usuário consiga remover o mosquito ao clicar, impedindo assim que ocorra a remoção programática, assim mantendo uma vida
		this.remove()	// o operador 'this' ele faz referencia ao proprio elemento html q faz a função, nesse caso o mosquito
	}


	document.body.appendChild(mosquito) // criamos um "filho" para o body, onde temos que colocar o mosquito aqui dentro, por isso é atribuido a uma ´variável no código a cima

}

function tamanhoAleatorio() { // nesta função fazemos com que seja retornado algum valor entre 1 a 3 aleatóriamente, e depois recuperamos esse valor de acordo com o estilo css prédefinido, para que assim o mosquito apareça em 3 tamanhos diferentes
	var classe = Math.floor(Math.random() * 3) 

	switch(classe) {//poderia ser um if
	case 0: 
		return 'mosquito1'

	case 1:
		return 'mosquito2'
	
	case 2:	
		return 'mosquito3'
	}	
}


function ladoAleatorio() { // função que faz com que o mosquito apareça olhando para a esquerda ou direita
	var classe = Math.floor(Math.random() * 2) 

	switch(classe) {//poderia ser um if
	case 0: 
		return 'ladoA'

	case 1:
		return 'ladoB'
	}

}