<div class="container">
  <div class="row justify-content-center align-middle p-5">
    <div class="col-4 text-center">
      <form method="post" action="logar.php" enctype="multipart/form-data">
        <div class="mb-3 text-center">
          <label for="matricula" class="form-label ">Matrícula:</label>
          <input class="form-control" type="text" id="matricula" name="matricula" required>
        </div>
        <div class="mb-3 text-center">
          <label for="senha" class="form-label ">Selecionar planilha tipo .XLSX</label>
          <input class="form-control" type="password" id="senha" name="senha" accept=".xlsx" required>
        </div>
        <button type="submit" class="btn btn-outline-success">Entrar</button>
      </form>        
    </div>
  </div> 