<?php

namespace Carta\Services;

require '../../vendor/autoload.php';

use Carta\Database\FuncoesSQL;
use Carta\Models\CaixaAR;

class ConsultarCaixa{

	protected int $numeroCaixa;

	public function __construct(int $numeroCaixa)
	{

		$this->numeroCaixa = $numeroCaixa;
		//return $this->consultar();
	}

	public function consultar(): ?CaixaAR
	{

		$numeroCaixa = $this->numeroCaixa;
		$funcoesSQL = new funcoesSQL();
		$sql = "SELECT 
			ar.numero_caixa, 
			ar.sigla_cliente, 
			c.nome as nome_cliente, 
			c.codigo_cliente, 
			ar.data_digitalizacao,
			ar.quantidade_lotes, 
			ar.quantidade_objetos, 
			ar.lote_cliente_inicial, 
			ar.lote_cliente_final, 
			ar.situacao,  
			ar.quebra_sequencia,
			ar.conferido, 
			ar.corrigido,
			ar.retida,		
			c.armazenar, 
			c.prazo_armazenamento,
			c.fragmentar 
			FROM tb_armazenamento_ar as ar 
			LEFT JOIN tb_cliente as c ON 
			c.sigla_cliente = ar.sigla_cliente 
			WHERE ar.numero_caixa = :numero_caixa";

		$dados = array(":numero_caixa" => $numeroCaixa);
		$resultado = $funcoesSQL->fetchAllSQL($sql, $dados);
		// Se o banco não retornar nada, retornamos null
		//var_dump($resultado);
		//echo $sql;
        //exit;
        if (empty($resultado)) {
            return null;
        }

        return CaixaAR::fromArray($resultado);
		

	}




}



?>