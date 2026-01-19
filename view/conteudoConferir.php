  <div class="container">
    <div class="row justify-content-center align-middle p-5">
      <div class="col-4 text-center">
        <h2>Conferência de lotes armazenados</h2>
        <form method="POST" action="conferir_caixa.php" enctype="multipart/form-data">
          <div class="mb-3 text-center">
          <input type="number" id="numero_caixa" class="form-control" aria-describedby="CaixaHelpBlock" min="45000" max="51200" required>
          <div id="CaixaHelpBlock" class="form-text">
            Informe os dígitos da caixa no campo acima.<br>
            É necessário a conferência dos lotes armazenados antes de gerar a relação para as cartas.
          </div>
        </div>
          <button type="submit" class="btn btn-outline-success">Confirmar</button>
        </form>        
      </div>
    </div>    
  </div>