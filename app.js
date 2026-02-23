let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let numeroSorteado = [];

function ExibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Funcionalidade de leitura responsiva:
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female')
}

function exibirMensagemInicial() {
    ExibirTextoNaTela('h1', 'Jogo do número secreto');
    ExibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
};

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (numeroSecreto == chute) {
        ExibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        ExibirTextoNaTela('p', `Parabéns meu caro compatriota, você descobriu com ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            ExibirTextoNaTela('p', 'Tá chutando muito alto');
        } else {
            ExibirTextoNaTela('p', 'Chuta mais alto');
        }
        // tentativas = tentativas + 1;
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {

    // Sortear um número aleatório entre 1 e 10
    // Se não colocar o return a função é simplesmente executada e não devolve valor nenhum
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 10) {
        listaDeNumerosSorteados = [];
    }

    // o includes retorna true ou false. No caso ele verifica se listaDeNumerosSorteados tem o numero escolhido. Se tiver a gunção é chamada novamente e se não tiver, que é a condição false o array listaDeNumerosSorteados recebe o numeroEscolhido
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}