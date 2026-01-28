import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';

const formQuebraSequencia = document.getElementById('form_corrigir_caixa');

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

formQuebraSequencia.addEventListener('submit', async function(e) {
    bloquearSubmit(e);

    const aguarde = document.getElementById('aguarde');
    aguarde.classList.remove('invisible');
    aguarde.classList.add('visible');

    const codigo = document.getElementById('codigo_caixa').value;
    const corrigirCaixaQuantidadeLotes = document.getElementById('corrigir_caixa_quantidade_lotes').value;
    const corrigirCaixaQuantidadeObjetos = document.getElementById('corrigir_caixa_quantidade_objetos').value;
    const corrigirCaixaLoteClienteInicial = document.getElementById('corrigir_caixa_lote_cliente_inicial').value;
    const corrigirCaixaLoteClienteFinal = document.getElementById('corrigir_caixa_lote_cliente_final').value;
    const corrigirCaixaQuebraSequencia = document.getElementById('corrigir_caixa_quebra_sequencia').value;

    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    btns_conferencia.classList.add('invisible');
    console.log(codigo);
    // Adiciona o arquivo ao objeto FormData
    formData.append('codigo_caixa', codigo);
    formData.append('corrigir_caixa_quantidade_lotes', corrigirCaixaQuantidadeLotes);
    formData.append('corrigir_caixa_quantidade_objetos', corrigirCaixaQuantidadeObjetos);
    formData.append('corrigir_caixa_lote_cliente_inicial', corrigirCaixaLoteClienteInicial);
    formData.append('corrigir_caixa_lote_cliente_final', corrigirCaixaLoteClienteFinal);
    formData.append('corrigir_caixa_quebra_sequencia', corrigirCaixaQuebraSequencia);

        await fetch('src/controller/alterarInformacoesCaixa.php', {
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
                console.log(objetoData);
                //console.log(data);

                if (objetoData.resultado) {
                    
                    if(objetoData.caixa['corrigido'] === 'SIM' || objetoData.caixa['armazenar'] === 'NAO' || objetoData.caixa['fragmentar'] === 'SIM'){
                        
                        getSession().then(session => {
                            if (session) {
                                const permissaoBTN = session['perfil'];
                                //console.log("Permissão: "+permissaoBTN);
                                if(permissaoBTN === 'ADMINISTRADOR' || permissaoBTN === 'GESTOR'){
                                    btns_conferencia.classList.remove('invisible');
                                    viewCaixa.exibirDados(objetoData.caixa);
                                }else{
                                    const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                                    tabelaCorrecao.exibirDados(objetoData.caixa); 
                                }
                                
                            }
                        });//getSession


                        //const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        //tabelaCorrecao.exibirDados(objetoData.caixa); 

                    }else if(objetoData.caixa['corrigido'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
                        btns_conferencia.classList.remove('invisible');
                        viewCaixa.exibirDados(objetoData.caixa);
                        //const textarea = document.getElementById('alterar_quebra_sequencia');
                        //textarea.value = '';
                        notificacao.exibir(`Dados da caixa número: ${codigo} alterados com sucesso!`, "success");

                    }// if
                    
                    
                } else {
                    //viewCaixa.ocultarTabela();                   
                    //formReset();                                        
                    notificacao.exibir(`Erro ao tentar alterar os dados da caixa número: ${codigo}.`, "danger");
                    focusInput('codigo_caixa');
                    //modalResposta('modal_falso', 'show', 'msg_erro', 'Caixa não encontrada!');
                    btns_conferencia.classList.remove('invisible');
                    
                }//if resultado

            })
            .catch(error => {
                //console.error('Erro:', error);
                //viewCaixa.ocultarTabela();
                notificacao.exibir(`Não houve alteração dos dados da caixa número: ${codigo}.`, "danger");
                focusInput('codigo_caixa');
            })
            .finally(() => {                
                aguarde.classList.remove('visible');
                aguarde.classList.add('invisible');
            });
    
});