import { focusInput } from './funcoesModal.js';

const botaoConfirmarCaixa = document.getElementById('btn_conferir_caixa');
botaoConfirmarCaixa.addEventListener('click', function() {
    
    const codigoCaixa = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');    

    const conteudoModal = document.getElementById('msg_conferir');
    const idAcao = document.getElementById('id_acao_conferir');
    const btnConfirmar = document.getElementById('btn_ok_conferir');

    conteudoModal.innerHTML = '';
    conteudoModal.innerHTML = `Confirmar a conferência da caixa número: <strong>${codigoCaixa}</strong>?`;
    
    
    idAcao.value = codigoCaixa;    
    btnConfirmar.innerText = "Confirmar";




});