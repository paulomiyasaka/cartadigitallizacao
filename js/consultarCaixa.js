import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput, hiddenModal } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './retornarSessao.js';

const inputCaixa = document.getElementById('codigo_caixa');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');

const quantidadeMaximaDigitos = 5;//caixa com 5 dígitos

inputCaixa.addEventListener('input', async function() {
    //bloquearSubmit(e);

    const codigo = this.value;
    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    //const url = 'src/controller/buscarCaixa.php';

    btns_conferencia.setAttribute('class','invisible');
    //console.log(codigo);
    // Adiciona o arquivo ao objeto FormData
    formData.append('codigo_caixa', codigo);

    
    
    //tabelaConferencia(viewCaixa, codigo, url, formData);
    if (codigo.length === quantidadeMaximaDigitos) {

        const aguarde = document.getElementById('aguarde');
        aguarde.removeAttribute('class', 'invisible');
        aguarde.setAttribute('class', 'visible');

        await fetch('src/controller/buscarCaixa.php', {
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
                //console.log(objetoData);
                //console.log(data);

                if (objetoData.resultado) {
                    
                    if(objetoData.caixa['corrigido'] === 'SIM' || objetoData.caixa['armazenar'] === 'NAO' || objetoData.caixa['fragmentar'] === 'SIM'){
                        //const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        //tabelaCorrecao.exibirDados(objetoData.caixa);                       
                        
                        getSession().then(session => {
                            if (session) {
                                const permissaoBTN = session['perfil'];
                                //console.log("Permissão: "+permissaoBTN);
                                if(permissaoBTN === 'ADMINISTRADOR' || permissaoBTN === 'GESTOR'){
                                    btns_conferencia.removeAttribute('class','invisible');
                                    viewCaixa.exibirDados(objetoData.caixa, 'bg-warning-subtle');
                                    const btn_correcao_caixa = document.getElementById('btn_correcao_caixa');
                                    //btn_correcao_caixa.setAttribute('id', 'btn_cancelar_correcao_caixa');
                                    btn_correcao_caixa.innerText = 'Cancelar Solicitação de Correção';                                    

                                }else{
                                    const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                                    tabelaCorrecao.exibirDados(objetoData.caixa, 'bg-warning-subtle');
                                }
                            }
                        });//getSession


                    }else if(objetoData.caixa['corrigido'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
                        btns_conferencia.removeAttribute('class','invisible');
                        viewCaixa.exibirDados(objetoData.caixa, 'bs-tertiary-bg');

                    }
                    
                    
                } else {
                    viewCaixa.ocultarTabela();                   
                    formReset();    
                    const notificacao = new RenderizarToast();                                    
                    notificacao.exibir(`Caixa número ${codigo} não foi encontrada!`, "danger");
                    focusInput();
                    //modalResposta('modal_falso', 'show', 'msg_erro', 'Caixa não encontrada!');
                    //hiddenModal('modal_falso', 'codigo_caixa');
                }
            })
            .catch(error => {
                //console.error('Erro:', error);
                viewCaixa.ocultarTabela();
            })
            .finally(() => {                
                aguarde.removeAttribute('class', 'visible');
                aguarde.setAttribute('class', 'invisible');
            });

    }else if(codigo.length !== quantidadeMaximaDigitos){
        //formReset();
        focusInput('codigo_caixa');
        viewCaixa.ocultarTabela();

    }


});