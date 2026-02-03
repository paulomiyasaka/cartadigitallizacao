import { bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarCaixa } from './RenderizarCaixa.js';
import { RenderizarToast } from './RenderizarToast.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

const botaoGerar = document.getElementById('btn_ok_gerar_carta');
botaoGerar.addEventListener('click', async function(e) {
//bloquearSubmit(e);

const codigo = document.getElementById('codigo_caixa').value;

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();
//const btnRetencao = document.getElementById('btn_reter_caixa');
const btnConferir = document.getElementById('btn_gerar_carta_devolucao');
const formData = new FormData();
formData.append('codigo_caixa', codigo);
const url = 'src/controller/registrarCartaDevolucao.php';

try{
    //const session = await getSession(); 

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);
    if(data.resultado){
        //alert(data.resultado);
        if(data.caixa['conferido'] === 'SIM' && data.caixa['retida'] === 'NAO'){
        //if(data.caixa['conferido'] === 'SIM' && data.caixa['retida'] === 'NAO' && data.caixa['armazenar'] === 'SIM' && data.caixa['fragmentar'] === 'NAO')
            viewCaixa.exibirDados(data.caixa, "bg-success");
            btnConferir.removeAttribute('disabled');
            
            //if(data.caixa['conferido'] === 'NAO' || data.caixa['retida'] === 'SIM' || data.caixa['armazenar'] === 'NAO' || data.caixa['fragmentar'] === 'SIM')
        }else{
            console.log(data.caixa['conferido']);
            //btnsGerarCarta.classList.remove('invisible');
            //viewCaixa.exibirDados(data.caixa, 'bg-danger');]
            tabelaFaltaConferencia.exibirDados(data.caixa, "bg-danger");
            btnConferir.setAttribute('disabled', 'true');
            
        }//if data.caixa retida

        notificacao.exibir(`Carta gerada com sucesso para a caixa número: ${codigo}!`, "success");
        window.open("consultarCarta.php?caixa="+codigo, "_blank");

    }else{
        viewCaixa.ocultarTabela();                   
        formReset();    
        const notificacao = new RenderizarToast();                                    
        //notificacao.exibir(`Caixa número ${codigo} não foi encontrada!`, "danger");
        notificacao.exibir(`Não foi possível gerar a carta para a caixa número ${codigo}.`, "danger");
        focusInput('codigo_caixa');
    }//if data.resultado

}catch (error) {
    console.error('Erro na requisição:', error);
    viewCaixa.ocultarTabela();
} finally {
    aguarde.classList.remove('visible');
    aguarde.classList.add('invisible');
}//try, catch, finally


});