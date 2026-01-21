<?php

namespace Carta\Database;

use \PDO;

class Conecta{

protected $host, $senha, $usuario, $conexao, $bancoDados;

//CONSTRUTOR
public function __construct(){

	
	$this->host = '127.0.0.1';
	$this->senha = "";
	$this->usuario = "root";
	$this->bancoDados = "db_digitalizacao";
	
	self::conecta();
	

}//CONSTRUTOR

//CONEXÃO
protected function conecta(){
	
	try {	
		
		$dsn = "mysql:dbname=".$this->bancoDados.";host=".$this->host.";charset=utf8";
		$user = $this->usuario;
		$password = $this->senha;
		

		try {
			$this->conexao = new PDO($dsn, $user, $password);
			return $this->conexao;
		} catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		
		
	} catch (PDOException  $e) {
	    return $e->getMessage();
	}


}

//executa instruções sql pelo PDO
protected function executarSQL($sql, $array){

	try{
		$pdo = $this->conexao->prepare($sql);
		$pdo->execute($array);
		
		return $pdo;

	} catch (PDOException  $e) {
	    return $e->getMessage();
	}


}


//executa instruções sql pelo PDO
protected function execSQLUpdate($sql, $array){
	
	try{
		$pdo = $this->conexao->prepare($sql);
		
		
		
		foreach ($array as $key => $val) {
			$pdo->bindValue($key, $val, PDO::PARAM_INT);
		}
		$pdo->execute();
		
		//$pdo->execute($array);
		
		return $pdo;

	} catch (PDOException  $e) {
	    return $e->getMessage();
	}
}

//executa script SQL
protected function execScriptSQL($nomeArquivo, $caminho){

	try {
    // Carrega o conteúdo do arquivo .sql
    $sql = file_get_contents($caminho."/".$nomeArquivo);

    // Executa todo o script de uma vez
    if($pdo->exec($sql)){
    	//echo "Script executado com sucesso!";
    	return true;
    }else{
    	return false;
    }
    
    
	} catch (PDOException $e) {
	    //echo "Erro ao executar script: " . $e->getMessage();
	    return false;
	}

}


//executa instruções sql pelo PDO
protected function sqlTransaction($sql, $array){
	//var_dump($array);
	//echo $sql;
	if($this->conexao->beginTransaction()){

		try{
			$pdo = $this->conexao->prepare($sql);
			$pdo->execute($array);
			
			if($pdo){
				//$this->commitSQL();
				return true;
			}
			//return $pdo;

		} catch (PDOException  $e) {
			$this->rollbackSQL();
			//return $e->getMessage();
		    return false;
		}
	}
}

protected function commitSQL(){
	return $this->conexao->commit();
}

protected function rollbackSQL(){
	return $this->conexao->rollBack();
}

protected function lastidSQL(){
	return (int) $this->conexao->lastInsertId();
}




}


?>