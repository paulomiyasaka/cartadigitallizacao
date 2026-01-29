import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

const formQuebraSequencia = document.getElementById('form_alterar_quebra_sequencia');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

formQuebraSequencia.addEventListener('submit', async function(e) {
bloquearSubmit(e);

const aguarde = document.getElementById('aguarde');
const codigo = document.getElementById('codigo_caixa').value;
const quebra = document.getElementById('alterar_quebra_sequencia').value;
const formData = new FormData();
const btns_conferencia = document.getElementById('btns_conferencia');
const btnRetencao = document.getElementById('btn_reter_caixa');
const btnConfirmar = document.getElementById('btn_confirmar_caixa');

aguarde.classList.remove('invisible');
aguarde.classList.add('visible');    
btns_conferencia.classList.add('invisible');
console.log(codigo);

// Adiciona o arquivo ao objeto FormData
formData.append('codigo_caixa', codigo);
formData.append('alterar_quebra_sequencia', quebra);
const url = 'src/controller/alterarQuebraSequencia.php';

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
                if(['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])){
                    btns_conferencia.classList.replace('invisible', 'visible');
                    viewCaixa.exibirDados(data.caixa, "bg-danger");
                    btnRetencao.classList.add('disabled');
                    btnConfirmar.classList.add('disabled'); 
                    menuBotaoManager.remover('alterarQuebra');                   
                }else{
                    const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                    tabelaCorrecao.exibirDados(data.caixa, "bg-danger");
                    
                }
            }//if session
        }else if(data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO'){
            btns_conferencia.classList.remove('invisible');
            viewCaixa.exibirDados(data.caixa);
            const textarea = document.getElementById('alterar_quebra_sequencia');
            textarea.value = '';
        }//if data.caixa['retida']

        notificacao.exibir(`Quebra de sequência alterada na caixa número: ${codigo} com sucesso!`, "success");

    }else{                                       
        notificacao.exibir(`Não foi alterada a quebra de sequência da caixa número: ${codigo}.`, "danger");
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