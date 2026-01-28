import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';
import { getSession } from './retornarSessao.js';

const formAlterarCliente = document.getElementById('form_alterar_dados_cliente');

const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');
const notificacao = new RenderizarToast();

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
    console.log(codigo);
    // Adiciona o arquivo ao objeto FormData
    formData.append('codigo_caixa', codigo);
    formData.append('sigla_cliente', siglaCliente);
    formData.append('corrigir_armazenar', corrigirArmazenar);
    formData.append('corrigir_prazo_armazenamento', corrigirPrazoArmazenamento);
    formData.append('corrigir_fragmentar', corrigirFragmentar);

        await fetch('src/controller/alterarInformacoesCliente.php', {
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
                        const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        tabelaCorrecao.exibirDados(objetoData.caixa);

                        getSession().then(session => {
                            if (session) {
                                const permissaoBTN = session['perfil'];
                                //console.log("Permissão: "+permissaoBTN);
                                if(permissaoBTN === 'ADMINISTRADOR' || permissaoBTN === 'GESTOR'){
                                    btns_conferencia.classList.remove('invisible');
                                    viewCaixa.exibirDados(objetoData.caixa);
                                }
                                
                            }
                        });


                    }else if(objetoData.caixa['corrigido'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
                        btns_conferencia.classList.remove('invisible');
                        viewCaixa.exibirDados(objetoData.caixa);    

                    }

                    notificacao.exibir(`Dados alterados com sucesso!\nCliente: ${nomeCliente} - Sigla: ${siglaCliente}`, "success");
                        
                    
                    
                } else {
                    //viewCaixa.ocultarTabela();                   
                    //formReset();      
                    btns_conferencia.classList.remove('invisible');                                  
                    notificacao.exibir(`Erro ao tentar alterar os dados do Cliente: ${siglaCliente} - Sigla: ${siglaCliente}.`, "danger");
                    focusInput('codigo_caixa');
                    //modalResposta('modal_falso', 'show', 'msg_erro', 'Caixa não encontrada!');
                    
                }
            })
            .catch(error => {
                //console.error('Erro:', error);
                //viewCaixa.ocultarTabela();
                focusInput('codigo_caixa');
                notificacao.exibir(`Não foi possível conectar ao banco para registrar a alteração dos dados do Cliente: ${siglaCliente} - Sigla: ${siglaCliente}.`, "danger");
            })
            .finally(() => {                
                aguarde.classList.remove('visible');
                aguarde.classList.add('invisible');
            });
    
});