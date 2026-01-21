<?php

namespace Carta\Services;

require 'vendor/autoload.php';

use Carta\Utils\UploadPlanilha; 
use Carta\Utils\LerPlanilha;
use Carta\Database\FuncoesSQL;

class SalvarDados
{	
	private string $nomeArquivo;
	private string $nomeArquivoTemporario;
	private string $tabela;
	
	public function __construct($nomeArquivo, $nomeArquivoTemporario, $tabela)
	{

    	$this->nomeArquivo = $nomeArquivo;
    	$this->nomeArquivoTemporario = $nomeArquivoTemporario;
    	$this->tabela = $tabela;
    	$this->salvar();
		
	}

	private function salvar():int
	{

	$nomeArquivo = $this->nomeArquivo;
	$nomeArquivoTemporario = $this->nomeArquivoTemporario;
	$tabela = $this->tabela;

	$planilha = new UploadPlanilha($nomeArquivo, $nomeArquivoTemporario, $tabela);

    $registrosSalvos = 0;
    $preencherCabecalho = true;
    $dados = [];

    if($planilha){
        //$dadosPlanilha = new LerPlanilha($nomeArquivo, UPLOAD_DIR);        

        if($dadosPlanilha = new LerPlanilha($nomeArquivo, $tabela)){
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

            
            unlink(UPLOAD_DIR."/".$nomeArquivo);
            return $registrosSalvos;
            //echo "Arquivo excluído: ".$nomeArquivo;
            //echo "Linhas registradas: ".$registrosSalvos;                
            
            

        }else{ //ler o arquivo do upload
            echo "Não foi possível ler o arquivo: ".UPLOAD_DIR."/".$nomeArquivo;
            return false;
        }

    
    }else{
        echo "Erro ao tentar fazer o upload do arquivo.";
        return false;

    }//UPLOAD DO ARQUIVO


	}


}


?>