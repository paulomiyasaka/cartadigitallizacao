  <div class="container">
    <div class="row justify-content-center align-middle p-5">
      <div class="col-4 text-center">
        <h2 class="p-3">Gerar Cartas de Devolução</h2>
        <form method="POST" action="gerarCarta.php" enctype="multipart/form-data">
          <div class="mb-3 text-center">
          <div class="form-text p-3">
            Para gerar as cartas 
          </div>

          <div class="form-check m-1 mt-3">
            <input class="form-check-input" type="checkbox" value="" id="checkDefault">
            <label class="form-check-label" for="checkDefault">
              Default checkbox
            </label>
          </div>
          <div class="form-check m-1">
            <input class="form-check-input" type="checkbox" value="" id="checkChecked" checked>
            <label class="form-check-label" for="checkChecked">
              Checked checkbox
            </label>
          </div>
        </div>
          <button type="submit" class="btn btn-outline-success">Salvar</button>
        </form>        
      </div>
    </div>    
  </div>