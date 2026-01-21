<?php

namespace Carta\Services;

require 'vendor/autoload.php';

use Carta\Utils\UploadPlanilha; 
use Carta\Utils\LerPlanilha;
use Carta\Utils\Funcoes;
use Carta\Database\FuncoesSQL;

class SalvarDados
{	
	private string $nomeArquivo;
	private string $nomeArquivoTemporario;
	private string $caminho;
    private string $tabela;   
    private bool $error;   
    private int $registrosSalvos; 
	
	public function __construct($nomeArquivo, $nomeArquivoTemporario, $caminho, $tabela)
	{

    	$this->nomeArquivo = $nomeArquivo;
    	$this->nomeArquivoTemporario = $nomeArquivoTemporario;
    	$this->caminho = $caminho;
        $this->tabela = $tabela;
        //atribuido true para ser alterado para false quando ocorrer erro
        //retornar false no método __toString()
        $this->error = true;
    	$this->salvar();
		
	}

	private function salvar()
	{

	$nomeArquivo = $this->nomeArquivo;
	$nomeArquivoTemporario = $this->nomeArquivoTemporario;
	$caminho = $this->caminho;
    $tabela = $this->tabela;

	$planilha = new UploadPlanilha($nomeArquivo, $nomeArquivoTemporario, $caminho);

    $registrosSalvos = 0;
    $preencherCabecalho = true;
    $dados = [];

    if($planilha){
        //$dadosPlanilha = new LerPlanilha($nomeArquivo, UPLOAD_DIR);        

        if($dadosPlanilha = new LerPlanilha($nomeArquivo, $caminho)){
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

                        $funcoes = new Funcoes();
                        $quantidadeCelulas = count($celula);
                        
                        for ($i=0; $i < $quantidadeCelulas; $i++) {                                
                            
                            switch (gettype($celula[$i])) {
                                case "integer":
                                case "double":
                                    $celula[$i] = $funcoes->somenteNumeros($celula[$i]);
                                    //echo $celula[$i]."<br>";
                                    break;

                                case "string": 
                                    $celula[$i] = $funcoes->maiuscula($funcoes->removerAcentuacao($celula[$i]));
                                    //echo $celula[$i]."<br>";
                                    break;                                

                                case "NULL":
                                case "unknown type":
                                default: $celula[$i] = "";
                            }

                        }
                        

                        //var_dump($converterCelula);
                        //var_dump($celula);
                        //exit;
                        
                        /*
                        $converterCelula = match(true) {
                            is_int($celula) => $celula = $funcoes->somenteNumeros($celula),
                            is_string($celula) => $celula = $funcoes->maiuscula($celula)
                        };
                        */
                        
                        $dados = array_combine($parametrosExplode, $celula);
                        
                        $sql = "INSERT INTO {$tabela} ($cabecalho) VALUES ($parametroCabecalho)";
                        if(!$conecta->SQL($sql, $dados)){
                            //echo "Erro ao tentar salvar no banco de dados: ".$celula[0];
                            //return false;
                            $this->error = false;
                        }else{
                            $registrosSalvos++;
                        }

                    }

                    
                }//foreach $linhas
                           
                
            }//foreach $dadosPlanilha

            
            unlink(UPLOAD_DIR."/".$nomeArquivo);
            $this->registrosSalvos = $registrosSalvos;
            //echo "Arquivo excluído: ".$nomeArquivo;
            //echo "Linhas registradas: ".$registrosSalvos;                
            
            

        }else{ //ler o arquivo do upload
            //echo "Não foi possível ler o arquivo: ".UPLOAD_DIR."/".$nomeArquivo;
            //return false;
            $this->error = false;
        }

    
    }else{
        //echo "Erro ao tentar fazer o upload do arquivo.";
        //return false;
        $this->error = false;

    }//UPLOAD DO ARQUIVO


	}//function salvar()

    public function __toString():string
    {   
        
        if(!$this->error AND $this->error != NULL){
            return (string) $this->error;
        }else{
            return (string) $this->registrosSalvos;
        }

    }






}//class


?>