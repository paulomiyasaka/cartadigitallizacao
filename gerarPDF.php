
<?php
/*
require 'controle/auto_load.class.php';
new auto_load();
*/

// Inclua o autoloader do Composer para carregar o Dompdf
require 'vendor/autoload.php';

use Dompdf\Dompdf;

$arquivoHtml = 'output/dw_3481_dez_2025.html';

// Instancia o Dompdf
$dompdf = new Dompdf();

// Carrega o HTML do arquivo
$dompdf->loadHtml(file_get_contents($arquivoHtml));

// (Opcional) Define o tamanho do papel e a orientação
$dompdf->setPaper('A4', 'portrait');

// Renderiza o HTML como PDF
$dompdf->render();

// Salva o arquivo PDF no servidor
file_put_contents('output/dw_3481_dez_2025.pdf', $dompdf->output());