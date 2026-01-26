<div id="modal_corrigir_cliente" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="titulo_modal_alterar_cliente" class="modal-title">Corrigir informações do Cliente</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="col">
          <form id="form_alterar_dados_cliente" method="post">
            <div class="mb-3 w-75 mx-auto">
              <label for="alterar_cliente_armazenar" class="form-label"><strong>Armazenar:</strong></label>
              <select id="alterar_cliente_armazenar" name="alterar_cliente_armazenar" class="form-select text-center" aria-label="Default" required>
                <option selected>Selecionar</option>
                <option value="SIM">SIM</option>
                <option value="NAO">NÃO</option>
              </select>

              <label for="alterar_cliente_prazo_armazenamento" class="form-label mt-3"><strong>Prazo de Armazenamento:</strong></label>
              <select id="alterar_cliente_prazo_armazenamento" name="alterar_cliente_prazo_armazenamento" class="form-select text-center" aria-label="Default" required>
                <option selected>Selecionar</option>
                <option value="0">0</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
                <option value="150">150</option>
                <option value="180">180</option>
              </select>


              <label for="alterar_cliente_fragmentar" class="form-label mt-3"><strong>Fragmentar:</strong></label>
              <select id="alterar_cliente_fragmentar" name="alterar_cliente_fragmentar" class="form-select text-center" aria-label="Default" required>
                <option selected>Selecionar</option>
                <option value="SIM">SIM</option>
                <option value="NAO">NÃO</option>
              </select>

            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </div>      
    </div>
  </div>
</div>