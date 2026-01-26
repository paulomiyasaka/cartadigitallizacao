import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';

const formQuebraSequencia = document.getElementById('form_corrigir_caixa');

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

formQuebraSequencia.addEventListener('submit', async function(e) {
    bloquearSubmit(e);

    const codigo = document.getElementById('codigo_caixa').value;
    const corrigirCaixaQuantidadeLotes = document.getElementById('corrigir_caixa_quantidade_lotes').value;
    const corrigirCaixaQuantidadeObjetos = document.getElementById('corrigir_caixa_quantidade_objetos').value;
    const corrigirCaixaLoteClienteInicial = document.getElementById('corrigir_caixa_lote_cliente_inicial').value;
    const corrigirCaixaLoteClienteFinal = document.getElementById('corrigir_caixa_lote_cliente_final').value;
    const corrigirCaixaQuebraSequencia = document.getElementById('corrigir_caixa_quebra_sequencia').value;

    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    btns_conferencia.setAttribute('class','invisible');
    console.log(codigo);
    // Adiciona o arquivo ao objeto FormData
    formData.append('codigo_caixa', codigo);
    formData.append('corrigir_caixa_quantidade_lotes', corrigirCaixaQuantidadeLotes);
    formData.append('corrigir_caixa_quantidade_objetos', corrigirCaixaQuantidadeObjetos);
    formData.append('corrigir_caixa_lote_cliente_inicial', corrigirCaixaLoteClienteInicial);
    formData.append('corrigir_caixa_lote_cliente_final', corrigirCaixaLoteClienteFinal);
    formData.append('corrigir_caixa_quebra_sequencia', corrigirCaixaQuebraSequencia);

        await fetch('src/controller/alterarInformacoesCaixa.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
            //throw new Error('Erro na rede ou o arquivo não foi encontrado');
            console.error('Erro no response');
        }
        return response.text();
        }).then(data => {
                
                let objetoData = data;
                objetoData = (typeof data === 'string') ? JSON.parse(data) : data;
                console.log(objetoData);
                //console.log(data);

                if (objetoData.resultado) {
                    
                    if(objetoData.caixa['solicitarCorrecao'] === 'SIM' || objetoData.caixa['armazenar'] === 'NAO' || objetoData.caixa['fragmentar'] === 'SIM'){
                        const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        tabelaCorrecao.exibirDados(objetoData.caixa);                       
                    }else if(objetoData.caixa['solicitarCorrecao'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
                        btns_conferencia.removeAttribute('class','invisible');
                        viewCaixa.exibirDados(objetoData.caixa);
                        //const textarea = document.getElementById('alterar_quebra_sequencia');
                        //textarea.value = '';
                        notificacao.exibir(`Quebra de sequência alterada na caixa número: ${codigo} com sucesso!`, "success");

                    }
                    
                    
                } else {
                    viewCaixa.ocultarTabela();                   
                    formReset();                                        
                    notificacao.exibir(`Erro ao tentar alterar a quebra de sequência da caixa número: ${codigo}.`, "danger");
                    focusInput();
                    //modalResposta('modal_falso', 'show', 'msg_erro', 'Caixa não encontrada!');
                    
                }
            })
            .catch(error => {
                //console.error('Erro:', error);
                viewCaixa.ocultarTabela();
                //notificacao.exibir(`Não foi possível conectar ao banco para registrar a alteração da caixa número: ${codigo}.`, "danger");
            });
    
});