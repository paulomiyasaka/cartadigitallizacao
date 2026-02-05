let opcoesSE = "";

async function carregarSES() {
    try {
        
        const resposta = await fetch('src/Controller/getSuperintendencia.php'); 
        const dados = await resposta.json();

        const selectInicial = document.querySelector("#select_se");

        if (selectInicial && dados.resultado) {
            // 1. Criamos uma variável para armazenar todos os HTMLs das opções
            // Começamos com a opção padrão
            let htmlOptions = '<option value="" selected disabled>Selecione</option>';

            // 2. Percorremos os 28 itens e adicionamos uma <option> para cada um
            dados.se.forEach(item => {
                htmlOptions += `<option value="${item.siglaSe}">${item.siglaSe}</option>`;
            });

            // 3. Inserimos tudo de uma vez no select
            selectInicial.innerHTML = htmlOptions;

            // 4. Guardamos na variável global para as próximas linhas que você adicionar
            opcoesSE = dados.se.map(item => 
                `<option value="${item.siglaSe}">${item.siglaSe}</option>`
            ).join('');
        }

    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        opcoesSE = `<option value="">Erro ao carregar</option>`;
    }
}


carregarSES();


function adicionarLinha(botaoAtual) {
    const tabela = document.getElementById("tabela_etiqueta");
    const totalLinhas = tabela.rows.length;
    
    // 1. Transforma o botão clicado em "Remover"
    botaoAtual.parentNode.innerHTML =  `<button onclick="removerLinha(this)" class="btn btn-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
            </svg>
          </button>`;
    
    // 2. Cria a nova linha
    const novaLinha = tabela.insertRow(-1); 
    const celulaSE = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const celulaBotao = novaLinha.insertCell(2);
    
    // 3. Define o conteúdo da nova linha com o botão "Adicionar"
    //celulaSe.innerHTML = "Linha " + (totalLinhas + 1);
    celulaSE.innerHTML = `<select class="form-select" required>
                    <option value="" selected disabled>Selecione</option>
                    ${opcoesSE}
                  </select>`;
    celulaQuantidade.innerHTML = `<input type="number" class="form-control w-50 mx-auto text-center" id="quantidade_etiqueta" name="quantidade_etiqueta" required>`;
    celulaBotao.innerHTML = `<button onclick="adicionarLinha(this)" class="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg></button>`;
}

function removerLinha(botao) {
    // Remove a linha correspondente ao botão clicado
    const linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}
