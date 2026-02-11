<?php
ob_clean();
header('Content-Type: application/json; charset=utf-8');

require '../../vendor/autoload.php';

use Carta\Services\AlterarInformacoesCaixa;
use Carta\Services\RetirarRetencaoCaixa;
use Carta\Services\RetirarConferenciaCaixa;
use Carta\Services\ConsultarCaixa;

$codigo = $_POST['codigo_caixa'] ?? '';
$quantidadeLotes = $_POST['corrigir_caixa_quantidade_lotes'] ?? '';
$quantidadeObjetos = $_POST['corrigir_caixa_quantidade_objetos'] ?? '';
$loteClienteInicial = $_POST['corrigir_caixa_lote_cliente_inicial'] ?? '';
$loteClienteFinal = $_POST['corrigir_caixa_lote_cliente_final'] ?? '';
$dataMovimento = $_POST['corrigir_data_movimento'] ?? '';
$quebraSequencia = $_POST['corrigir_caixa_quebra_sequencia'] ?? '';

$retorno = ['resultado' => false, 'caixa' => null];

if (strlen($codigo) === 5) {
    $data = new DateTimeImmutable($dataMovimento, new DateTimeZone('America/Sao_Paulo'));
    $dataMovimento = $data->format('Y-m-d');

    $alterar = new AlterarInformacoesCaixa($codigo, $quantidadeLotes, $quantidadeObjetos, $loteClienteInicial, $loteClienteFinal, $dataMovimento, $quebraSequencia);
    $resultado = $alterar->alterar();
    if($resultado){
            
            $retirarRetencao = new RetirarRetencaoCaixa($codigo);
            $retirar = $retirarRetencao->retirar();
            $retirarConferencia = new RetirarConferenciaCaixa($codigo);
            $retirarConferencia = $retirarConferencia->retirar();
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