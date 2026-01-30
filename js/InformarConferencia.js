export class InformarConferencia {
    constructor(idTabela, idCorpo) {
        this.tabela = document.getElementById(idTabela);
        this.corpo = document.getElementById(idCorpo);
    }

    exibirDados(dadosCaixa, classe = null) {
        this.corpo.innerHTML = '';
        const codigo = dadosCaixa['numeroCaixa'];
        const linha = document.createElement('tr');

        const celula = document.createElement('th');
        celula.setAttribute('colspan','12');
        

        if(classe !== null){

            celula.classList.add(classe);     
        }
        //celula.setAttribute('class', 'p-3');
        celula.classList.add('p-3');
        celula.textContent = `Caixa número: ${codigo} conferida.`;
        linha.appendChild(celula);

        this.corpo.appendChild(linha);
        const titulo = document.getElementById('titulo_tabela_caixa');
        titulo.innerText = `Caixa número: ${codigo} conferida.` ;
        this.tabela.style.display = 'table';
    }   


    ocultarTabela() {
        this.tabela.style.display = 'none';
        this.corpo.innerHTML = '';
    }
}
