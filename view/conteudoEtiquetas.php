  <div class="container">
    <div class="row justify-content-center align-middle p-5">
      <div class="col-12 text-center">
        <h2>Gerar Planilha para Postagem (PPN)</h2>
        <form method="POST" action="conferir_caixa.php" enctype="multipart/form-data">
          <div class="mb-3 text-center">
          <input type="number" id="numero_caixa" class="form-control" aria-describedby="CaixaHelpBlock" min="45000" max="51200" required>
          <div id="CaixaHelpBlock" class="form-text">
            Informe os cinco dígitos referente a caixa que será conferida.
            É necessário verificar se a quantidade de lotes informados na caixa está de acordo com o registrado para a devolução.
          </div>
        </div>
          <button type="submit" class="btn btn-outline-success">Salvar</button>
        </form>        
      </div>
    </div>    
  </div>