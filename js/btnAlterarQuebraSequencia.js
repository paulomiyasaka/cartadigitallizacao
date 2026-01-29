import { focusInput } from './funcoesModal.js';

const botaoAlterar = document.getElementById('btn_alterar_quebra_sequencia');
botaoAlterar.addEventListener('click', function() {
    
    const codigoCaixa = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');    

    const tituloModal = document.getElementById('titulo_modal_informacao_caixa');
    const textoQuebraSequencia = tabela.rows[2].cells[8].innerText;
    const quebraSequencia = document.getElementById('alterar_quebra_sequencia');

    quebraSequencia.value = textoQuebraSequencia;
    
    tituloModal.innerText = '';
    tituloModal.innerText = `Alterar quebra de sequência da caixa: ${codigoCaixa}`;
    focusInput('alterar_quebra_sequencia');  


});