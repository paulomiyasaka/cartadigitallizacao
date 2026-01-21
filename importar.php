<?php
require 'vendor/autoload.php';

use Carta\Utils\UploadPlanilha;
use Carta\Utils\LerPlanilha;
use Carta\Database\FuncoesSQL;
use Carta\Services\SalvarDados;


//const LISTA_CLIENTES = "clientes/clientes_cadastrados.xlsx";
const UPLOAD_DIR = "uploads";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    //return 'Método não permitido.';
    return false;
}

if (!isset($_POST['tabela']) || $_POST['tabela'] == '') {
    echo 'Informar a tabela do banco de dados.';
    return false;

}


if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    echo 'Arquivo não localizado.';
    return false;

}else{
        
    $nomeArquivo = $_FILES['file']['name'];
    $nomeArquivoTemporario = $_FILES['file']['tmp_name'];
    $tabela = $_POST['tabela'];

    $registrosSalvos = new SalvarDados($nomeArquivo, $nomeArquivoTemporario, UPLOAD_DIR, $tabela);
    //echo $registrosSalvos;
    if($registrosSalvos == "false"){
        echo "Erro ao tentar salvar os registros.";
        return false;
    }else{
        echo $registrosSalvos. " registros salvos.";
        return true;
    }
    


}//if $_FILES        
    








?>