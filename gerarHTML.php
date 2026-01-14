<?php
<<<<<<< HEAD
require 'controle/auto_load.php';
new auto_load();

//require 'vendor/autoload.php';
=======
require 'vendor/autoload.php';

use Carta\HtmlTemplateEditor;
>>>>>>> origin/main


$editor = new HtmlTemplateEditor('carta_modelo.html');
$editor->replacePlaceholder('{{enderecoUnidade}}', 'SIA Trecho 03, Lote 710/740 - Zona Industrial (Guará) - Brasília/DF - CEP: 71.200-983');
$editor->replacePlaceholder('{{nomeUnidade}}', 'CDIP/BSB');
$editor->replacePlaceholder('{{cartaNumero}}', '1/2025 - Série 2');
$editor->replacePlaceholder('{{localData}}', 'Brasília/DF, 13 de dezembro de 2025');
$editor->replacePlaceholder('{{saudacao}}', 'Ao');
$editor->replacePlaceholder('{{destinatario}}', 'DER ALAGOAS');
$editor->replacePlaceholder('{{sigla}}', 'DW');
$editor->replacePlaceholder('{{codigo}}', '3481');
$editor->replacePlaceholder('{{loteInicial}}', '26001138');
$editor->replacePlaceholder('{{loteFinal}}', '26001161');
$editor->replacePlaceholder('{{quantidadeLotes}}', '25');
$editor->replacePlaceholder('{{quantidadeARs}}', '1234');
$editor->replacePlaceholder('{{movimento}}', '10/02/2025');
$editor->replacePlaceholder('{{loteInicialQuebraSequencia}}', '26001145');
$editor->replacePlaceholder('{{loteFinalQuebraSequencia}}','26001150');
$editor->replacePlaceholder('{{quantidadeLotesQuebraSequencia}}', '6');
$editor->replacePlaceholder('{{gerenteUnidade}}', 'Dilza Nunes Costa Santos');
$editor->replacePlaceholder('{{matriculaGerenteUnidade}}', '8.134.226-8');

// Salva o arquivo HTML
$outputHtmlFile = 'output/dw_3481_dez_2025.html';
$editor->saveAs($outputHtmlFile);

// --- Início da conversão para PDF ---



?>