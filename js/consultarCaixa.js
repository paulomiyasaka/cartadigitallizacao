import { RenderizarCaixa } from './RenderizarCaixa.js';
import { InformarSolicitacaoCorrecao } from './InformarSolicitacaoCorrecao.js';
import { modalResposta, bloquearSubmit, formReset, focusInput, hiddenModal } from './funcoesModal.js';
import { RenderizarToast } from './RenderizarToast.js';

const inputCaixa = document.getElementById('codigo_caixa');
const viewCaixa = new RenderizarCaixa('tabelaConferencia', 'corpoTabelaCaixa');


inputCaixa.addEventListener('input', async function() {
    //bloquearSubmit(e);

    const codigo = this.value;
    const formData = new FormData();
    const btns_conferencia = document.getElementById('btns_conferencia');
    const url = 'src/controller/buscarCaixa.php';

    btns_conferencia.setAttribute('class','invisible');
    //console.log(codigo);
    // Adiciona o arquivo ao objeto FormData
    formData.append('codigo_caixa', codigo);

    //tabelaConferencia(viewCaixa, codigo, url, formData);
    if (codigo.length === 5) {

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
                    
                    if(objetoData.caixa['solicitarCorrecao'] === 'SIM' || objetoData.caixa['armazenar'] === 'NAO' || objetoData.caixa['fragmentar'] === 'SIM'){
                        const tabelaCorrecao = new InformarSolicitacaoCorrecao('tabelaConferencia', 'corpoTabelaCaixa');
                        tabelaCorrecao.exibirDados(objetoData.caixa);                       
                    }else if(objetoData.caixa['solicitarCorrecao'] === 'NAO' && objetoData.caixa['armazenar'] === 'SIM' && objetoData.caixa['fragmentar'] === 'NAO'){
                        btns_conferencia.removeAttribute('class','invisible');
                        viewCaixa.exibirDados(objetoData.caixa);

                        const btnCorrecao = document.getElementById('btn_ok_alerta');
                        btnCorrecao.innerHTML = 'SOLICITAR';

                        const mensagemConfirmacao = document.getElementById('conteudo_modal_alerta');
                        mensagemConfirmacao.innerHTML = `Solicitar a correção para a caixa número <strong>${codigo}</strong>?<br>Somente o gestor poderá avaliar os dados cadastrados para alterar.`;

                        const idCaixa = document.getElementById('id_acao');
                        idCaixa.value = objetoData.caixa['numeroCaixa'];

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
            });
    }else if(codigo.length > 5){
        formReset();
        focusInput('codigo_caixa');
        viewCaixa.ocultarTabela();

    }


});