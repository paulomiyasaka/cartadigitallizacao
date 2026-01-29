<?php
ob_clean();
header('Content-Type: application/json; charset=utf-8');

require '../../vendor/autoload.php';

use Carta\Services\AlterarInformacoesCaixa;
use Carta\Services\RetirarRetencaoCaixa;
use Carta\Services\ConsultarCaixa;

$codigo = $_POST['codigo_caixa'] ?? '';
$quantidadeLotes = $_POST['corrigir_caixa_quantidade_lotes'] ?? '';
$quantidadeObjetos = $_POST['corrigir_caixa_quantidade_objetos'] ?? '';
$loteClienteInicial = $_POST['corrigir_caixa_lote_cliente_inicial'] ?? '';
$loteClienteFinal = $_POST['corrigir_caixa_lote_cliente_final'] ?? '';
$quebraSequencia = $_POST['corrigir_caixa_quebra_sequencia'] ?? '';

$retorno = ['resultado' => false, 'caixa' => null];

if (strlen($codigo) === 5) {
    
    //$consultarCaixa = new ConsultarCaixa($codigo);
    $alterar = new AlterarInformacoesCaixa($codigo, $quantidadeLotes, $quantidadeObjetos, $loteClienteInicial, $loteClienteFinal, $quebraSequencia);
    $resultado = $alterar->alterar();
    //echo json_encode($consultarCaixa);
    //var_dump($consultarCaixa);
    //exit;
    if($resultado){
        //$consulta = new ConsultarCaixa($codigo);
        //$consultarCaixa = $consulta->consultar();
        //if($consultarCaixa !== NULL) {
            //$retorno['resultado'] = TRUE;
            //$retorno['caixa'] = $consultarCaixa;
            
            $retirarRetencao = new RetirarRetencaoCaixa($codigo);
            $retirar = $retirarRetencao->retirar();
            $consulta = new ConsultarCaixa($codigo);
            $consultarCaixa = $consulta->consultar();
            if($consultarCaixa !== NULL) {
                $retorno['resultado'] = TRUE;
                $retorno['caixa'] = $consultarCaixa;
            }

        //}//if consulta        
        
    }//if resultado

}//if codigo

echo json_encode($retorno);

?>