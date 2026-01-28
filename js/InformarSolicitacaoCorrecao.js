export class InformarSolicitacaoCorrecao {
    constructor(idTabela, idCorpo) {
        this.tabela = document.getElementById(idTabela);
        this.corpo = document.getElementById(idCorpo);
    }

    exibirDados(dadosCaixa, classe = null) {
        this.corpo.innerHTML = '';

        const linha = document.createElement('tr');

        const celula = document.createElement('th');
        celula.setAttribute('colspan','12');
        

        if(classe !== null){

            celula.classList.add(classe);     
        }
        //celula.setAttribute('class', 'p-3');
        celula.classList.add('p-3');
        celula.textContent = "Verifique se é necessária a correção dos dados da caixa número: "+dadosCaixa['numeroCaixa']+"";
        linha.appendChild(celula);

        this.corpo.appendChild(linha);
        this.tabela.style.display = 'table';
    }   


    ocultarTabela() {
        this.tabela.style.display = 'none';
        this.corpo.innerHTML = '';
    }
}
