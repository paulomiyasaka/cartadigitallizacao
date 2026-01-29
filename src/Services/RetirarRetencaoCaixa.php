<?php

namespace Carta\Services;

require '../../vendor/autoload.php';

use Carta\Database\FuncoesSQL;

class RetirarRetencaoCaixa{

	protected int $numeroCaixa;

	public function __construct(int $numeroCaixa)
	{

		$this->numeroCaixa = $numeroCaixa;
		//return $this->consultar();
	}


	public function retirar(): bool
	{

		$numeroCaixa = $this->numeroCaixa;
		$funcoesSQL = new funcoesSQL();
		$sql = "UPDATE 
			tb_armazenamento_ar as a
			SET a.retida = :retida 
			WHERE a.numero_caixa = :numero_caixa";

		$dados = array(":numero_caixa" => $numeroCaixa, ":retida" => 'NAO');
		$resultado = $funcoesSQL->SQL($sql, $dados);
		return $resultado;
		

	}



}



?>