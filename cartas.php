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
include 'view/conteudoCartas.php';
include 'view/modalGerarCartaDevolucao.php';
include 'scripts.html';
include 'footer.php';
?>
<script type="module" src="js/listarCartaDevolucao.js"></script>
<script type="module" src="js/registrarCartaDevolucao.js"></script>
<script type="module" src="js/btnGerarCartaDevolucao.js"></script>

  </body>
</html>