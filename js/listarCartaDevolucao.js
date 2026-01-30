import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarFaltaConferencia } from './InformarFaltaConferencia.js';
import { bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './getSession.js';
import { menuBotaoManager } from './menu.js';

//cria o botões
//menuBotaoManager.renderizarBotoes('completo');
const inputCaixa = document.getElementById('codigo_caixa');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const quantidadeMaximaDigitos = 5;//caixa com 5 dígitos
const tabelaFaltaConferencia = new InformarFaltaConferencia('tabelaConferencia', 'corpoTabelaCaixa');

inputCaixa.addEventListener('input', async function() {

    const codigo = this.value;
    const formData = new FormData();
    const btnsGerarCarta = document.getElementById('btns_gerar_carta');
    const aguarde = document.getElementById('aguarde');
    const btnConferir = document.getElementById('btn_gerar_carta_devolucao');

    const url = 'src/controller/buscarCaixa.php';    
        
    if (codigo.length === quantidadeMaximaDigitos){
        btnsGerarCarta.classList.remove('invisible');
        btnsGerarCarta.classList.add('visible');
        formData.append('codigo_caixa', codigo);
        
        //const session = await getSession();
        aguarde.classList.remove('invisible');
        aguarde.classList.add('visible');

        try{
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if(data.resultado){
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
      

