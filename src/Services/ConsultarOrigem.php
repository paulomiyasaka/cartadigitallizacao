<?php

namespace Carta\Services;

require '../../vendor/autoload.php';

use Carta\Database\FuncoesSQL;
use Carta\Models\OrigemAR;

class ConsultarOrigem{

	protected int $numeroCaixa;

	public function __construct(int $numeroCaixa)
	{

		$this->numeroCaixa = $numeroCaixa;
		//return $this->consultar();
	}

	public function consultar(): ?OrigemAR
	{

		$numeroCaixa = $this->numeroCaixa;
		$funcoesSQL = new funcoesSQL();
		$sql = `SELECT 
			ori.mcu_origem, 
			ori.unidade as unidade_remetente,
			ori.matricula as matricula_gerente, 
			u.nome as nome_gerente, 
			ori.sigla_se, 
			ori.unidade_remetente, 
			ori.cnpj, 
			ori.logradouro, 
			ori.numero, 
			ori.complemento,  
			ori.bairro,
			ori.cidade, 
			ori.uf,
			ori.cep
			FROM tb_origem as ori
			LEFT JOIN tb_usuario as u 
			LEFT JOIN tb_armazenamento_ar as ar ON 
			ori.matricula = u.matricula 
			AND ar.sigla_se = ori.sigla_se
			WHERE ar.numero_caixa = :numero_caixa`;

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