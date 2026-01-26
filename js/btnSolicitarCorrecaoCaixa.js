import { bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarCaixa } from './RenderizarCaixa.js';
import { RenderizarToast } from './RenderizarToast.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';

const botaoSolicitar = document.getElementById('btn_ok_alerta');
botaoSolicitar.addEventListener('click', async function(e) {
bloquearSubmit(e);

const codigo = document.getElementById('codigo_caixa').value;
const formData = new FormData();
formData.append('codigo_caixa', codigo);

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

await fetch('src/controller/solicitaCorrecaoCaixa.php', {
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
    	
    	//const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
        //tabelaCorrecao.exibirDados(objetoData.caixa);
        //notificacao.exibir(`Solicitação de correção para a caixa: ${codigo} feita com sucesso!`, "success");
        
        
        if(objetoData.caixa['solicitarCorrecao'] === 'SIM' || objetoData.caixa['armazenar'] === 'NAO' || objetoData.caixa['fragmentar'] === 'SIM'){
            const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
            tabelaCorrecao.exibirDados(objetoData.caixa);
            btns_conferencia.setAttribute('class','invisible');   
            notificacao.exibir(`Solicitação de correção para a caixa: ${codigo} feita com sucesso!`, "success");

        }else if(objetoData.caixa['solicitarCorrecao'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
            btns_conferencia.removeAttribute('class','invisible');
            viewCaixa.exibirDados(objetoData.caixa);            
            notificacao.exibir(`Erro ao solicitar a correção para a caixa número: ${codigo}.`, "danger");
            }   
        
    } else {
        viewCaixa.ocultarTabela();                   
        formReset();                                        
        notificacao.exibir(`Erro ao tentar solicitar correção para a caixa número: ${codigo}.`, "danger");
        focusInput();
        //modalResposta('modal_falso', 'show', 'msg_erro', 'Caixa não encontrada!');
        //hiddenModal('modal_falso', 'codigo_caixa');
    }
})
.catch(error => {
    //console.error('Erro:', error);
    viewCaixa.ocultarTabela();
    //notificacao.exibir(`Não foi possível conectar ao banco para registrar a alteração da caixa número: ${codigo}.`, "danger");
});



});