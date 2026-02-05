<?php
//require '../../vendor/autoload.php';
require '../../vendor/autoload.php';

use Carta\Utils\HtmlTemplateEditor;
use Carta\Services\ConsultarOrigem;
use Carta\Services\ConsultarCaixa;
use Carta\Services\ConsultarNumeroCarta;

$codigo = null;
$retorno = ['resultado' => false, 'carta' => null];

if(isset($_GET['caixa']) AND $_GET['caixa'] !== '' AND $_GET['caixa'] !== NULL){
	$codigo = $_GET['caixa'];
}

$origem = new ConsultarOrigem($codigo);
$origem = $origem->consultar();

$caixa = new ConsultarCaixa($codigo);
$caixa = $caixa->consultar();

$carta = new ConsultarNumeroCarta($codigo);
$carta = $carta->consultar();

$editor = new HtmlTemplateEditor('carta_modelo.html');
$editor->replacePlaceholder('{{enderecoUnidade}}', $origem->logradouro.' - '.$origem->cidade.'/'.$origem->uf.' - CEP: '.$origem->cep);
$editor->replacePlaceholder('{{nomeUnidade}}', $origem->unidade);
$editor->replacePlaceholder('{{cartaNumero}}', $carta->numeroCarta.'/'.$carta->ano);
$editor->replacePlaceholder('{{localData}}', $origem->cidade.'-'.$origem->uf.', '.date('d/m/Y'));
$editor->replacePlaceholder('{{saudacao}}', 'Ao(À)');
$editor->replacePlaceholder('{{destinatario}}', $caixa->nomeCliente);
$editor->replacePlaceholder('{{sigla}}', $caixa->siglaCliente);
$editor->replacePlaceholder('{{codigo}}', $caixa->codigoCliente);
$editor->replacePlaceholder('{{loteInicial}}', $caixa->loteClienteInicial);
$editor->replacePlaceholder('{{loteFinal}}', $caixa->loteClienteFinal);
$editor->replacePlaceholder('{{quantidadeLotes}}', $caixa->quantidadeLotes);
$editor->replacePlaceholder('{{quantidadeARs}}', $caixa->quantidadeObjetos);
//$data = new DateTime($caixa->dataDigitalizacao);
$data = new DateTimeImmutable('now', new DateTimeZone('America/Sao_Paulo'));
$editor->replacePlaceholder('{{movimento}}', $data->format('d/m/Y'));
if($caixa->quebraSequencia == ''){
	$editor->replacePlaceholder('{{exibir}}', 'invisible');
	$editor->replacePlaceholder('{{quebraSequencia}}', 'Não há quebra de sequência.');

}else{
	$editor->replacePlaceholder('{{exibir}}', 'visible');
	$editor->replacePlaceholder('{{quebraSequencia}}', $caixa->quebraSequencia);
}

$editor->replacePlaceholder('{{gerenteUnidade}}', $origem->nomeGerente);
$editor->replacePlaceholder('{{matriculaGerenteUnidade}}', $origem->matriculaGerente);

// Salva o arquivo HTML
$diretorio = "../../output/";
$outputHtmlFile = $carta->numeroCarta.'_'.$carta->ano.'.html';
$salvar = $editor->saveAs($diretorio.$outputHtmlFile);
if($salvar) {
    $retorno['resultado'] = TRUE;
    $retorno['carta'] = $outputHtmlFile;
}
echo json_encode($retorno);



?>