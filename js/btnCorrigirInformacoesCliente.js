import { focusInput } from './funcoesModal.js';

const botaoAlterar = document.getElementById('btn_corrigir_informacoes_cliente');
botaoAlterar.addEventListener('click', function() {
    
    const tabela = document.getElementById('tabelaConferencia');

    const textoSiglaCliente = tabela.rows[2].cells[1].innerText;
    const textoNomeCliente = tabela.rows[2].cells[2].innerText;
    const textoArmazenar = tabela.rows[2].cells[9].innerText;
    const textoPrazoArmazenamento = tabela.rows[2].cells[10].innerText;
    const textoFragmentar = tabela.rows[2].cells[11].innerText;

    const armazenar = document.getElementById('corrigir_cliente_armazenar');    
    const prazoArmazenamento = document.getElementById('corrigir_cliente_prazo_armazenamento');    
    const fragmentar = document.getElementById('corrigir_cliente_fragmentar');
    const tituloModal = document.getElementById('titulo_modal_alterar_cliente');

    armazenar.value = textoArmazenar;    
    prazoArmazenamento.value = textoPrazoArmazenamento;    
    fragmentar.value = textoFragmentar;

    
    tituloModal.innerText = '';
    tituloModal.innerText = `Corrigir Cadastro SGD\nCliente: ${textoNomeCliente} - Sigla: ${textoSiglaCliente}`;
    //focusInput('alterar_quebra_sequencia');

});