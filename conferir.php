<!doctype html>
<html lang="pt-BR">

<?php
include 'vendor/autoload.php';
include 'header.php';
use Carta\Utils\Validacoes;

$validacoes = new Validacoes();
//$validacoes->validar();
$validacoes->interromperReenvioFormulario();
$validacoes->verificarUsuarioLogado();
$usuario['perfil'] = $_SESSION['perfil_usuario'];
$usuario['nome'] = $_SESSION['nome'];
$usuario['matricula'] = $_SESSION['matricula'];
$usuario['se'] = $_SESSION['se_usuario'];
include 'menuTop.php';
?>

<body>
  
<?php
include 'view/conteudoConferir.php';
include 'view/modalResposta.php';
include 'view/modalCorrigirCaixa.php';
include 'view/modalConferirCaixa.php';
include 'view/modalCorrigirCliente.php';
include 'view/modalAlterarQuebraSequencia.php';
include 'scripts.html';
include 'footer.php';
?>
<script type="module" src="js/consultarCaixa.js"></script>
<script type="module" src="js/alterarQuebraSequencia.js"></script>
<script type="module" src="js/alterarInformacoesCaixa.js"></script>
<script type="module" src="js/alterarInformacoesCliente.js"></script>
<script type="module" src="js/btnAlterarQuebraSequencia.js"></script>
<script type="module" src="js/btnConferirCaixa.js"></script>
<script type="module" src="js/btnSolicitarRetencaoCaixa.js"></script>
<script type="module" src="js/btnCorrigirInformacoesCaixa.js"></script>
<script type="module" src="js/btnCorrigirInformacoesCliente.js"></script>
<script type="module" src="js/solicitarRetencaoCaixa.js"></script>
<script type="module" src="js/conferirCaixa.js"></script>


  </body>
</html>