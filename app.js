let listaDeNumerosSorteados = [];  
let numeroLimite = 100;
let numeroAleatorio = gerarNumeroAleatorio();
console.log(numeroAleatorio);
let tentativas = 1;

function exibirNaTela (tag, texto) {
    let variavel = document.querySelector(tag);
    variavel.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
} 

function exibirTextoInicial() {
exibirNaTela('h1', 'Jogo do número secreto');
exibirNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroAleatorio) {
        exibirNaTela('h1', 'Você acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroAleatorio) {
            exibirNaTela('p', 'O número secreto é menor');
        } else {
            exibirNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosEscolhidos = listaDeNumerosSorteados.length;
    
    if (quantidadeDeNumerosEscolhidos == numeroLimite) {
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    limparCampo();
    numeroAleatorio = gerarNumeroAleatorio();
    console.log(numeroAleatorio);
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}