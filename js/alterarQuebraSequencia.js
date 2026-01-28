import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput, hiddenModal } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';

const formQuebraSequencia = document.getElementById('form_alterar_quebra_sequencia');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

formQuebraSequencia.addEventListener('submit', async function(e) {
    bloquearSubmit(e);

    const aguarde = document.getElementById('aguarde');
    aguarde.classList.remove('invisible');
    aguarde.classList.add('visible');

    const codigo = document.getElementById('codigo_caixa').value;
    const quebra = document.getElementById('alterar_quebra_sequencia').value;
    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    btns_conferencia.classList.add('invisible');
    console.log(codigo);
    // Adiciona o arquivo ao objeto FormData
    formData.append('codigo_caixa', codigo);
    formData.append('alterar_quebra_sequencia', quebra);

        await fetch('src/controller/alterarQuebraSequencia.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
            //throw new Error('Erro na rede ou o arquivo não foi encontrado');
            console.error('Erro no response');
        }
        return response.json();
        }).then(data => {
                
                const objetoData = data;
                //objetoData = (typeof data === 'string') ? JSON.parse(data) : data;
                //console.log(objetoData);
                //console.log(data);

                if (objetoData.resultado) {
                    
                    if(objetoData.caixa['corrigido'] === 'SIM' || objetoData.caixa['armazenar'] === 'NAO' || objetoData.caixa['fragmentar'] === 'SIM'){
                        const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        tabelaCorrecao.exibirDados(objetoData.caixa);                       
                    }else if(objetoData.caixa['corrigido'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
                        btns_conferencia.classList.remove('invisible');
                        viewCaixa.exibirDados(objetoData.caixa);
                        const textarea = document.getElementById('alterar_quebra_sequencia');
                        textarea.value = '';
                        notificacao.exibir(`Quebra de sequência alterada na caixa número: ${codigo} com sucesso!`, "success");

                    }
                    
                    
                } else {
                    //viewCaixa.ocultarTabela();                   
                    ///formReset();                                        
                    notificacao.exibir(`Erro ao tentar alterar a quebra de sequência da caixa número: ${codigo}.`, "danger");
                    focusInput('codigo_caixa');
                    btns_conferencia.classList.remove('invisible');
                    //modalResposta('modal_falso', 'show', 'msg_erro', 'Caixa não encontrada!');
                    //hiddenModal('modal_falso', 'codigo_caixa');
                }
            })
            .catch(error => {
                //console.error('Erro:', error);
                //viewCaixa.ocultarTabela();
                notificacao.exibir(`Não foi possível conectar ao banco para registrar a alteração da caixa número: ${codigo}.`, "danger");
                focusInput('codigo_caixa');
            })
            .finally(() => {                
                aguarde.classList.remove('visible');
                aguarde.classList.add('invisible');
            });
    
});