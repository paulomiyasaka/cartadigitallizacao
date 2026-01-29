import { bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarCaixa } from './RenderizarCaixa.js';
import { RenderizarToast } from './RenderizarToast.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

const botaoSolicitar = document.getElementById('btn_ok_alerta');
botaoSolicitar.addEventListener('click', async function(e) {
bloquearSubmit(e);

const codigo = document.getElementById('codigo_caixa').value;
const formData = new FormData();
formData.append('codigo_caixa', codigo);

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();
const btnRetencao = document.getElementById('btn_reter_caixa');
const btnConfirmar = document.getElementById('btn_confirmar_caixa');
const url = 'src/controller/solicitarRetencaoCaixa.php';
const session = await getSession();

try{
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if(data.resultado){
        //menuBotaoManager.remover('alterarQuebra');
        if(data.caixa['retida'] === 'SIM' || data.caixa['armazenar'] === 'NAO' || data.caixa['fragmentar'] === 'SIM'){
            //const session = await getSession();
            btnRetencao.classList.add('disabled');
            btnConfirmar.classList.add('disabled');
            if(session){
                if (['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])) {
                    //btns_conferencia.classList.replace('invisible', 'visible');
                    btns_conferencia.classList.remove('invisible');
                    btns_conferencia.classList.add('visible');
                    viewCaixa.exibirDados(data.caixa, "bg-danger");                    
                    menuBotaoManager.remover('alterarQuebra');                            
                }else{
                    //btns_conferencia.classList.replace('visible', 'invisible');
                    btns_conferencia.classList.remove('visible');
                    btns_conferencia.classList.add('invisible');

                    const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                    //btnRetencao.classList.remove('disabled');                    
                    //btnConfirmar.classList.remove('disabled');
                    tabelaCorrecao.exibirDados(data.caixa, "bg-danger");                       
                }

            }//if session

        }else if(data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO'){
            btns_conferencia.removeAttribute('class','invisible');
            viewCaixa.exibirDados(data.caixa);
            if (['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])) {
                menuBotaoManager.remover('alterarQuebra');
            }else{
                menuBotaoManager.remover('corrigirCaixa');
                menuBotaoManager.remover('corrigirCliente');
            }
        }//if data.retida
        
        notificacao.exibir(`Solicitação de retenção para a caixa: ${codigo} feita com sucesso!`, "success");

    }else{
        notificacao.exibir(`Erro ao solicitar a retenção da caixa número: ${codigo}.`, "danger");
        focusInput('codigo_caixa');
        btns_conferencia.classList.remove('invisible');
    }//if. data.resultado

}catch (error) {
    console.error('Erro na requisição:', error);
    viewCaixa.ocultarTabela();
} finally {
    aguarde.classList.remove('visible');
    aguarde.classList.add('invisible');
}//try, catch, finally


});