<div id="modal_corrigir_caixa" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="titulo_modal" class="modal-title">Corrigir informações da caixa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
          <form id="form_corrigir_caixa" method="post">
            <div class="mb-3 w-75 mx-auto">
              <label for="corrigir_caixa_quantidade_lotes" class="form-label"><strong>Quantidade de Lotes:</strong></label>
              <input type="number" maxlength="2" class="form-control" id="corrigir_caixa_quantidade_lotes" name="corrigir_caixa_quantidade_lotes" min="1" required>

              <label for="corrigir_caixa_quantidade_objetos" class="form-label"><strong>Quantidade de ARs:</strong></label>
              <input type="number" class="form-control" id="corrigir_caixa_quantidade_objetos" name="corrigir_caixa_quantidade_objetos" maxlength="4" min="1" required>
            
              <label for="corrigir_caixa_lote_cliente_inicial" class="form-label"><strong>Lote Inicial Cliente:</strong></label>
              <input type="number" class="form-control" id="corrigir_caixa_lote_cliente_inicial" name="corrigir_caixa_lote_cliente_inicial" maxlength="8" min="1" required>

              <label for="corrigir_caixa_lote_cliente_final" class="form-label"><strong>Lote Final Cliente:</strong></label>
              <input type="number" class="form-control" id="corrigir_caixa_lote_cliente_final" name="corrigir_caixa_lote_cliente_final" maxlength="8" min="1" required>

              <label for="corrigir_data_movimento" class="form-label"><strong>Data Movimento:</strong></label>
              <input type="date" class="form-control" id="corrigir_data_movimento" name="corrigir_data_movimento" required>
            
              <label for="corrigir_caixa_quebra_sequencia" class="form-label"><strong>Quebra de Sequência:</strong></label>
              <textarea class="form-control" aria-label="Quebra de Sequência" id=
              "corrigir_caixa_quebra_sequencia" name="corrigir_caixa_quebra_sequencia" maxlength="245"></textarea>
              <input type="hidden" name="sigla_cliente" value="">

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </div>      
    </div>
  </div>
</div>


