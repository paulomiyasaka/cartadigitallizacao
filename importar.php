<?php
require 'vendor/autoload.php';

const LISTA_CLIENTES = "clientes/clientes_cadastrados.xlsx";
const UPLOAD_DIR = "./uploads";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    //return 'Método não permitido.';
    return false;
}


try {

    //Carregar os dados da planilha de clientes cadastrados.
    $planilha = new planilha();
    if($clientes = $planilha->ler(LISTA_CLIENTES)){

        //se ler a planilha de clientes faz o upload da planilha de devolução  
        $upload = "";
        $nomeArquivo = "";

        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            //echo 'Arquivo não localizado.';
            return false;

        }else{
                
            $nomeArquivo = $_FILES['file']['name'];
            $nomeArquivoTemporario = $_FILES['file']['tmp_name'];
            $arquivos = new arquivos();
            $arquivos->__set('name', $_FILES['file']['name']);
            $arquivos->__set('tmp_name',$_FILES['file']['tmp_name']);
            $arquivos->__set('diretorio', UPLOAD_DIR);

            if($upload = $arquivos->upload($nomeArquivo, $nomeArquivoTemporario)){
                
                if($devolucao = $planilha->ler($nomeArquivo)){



                } //ler o arquivo do upload

            
            }else{
                //echo "Erro ao tentar fazer o upload do arquivo.";
                return false;

            }//UPLOAD DO ARQUIVO

        }//if $_FILES        



    }else{
        //echo "Erro ao ler a planilha de clientes cadastrados.";
        return false;

    }//IF leitura da planilha clientes
    

    //$pesquisaSigla = array_search()

    foreach ($clientes as $array => $key) {
        var_dump($key);
        echo "<br><br>";
    }

    //var_dump($clientes);




} catch (\Throwable $e) {
    //echo 'Erro ao ler a planilha: ' . $e->getMessage();
    //return 'Erro ao ler a planilha: ' . $e->getMessage();
    return false;
    //exit;
}











?>