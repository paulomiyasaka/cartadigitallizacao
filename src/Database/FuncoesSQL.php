<?php
namespace Carta\Database;

use Carta\Database\FuncoesSQL;


class FuncoesSQL extends conecta{


	final public function SQL($sql, $dados){
		
		$query = conecta::executarSQL($sql, $dados);
		//$resultado = $query->fetch(PDO::FETCH_OBJ);
		$row = $query->rowCount();
		if($row > 0){
			return TRUE;
		}else{
			return FALSE;
		}
		//return $query->rowCount();	
	}

	final public function fetchAllSQL($sql, $dados){
		$query = conecta::executarSQL($sql, $dados);
		return $query->fetchAll(PDO::FETCH_OBJ);			
	}

	final public function fetchSQL($sql, $dados){
		$query = conecta::executarSQL($sql, $dados);
		return $query->fetch(PDO::FETCH_OBJ);			
	}

	final public function executarScriptSQL($nomeArquivo, $caminho){
		$query = conecta::execScriptSQL($nomeArquivo, $caminho);
		if($query){
			return true;
		}else{
			return false;
		}
					
	}

	
	

}


?>