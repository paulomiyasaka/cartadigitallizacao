import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput, hiddenModal } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

//cria o botões
//menuBotaoManager.renderizarBotoes('completo');
const inputCaixa = document.getElementById('codigo_caixa');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const btnAlterarCaixa = document.getElementById("btn_corrigir_informacoes_caixa");
const btnAlterarCliente = document.getElementById("btn_corrigir_informacoes_cliente");
const btnAlterarQuebraSequencia = document.getElementById("btn_alterar_quebra_sequencia");
const quantidadeMaximaDigitos = 5;//caixa com 5 dígitos

inputCaixa.addEventListener('input', async function() {

    const codigo = this.value;
    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    const aguarde = document.getElementById('aguarde');
    const btnRetencao = document.getElementById('btn_reter_caixa');
    const btnConfirmar = document.getElementById('btn_confirmar_caixa');

    const url = 'src/controller/buscarCaixa.php';

    btns_conferencia.classList.add('invisible');
    formData.append('codigo_caixa', codigo);
        
    if (codigo.length === quantidadeMaximaDigitos){
        const session = await getSession();
        aguarde.classList.remove('invisible');
        aguarde.classList.add('visible');

        try{
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if(data.resultado){
                btnRetencao.classList.remove('disabled');                    
                btnConfirmar.classList.remove('disabled');

                if(data.caixa['retida'] === 'SIM' || data.caixa['armazenar'] === 'NAO' || data.caixa['fragmentar'] === 'SIM'){
                    //btnAlterarQuebraSequencia.classList.add('invisible');
                    //menuBotaoManager.limparTudo();
                    //const session = await getSession();
                    if(session){
                        if (['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])) {
                            btns_conferencia.classList.replace('invisible', 'visible');
                            viewCaixa.exibirDados(data.caixa, "bg-danger");
                            btnRetencao.classList.add('disabled');
                            btnConfirmar.classList.add('disabled');
                            menuBotaoManager.remover('alterarQuebra');
                            
                        } else {
                            const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                            tabelaCorrecao.exibirDados(data.caixa, "bg-danger");
                            menuBotaoManager.remover('corrigirCaixa');
                            menuBotaoManager.remover('corrigirCliente');
                            //menuBotaoManager.renderizarBotoes('usuario');                           
                        }                        

                    }//if session

                }else if(data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO'){
                    btns_conferencia.classList.remove('invisible');
                    viewCaixa.exibirDados(data.caixa, 'bs-tertiary-bg');
                    if (['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])) {
                        menuBotaoManager.remover('alterarQuebra');
                    }else{
                        menuBotaoManager.remover('corrigirCaixa');
                        menuBotaoManager.remover('corrigirCliente');
                    }
                }//if data.caixa retida

            }else{
                viewCaixa.ocultarTabela();                   
                formReset();    
                const notificacao = new RenderizarToast();                                    
                notificacao.exibir(`Caixa número ${codigo} não foi encontrada!`, "danger");
                focusInput('codigo_caixa');
            }//if data.resultado

        } catch (error) {
            console.error('Erro na requisição:', error);
            viewCaixa.ocultarTabela();
        } finally {
            aguarde.classList.remove('visible');
            aguarde.classList.add('invisible');
        }//try, catch, finally
        
    }else if(codigo.length !== quantidadeMaximaDigitos){
        //formReset();
        focusInput('codigo_caixa');
        viewCaixa.ocultarTabela();

    }//if quantidadeMaximaDigitos

});
      

