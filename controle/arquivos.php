<?php

/**
 * 
 */
class arquivos{

	protected $variavel = array();

	public function __set($variavel, $valor){
		$this->variavel[$variavel] = $valor;
	}

	public function __get($variavel){
		return $this->variavel[$variavel];
	
	}

	
	public function upload(){

		$nomeArquivo = $this->__get('name');
		$nomeArquivoTemporario = $this->__get('tmp_name');
		$uploadDir = $this->__get('diretorio');

		// Validações básicas
		$allowed = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$mime = finfo_file($finfo, $nomeArquivoTemporario);
		finfo_close($finfo);

		if (!in_array($mime, $allowed, true)) {
		    //echo 'Tipo de arquivo não permitido';
		    //return 'Tipo de arquivo não permitido';
		    return false;
		    //exit;
		}

		// Move para local temporário seguro (opcional)
		//$uploadDir = __DIR__ . $this->localUpload;
		

		if (!is_dir($uploadDir)) {
		    mkdir($uploadDir, 0755, true);
		}
		$target = $uploadDir . '/' . basename($nomeArquivo);
		if (!move_uploaded_file($nomeArquivoTemporario, $target)) {
		    //echo 'Falha ao salvar o arquivo';
		    //return 'Falha ao salvar o arquivo';
		    return false;
		    //exit;
		}else{
			return true;
		}


	}//upload




}


?>