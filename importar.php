<?php
require 'vendor/autoload.php';

use Carta\UploadPlanilha;
use Carta\LerPlanilha;
use Carta\FuncoesSQL;

const LISTA_CLIENTES = "clientes/clientes_cadastrados.xlsx";
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

    $planilha = new UploadPlanilha($nomeArquivo, $nomeArquivoTemporario, UPLOAD_DIR);
    //$arquivos->__set('name', $_FILES['file']['name']);
    //$arquivos->__set('tmp_name',$_FILES['file']['tmp_name']);
    //$arquivos->__set('diretorio', UPLOAD_DIR);

    $registrosSalvos = 0;
    $preencherCabecalho = true;
    $dados = [];

    if($planilha){
        //$dadosPlanilha = new LerPlanilha($nomeArquivo, UPLOAD_DIR);        

        if($dadosPlanilha = new LerPlanilha($nomeArquivo, UPLOAD_DIR)){
            //echo "Aqui";
            //var_dump($dadosPlanilha);
            $conecta = new FuncoesSQL();

            foreach ($dadosPlanilha as $linhas) {

                foreach ($linhas as $celula) {                    

                    if($preencherCabecalho){
                        $cabecalho = "";
                        $parametroCabecalho = "";

                        foreach ($celula as $valor) {
                            //array_push($cabecalho, $valor);
                            if($cabecalho == ""){
                                $cabecalho = strtolower($valor);
                                $parametroCabecalho = ":".strtolower($valor);
                            }else{
                                $cabecalho .= ",".strtolower($valor);
                                $parametroCabecalho .= ",:".strtolower($valor);
                            }
                        }
                        $preencherCabecalho = false;
                        //var_dump($parametroCabecalho);
                        //exit;
                    
                    }else{

                        $parametrosExplode = explode(",", $parametroCabecalho);
                        $cabecalhoExplode = explode(",", $cabecalho);
                        $dados = array_combine($parametrosExplode, $celula);
                        
                        $sql = "INSERT INTO {$tabela} ($cabecalho) VALUES ($parametroCabecalho)";
                        if(!$conecta->SQL($sql, $dados)){
                            echo "Erro ao tentar salvar no banco de dados: ".$celula[0];
                            return false;
                        }else{
                            $registrosSalvos++;
                        }


                    }

                                       
                    
                }//foreach $linhas
                           
                
            }//foreach $dadosPlanilha

            echo "Linhas registradas: ".$registrosSalvos;
            unlink(UPLOAD_DIR."/".$nomeArquivo);
            

        }else{ //ler o arquivo do upload
            echo "Não foi possível ler o arquivo: ".UPLOAD_DIR."/".$nomeArquivo;
            return false;
        }

    
    }else{
        echo "Erro ao tentar fazer o upload do arquivo.";
        return false;

    }//UPLOAD DO ARQUIVO

}//if $_FILES        
    








?>