    <div class="container">
    <div class="row justify-content-center align-middle pt-5">
      <div class="col-6 text-center">
        <h2>Consultar carta de devolução</h2>
        <form method="post">
          <div class="text-center">
            <div class="form-check">
              <input type="number" id="codigo_caixa" name="codigo_caixa" class="text-center form-control mx-auto" maxlength="5" style="width: 200px; font-size: 20pt;" autocomplete="off" aria-describedby="CaixaHelpBlock" autofocus required>
              <div id="CaixaHelpBlock" class="form-text">
                Informe os dígitos da caixa no campo acima.<br>
                É necessário ter realizado a conferência dos lotes armazenados antes de gerar a carta de devolução.
              </div>
            </div>
          </div>
        </form>
        <div class="text-center pt-2">
          <div id="btns_gerar_carta" class="form-check d-flex invisible justify-content-center" >    

            <a id="btn_consultar_carta_devolucao" href="#" target="_blank" class="btn btn-outline-primary m-1">Consultar Carta de Devolução</a>
            <!--
            <button id="btn_gerar_carta_devolucao" type="button" class="btn btn-outline-primary m-1" data-bs-toggle="modal" data-bs-target="#modal_gerar_carta_devolucao">Gerar Carta de Devolução</button>             
            -->
          </div>
        </div>
      </div>
    </div>  
    <div class="row">
      <div class="col text-center">
        <div id="aguarde" class="invisible">
          <p>Carregando <img src="img/load.gif" style="vertical-align: middle;"></p>
        </div>
      </div> 
    </div>

        <div class="row">
          <div class="col">
            <table class="table alert alert-primary text-center" id="tabelaConferencia" style="display: none;">
              <thead>
                <tr>
                  <th id="titulo_tabela_caixa" scope="col" colspan="10" class="fs-3">Conferência</th>
                  <th scope="col" colspan="3" class="fs-3 border-start">Cadastro SGD</th>
                </tr>
                <tr class="align-middle">
                  <th scope="col">Nº Caixa</th>
                  <th scope="col">Sigla Cliente</th>
                  <th scope="col">Nome Cliente</th>
                  <th scope="col">Código Cliente</th>
                  <th scope="col">Quantidade de Lotes</th>
                  <th scope="col">Quantidade de ARs</th>
                  <th scope="col">Lote Inicial Cliente</th>
                  <th scope="col">Lote Final Cliente</th>
                  <th scope="col">Data Movimento</th>
                  <th scope="col">Quebra de Sequência</th>
                  <th scope="col" class="border-start">Armazenar</th>
                  <th scope="col">Prazo (dias)</th>
                  <th scope="col">Fragmentar</th>
                </tr>
              </thead>
              <tbody id="corpoTabelaCaixa" class="fs-5 bg-success-subtle">                                 
              </tbody>
            </table>        
          </div>
        </div>
      </div>
   
