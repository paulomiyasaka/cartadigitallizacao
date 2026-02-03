<?php
ob_clean();
header('Content-Type: application/json; charset=utf-8');

require '../../vendor/autoload.php';

use Carta\Services\ConferirCaixa;
use Carta\Services\ConsultarCaixa;

$codigo = $_POST['codigo_caixa'] ?? '';
$matricula = $_POST['matricula'] ?? '';
$retorno = ['resultado' => false, 'caixa' => null];

if (strlen($codigo) === 5 AND $matricula !== '') {
    
    //$consultarCaixa = new ConsultarCaixa($codigo);
    $solicitar = new ConferirCaixa($codigo, $matricula);
    $resultado = $solicitar->conferir();
    //echo json_encode($consultarCaixa);
    //var_dump($consultarCaixa);
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