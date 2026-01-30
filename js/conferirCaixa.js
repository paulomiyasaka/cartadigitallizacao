import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

const botaoConferir = document.getElementById('btn_ok_conferir');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

botaoConferir.addEventListener('click', async function(e) {
bloquearSubmit(e);

const aguarde = document.getElementById('aguarde');
const codigo = document.getElementById('codigo_caixa').value;
const quebra = document.getElementById('alterar_quebra_sequencia').value;
const formData = new FormData();
const btns_conferencia = document.getElementById('btns_conferencia');
const btnRetencao = document.getElementById('btn_reter_caixa');
const btnConferir = document.getElementById('btn_conferir_caixa');

aguarde.classList.remove('invisible');
aguarde.classList.add('visible');    
btns_conferencia.classList.add('invisible');
console.log(codigo);

// Adiciona o arquivo ao objeto FormData
formData.append('codigo_caixa', codigo);
formData.append('alterar_quebra_sequencia', quebra);
const url = 'src/controller/conferirCaixa.php';

try{

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    console.log(data.resultado);
    if(data.resultado){
        if(data.caixa['conferido'] === 'SIM' || data.caixa['retida'] === 'SIM' || data.caixa['armazenar'] === 'NAO' || data.caixa['fragmentar'] === 'SIM'){
            const session = await getSession();
            if(session){
                if(['ADMINISTRADOR', 'GESTOR'].includes(session['perfil'])){
                    btns_conferencia.classList.remove('invisible');
                    btns_conferencia.classList.add('visible');
                    viewCaixa.exibirDados(data.caixa, "bg-danger");
                    btnRetencao.classList.add('disabled');
                    btnConferir.classList.add('disabled'); 
                    menuBotaoManager.remover('alterarQuebra');                   
                }else{
                    
                    if(data.caixa['conferido'] === 'SIM'){
                        tabelaCorrecao.exibirDados(data.caixa, "bg-success");
                    }else{
                        const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        tabelaCorrecao.exibirDados(data.caixa, "bg-danger");
                    }
                    
                    
                }
            }//if session
        }else if(data.caixa['conferido'] === 'NAO' && data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO'){
            btns_conferencia.classList.remove('invisible');
            viewCaixa.exibirDados(data.caixa);
            
        }//if data.caixa['retida']

        notificacao.exibir(`Conferência registrada para a caixa número: ${codigo} com sucesso!`, "success");

    }else{                                       
        notificacao.exibir(`Não foi possível registrar a conferência da caixa número: ${codigo}.`, "danger");
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