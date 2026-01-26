import { focusInput } from './funcoesModal.js';

const botaoAlterar = document.getElementById('btn_corrigir_informacoes_cliente');
botaoAlterar.addEventListener('click', function() {
    
    //const codigoCaixa = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');

    const textoSiglaCliente = tabela.rows[2].cells[1].innerText;
    const textoNomeCliente = tabela.rows[2].cells[2].innerText;

    const textoArmazenar = tabela.rows[2].cells[9].innerText;
    const armazenar = document.getElementById('alterar_cliente_armazenar');
    armazenar.value = textoArmazenar;

    const textoPrazoArmazenamento = tabela.rows[2].cells[10].innerText;
    const prazoArmazenamento = document.getElementById('alterar_cliente_prazo_armazenamento');
    prazoArmazenamento.value = textoPrazoArmazenamento;

    const textoFragmentar = tabela.rows[2].cells[11].innerText;
    const fragmentar = document.getElementById('alterar_cliente_fragmentar');
    fragmentar.value = textoFragmentar;



    const tituloModal = document.getElementById('titulo_modal_alterar_cliente');
    tituloModal.innerText = '';
    tituloModal.innerText = `Corrigir informações do Cliente:\n ${textoNomeCliente} - ${textoSiglaCliente}`;
    //focusInput('alterar_quebra_sequencia');
    
    // 4. Lógica para abrir seu modal (exemplo)
    //document.getElementById('meuModal').classList.add('active');



});