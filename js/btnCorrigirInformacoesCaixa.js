import { focusInput } from './funcoesModal.js';

const botaoCorrigir = document.getElementById('btn_corrigir_informacoes_caixa');
botaoCorrigir.addEventListener('click', function() {
    
    const codigoCaixa = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');    

    const textoSiglaCliente = tabela.rows[2].cells[1].innerText;
    const textoNomeCliente = tabela.rows[2].cells[2].innerText;
    const textoCodigoCliente = tabela.rows[2].cells[3].innerText;
    const textoQuantidadeLotes = tabela.rows[2].cells[4].innerText;
    const textoQuantidadeObjetos = tabela.rows[2].cells[5].innerText;
    const textoLoteClienteInicial = tabela.rows[2].cells[6].innerText;
    const textoLoteClienteFinal = tabela.rows[2].cells[7].innerText;
    const textoQuebraSequencia = tabela.rows[2].cells[8].innerText;
   
    const quantidadeLotes = document.getElementById('corrigir_caixa_quantidade_lotes');
    const quantidadeObjetos = document.getElementById('corrigir_caixa_quantidade_objetos');
    const loteClienteInicial = document.getElementById('corrigir_caixa_lote_cliente_inicial');
    const loteClienteFinal = document.getElementById('corrigir_caixa_lote_cliente_final');
    const quebraSequencia = document.getElementById('corrigir_caixa_quebra_sequencia');
    const tituloModal = document.getElementById('titulo_modal');
    
    quantidadeLotes.value = textoQuantidadeLotes;
    quantidadeObjetos.value = textoQuantidadeObjetos;
    loteClienteInicial.value = textoLoteClienteInicial;
    loteClienteFinal.value = textoLoteClienteFinal;
    quebraSequencia.value = textoQuebraSequencia;
    
    tituloModal.innerText = '';
    tituloModal.innerText = `Corrigir informações da caixa: ${codigoCaixa}`;
    //focusInput('corrigir_caixa_quantidade_lotes');
    
    // 4. Lógica para abrir seu modal (exemplo)
    //document.getElementById('meuModal').classList.add('active');



});