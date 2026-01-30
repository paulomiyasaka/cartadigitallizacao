import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

const formAlterarCliente = document.getElementById('form_alterar_dados_cliente');

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();
const btnRetencao = document.getElementById('btn_reter_caixa');
const btnConferir = document.getElementById('btn_conferir_caixa');

formAlterarCliente.addEventListener('submit', async function(e) {
    bloquearSubmit(e);

    const aguarde = document.getElementById('aguarde');
    aguarde.classList.remove('invisible');
    aguarde.classList.add('visible');

    const codigo = document.getElementById('codigo_caixa').value;
    const tabela = document.getElementById('tabelaConferencia');
    const siglaCliente = tabela.rows[2].cells[1].innerText;
    const nomeCliente = tabela.rows[2].cells[2].innerText;
    const corrigirArmazenar = document.getElementById('corrigir_cliente_armazenar').value;
    const corrigirPrazoArmazenamento = document.getElementById('corrigir_cliente_prazo_armazenamento').value;
    const corrigirFragmentar = document.getElementById('corrigir_cliente_fragmentar').value;
    
    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    btns_conferencia.classList.add('invisible');
    
    formData.append('codigo_caixa', codigo);
    formData.append('sigla_cliente', siglaCliente);
    formData.append('corrigir_armazenar', corrigirArmazenar);
    formData.append('corrigir_prazo_armazenamento', corrigirPrazoArmazenamento);
    formData.append('corrigir_fragmentar', corrigirFragmentar);

    const url = 'src/controller/alterarInformacoesCliente.php';

    try{   
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const data = await response.json(); 
        
        if(data.resultado){
            btnRetencao.classList.remove('disabled');                    
            btnConferir.classList.remove('disabled');
            if(data.caixa['retida'] === 'SIM' || data.caixa['armazenar'] === 'NAO' || data.caixa['fragmentar'] === 'SIM'){
                const session = await getSession();
                if(session){
                    if (['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])) {
                        btns_conferencia.classList.replace('invisible', 'visible');
                        viewCaixa.exibirDados(data.caixa, "bg-danger");
                        btnRetencao.classList.add('disabled');
                        btnConferir.classList.add('disabled');
                        menuBotaoManager.remover('alterarQuebra');                        
                    } else {
                        const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        tabelaCorrecao.exibirDados(data.caixa, "bg-danger");
                        
                    }                        

                }//if session

            }else if(data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO'){
                btns_conferencia.classList.remove('invisible');
                viewCaixa.exibirDados(data.caixa, 'bs-tertiary-bg');

            }//if data.caixa retida 

            notificacao.exibir(`Dados do Cliente: ${nomeCliente} - Sigla: ${siglaCliente} alterados com sucesso`, "success");  

        }else{                
            btns_conferencia.classList.remove('invisible');
            const notificacao = new RenderizarToast();                                    
            notificacao.exibir(`Não foram alterados os dados do Cliente: ${nomeCliente} - Sigla: ${siglaCliente}.`, "danger");
            focusInput('codigo_caixa');
        }//if data.resultado

    }catch (error) {
        console.error('Erro na requisição:', error);
        viewCaixa.ocultarTabela();
    } finally {
        aguarde.classList.remove('visible');
        aguarde.classList.add('invisible');
    }//try, catch, finally

    
});//addEventListener