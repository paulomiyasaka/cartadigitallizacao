<?php

namespace Carta\Services;

require '../../vendor/autoload.php';

use Carta\Database\FuncoesSQL;

class AlterarInformacoesCaixa{

	protected int $numeroCaixa;
	protected int $quantidadeLotes;
	protected int $quantidadeObjetos;
	protected int $loteClienteInicial;
	protected int $loteClienteFinal;
	protected string $quebraSequencia;

	public function __construct(int $numeroCaixa, int $quantidadeLotes, int $quantidadeObjetos, int $loteClienteInicial, int $loteClienteFinal, string $quebraSequencia)
	{

		$this->numeroCaixa = $numeroCaixa;
		$this->quantidadeLotes = $quantidadeLotes;
		$this->quantidadeObjetos = $quantidadeObjetos;
		$this->loteClienteInicial = $loteClienteInicial;
		$this->loteClienteFinal = $loteClienteFinal;
		$this->quebraSequencia = $quebraSequencia;
	}

	public function alterar(): bool
	{

		$numeroCaixa = $this->numeroCaixa;
		$quantidadeLotes = $this->quantidadeLotes;
		$quantidadeObjetos = $this->quantidadeObjetos;
		$loteClienteInicial = $this->loteClienteInicial;
		$loteClienteFinal = $this->loteClienteFinal;
		$quebraSequencia = $this->quebraSequencia;
		

		$funcoesSQL = new funcoesSQL();
		$sql = "UPDATE 
			tb_armazenamento_ar as a
			SET a.quantidade_lotes = :quantidade_lotes,
			a.quantidade_objetos = :quantidade_objetos,
			a.lote_cliente_inicial = :lote_cliente_inicial,
			a.lote_cliente_final = :lote_cliente_final,
			a.quebra_sequencia = :quebra_sequencia
			WHERE a.numero_caixa = :numero_caixa";

		$dados = array(":numero_caixa" => $numeroCaixa, ":quantidade_lotes" => $quantidadeLotes, ":quantidade_objetos" => $quantidadeObjetos, ":lote_cliente_inicial" => $loteClienteInicial, ":lote_cliente_final" => $loteClienteFinal, ":quebra_sequencia" => $quebraSequencia);
		$resultado = $funcoesSQL->SQL($sql, $dados);
		return $resultado;
		

	}




}



?>