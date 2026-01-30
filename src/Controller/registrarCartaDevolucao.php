<?php
ob_clean();
header('Content-Type: application/json; charset=utf-8');

require '../../vendor/autoload.php';

use Carta\Services\GerarCartaDevolucao;
use Carta\Services\ConsultarCaixa;

$codigo = $_POST['codigo_caixa'] ?? '';
$ano = date('Y');
$mcuOrigem = $_POST['mcu_origem'] ?? '';
$siglaCliente = $_POST['sigla_cliente'] ?? '';
$siglaSeArmazenamento = $_POST['sigla_se_armazenamento'] ?? '';
$dataCartaGerada = date('Y-m-d');

$retorno = ['resultado' => false, 'caixa' => null];

if (strlen($codigo) === 5) {
    
    

    $gerarCarta = new GerarCartaDevolucao($codigo, $ano, $mcuOrigem, $siglaCliente, $siglaSeArmazenamento, $dataCartaGerada);
    $resultado = $gerarCarta->gerar();
    //echo json_encode($consultarCaixa);
    var_dump($resultado);
    //exit;
    if($resultado) {
        $consulta = new ConsultarCaixa($codigo);
        $consultarCaixa = $consulta->consultar();
        if($consultarCaixa !== NULL) {
            $retorno['resultado'] = TRUE;
            $retorno['caixa'] = $consultarCaixa;
        }
    }
}

echo json_encode($retorno);

?>