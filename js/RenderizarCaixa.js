export class RenderizarCaixa {
    constructor(idTabela, idCorpo) {
        this.tabela = document.getElementById(idTabela);
        this.corpo = document.getElementById(idCorpo);
    }

    exibirDados(dadosCaixa) {
        this.corpo.innerHTML = '';

        const tr = document.createElement('tr');

        // Defina a ordem exata das propriedades conforme o seu <thead>
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

        chaves.forEach((chave, index) => {
            // Cria 'th' para a primeira coluna (Nº Caixa) e 'td' para as demais
            const celula = document.createElement(index === 0 ? 'th' : 'td');
            
            // Garante que não apareça "undefined" se o campo estiver vazio
            celula.textContent = dadosCaixa[chave] ?? ''; 
            
            if (index === 0) celula.scope = "row"; // Boa prática para acessibilidade em <th>
            
            tr.appendChild(celula);
        });

        this.corpo.appendChild(tr);
        this.tabela.style.display = 'table';
    }   


    ocultarTabela() {
        this.tabela.style.display = 'none';
        this.corpo.innerHTML = '';
    }
}
