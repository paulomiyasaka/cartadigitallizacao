<?php

namespace Carta\Services;

require '../../vendor/autoload.php';

use Carta\Database\FuncoesSQL;

class solicitaCorrecaoCaixa{

	protected int $numeroCaixa;

	public function __construct(int $numeroCaixa)
	{

		$this->numeroCaixa = $numeroCaixa;
		//return $this->consultar();
	}


	public function solicitar(): bool
	{

		$numeroCaixa = $this->numeroCaixa;
		$funcoesSQL = new funcoesSQL();
		$sql = "UPDATE 
			tb_armazenamento_ar as a
			SET a.solicitar_correcao = :solicitar_correcao 
			WHERE a.numero_caixa = :numero_caixa";

		$dados = array(":numero_caixa" => $numeroCaixa, ":solicitar_correcao" => 'SIM');
		$resultado = $funcoesSQL->SQL($sql, $dados);
		return $resultado;
		

	}



}



?>