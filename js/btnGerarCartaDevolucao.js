import { focusInput } from './funcoesModal.js';

const botaoGerarCarta = document.getElementById('btn_gerar_carta_devolucao');
botaoGerarCarta.addEventListener('click', function() {
    
    const codigoCaixa = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');    

    const conteudoModal = document.getElementById('msg_carta_devolucao');
    const idAcao = document.getElementById('id_acao_gerar_carta_devolucao');
    const btnGerarCarta = document.getElementById('btn_ok_gerar_carta');

    conteudoModal.innerHTML = '';
    conteudoModal.innerHTML = `Confirmar a geração da carta de devolução para a caixa número: <strong>${codigoCaixa}</strong>?`;
    
    idAcao.value = codigoCaixa;    
    btnGerarCarta.innerText = "Ok, Gerar Carta";



});