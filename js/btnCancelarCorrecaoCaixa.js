import { focusInput } from './funcoesModal.js';

const botaoSolicitarCorrecao = document.getElementById('btn_cancelar_correcao_caixa');
botaoSolicitarCorrecao.addEventListener('click', function() {
    
    const codigoCaixa = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');    
    const botao = document.querySelector('button[data-solicitar]');
    const valor = botao.getAttribute('data-solicitar');
    const conteudoModal = document.getElementById('conteudo_modal_alerta');
    const idAcao = document.getElementById('id_acao');
    const btnConfirmar = document.getElementById('btn_ok_alerta');
    const btnFechar = document.getElementById('btn_cancelar_alerta');

    conteudoModal.innerText = '';
    conteudoModal.innerText = `Cancelar solicitação de correção da caixa número: <strong>${codigoCaixa}</strong>`;

    
    idAcao.value = codigoCaixa;    
    btnConfirmar.innerText = "OK";   
    btnFechar.innerText = "FECHAR";

});
