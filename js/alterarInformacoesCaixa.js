import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

const formQuebraSequencia = document.getElementById('form_corrigir_caixa');

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

formQuebraSequencia.addEventListener('submit', async function(e) {
    bloquearSubmit(e);

    const aguarde = document.getElementById('aguarde');
    aguarde.classList.remove('invisible');
    aguarde.classList.add('visible');

    const codigo = document.getElementById('codigo_caixa').value;
    const corrigirCaixaQuantidadeLotes = document.getElementById('corrigir_caixa_quantidade_lotes').value;
    const corrigirCaixaQuantidadeObjetos = document.getElementById('corrigir_caixa_quantidade_objetos').value;
    const corrigirCaixaLoteClienteInicial = document.getElementById('corrigir_caixa_lote_cliente_inicial').value;
    const corrigirCaixaLoteClienteFinal = document.getElementById('corrigir_caixa_lote_cliente_final').value;
    const corrigirCaixaQuebraSequencia = document.getElementById('corrigir_caixa_quebra_sequencia').value;

    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    const btnRetencao = document.getElementById('btn_reter_caixa');
    const btnConfirmar = document.getElementById('btn_confirmar_caixa');

    btns_conferencia.classList.add('invisible');
    
    formData.append('codigo_caixa', codigo);
    formData.append('corrigir_caixa_quantidade_lotes', corrigirCaixaQuantidadeLotes);
    formData.append('corrigir_caixa_quantidade_objetos', corrigirCaixaQuantidadeObjetos);
    formData.append('corrigir_caixa_lote_cliente_inicial', corrigirCaixaLoteClienteInicial);
    formData.append('corrigir_caixa_lote_cliente_final', corrigirCaixaLoteClienteFinal);
    formData.append('corrigir_caixa_quebra_sequencia', corrigirCaixaQuebraSequencia);

    const url = 'src/controller/alterarInformacoesCaixa.php';
    try{
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if(data.resultado){
                
                if(data.caixa['retida'] === 'SIM' || data.caixa['armazenar'] === 'NAO' || data.caixa['fragmentar'] === 'SIM'){
                    
                    const session = await getSession();
                    if(session){
                        if (['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])) {
                            btns_conferencia.classList.replace('invisible', 'visible');
                            viewCaixa.exibirDados(data.caixa, "bg-danger");
                            btnRetencao.classList.add('disabled');
                            btnConfirmar.classList.add('disabled');        
                            menuBotaoManager.remover('alterarQuebra');                    
                        }else{
                            const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                            btnRetencao.classList.remove('disabled');                    
                            btnConfirmar.classList.remove('disabled');
                            tabelaCorrecao.exibirDados(data.caixa, "bg-danger");                       
                        }

                    }//if session

                }else if(data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO'){
                    btns_conferencia.classList.remove('invisible');
                    viewCaixa.exibirDados(data.caixa, 'bs-tertiary-bg'); 
                    btnRetencao.classList.remove('disabled');
                    btnConfirmar.classList.remove('disabled');                   
                }//if data.caixa retida
                
                notificacao.exibir(`Dados da caixa número: ${codigo} alterados com sucesso!`, "success");

            }else{
                //viewCaixa.ocultarTabela();                   
                //formReset();                
                notificacao.exibir(`Não foram alterados os dados da caixa número: ${codigo}.`, "danger");
                focusInput('codigo_caixa');
                btns_conferencia.classList.remove('invisible');
            }//if data.resultado

    }catch (error) {
        console.error('Erro na requisição:', error);
        viewCaixa.ocultarTabela();
    } finally {
        aguarde.classList.remove('visible');
        aguarde.classList.add('invisible');
    }//try, catch, finally

});