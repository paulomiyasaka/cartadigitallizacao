export class InformarSolicitacaoCorrecao {
    constructor(idTabela, idCorpo) {
        this.tabela = document.getElementById(idTabela);
        this.corpo = document.getElementById(idCorpo);
    }

    exibirDados(dadosCaixa) {
        this.corpo.innerHTML = '';

        const linha = document.createElement('tr');

        // Defina a ordem exata das propriedades conforme o seu <thead>
        /*
        const chaves = [
            'numeroCaixa', 
            'siglaCliente', 
            'nomeCliente', 
            'codigoCliente',
            'quantidadeLotes', 
            'quantidadeObjetos', // adicionei conforme seu HTML anterior
            'loteClienteInicial', 
            'loteClienteFinal',
            'quebraSequencia',
            'armazenar',
            'prazoArmazenamento',
            'fragmentar'
        ];
        */
        const celula = document.createElement('th');
        celula.setAttribute('colspan','12');
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
