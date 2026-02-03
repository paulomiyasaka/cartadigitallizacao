<?php

namespace Carta\Services;

require '../../vendor/autoload.php';

use Carta\Database\FuncoesSQL;

class ConferirCaixa{

	protected int $numeroCaixa;
	protected int $matricula;

	public function __construct(int $numeroCaixa, int $matricula)
	{

		$this->numeroCaixa = $numeroCaixa;
		$this->matricula = $matricula;
		//return $this->consultar();
	}


	public function conferir(): bool
	{

		$numeroCaixa = $this->numeroCaixa;
		$matricula = $this->matricula;
		$funcoesSQL = new funcoesSQL();
		$sql = "UPDATE 
			tb_armazenamento_ar as a
			SET a.conferido = :conferido,
			a.matricula_conferencia = :matricula 
			WHERE a.numero_caixa = :numero_caixa";

		$dados = array(":numero_caixa" => $numeroCaixa, ":matricula" => $matricula, ":conferido" => 'SIM');
		$resultado = $funcoesSQL->SQL($sql, $dados);
		return $resultado;
		

	}



}



?>