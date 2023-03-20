<?php
//Incluir Conexão
include("./conexao.php");

//Obter Dados
$obterDados = file_get_contents("php://input"); 

//Extrair dados Jason
$extrair = json_decode($obterDados);

//Separar dados Jason
$nomeCurso  = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;

//SQL
$sql    =   "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$nomeCurso', $valorCurso)";
mysqli_query($conexao, $sql);

//Exportar os Dados Cadastrados em Json
$curso = [
    'nomeCurso'  => $nomeCurso,
    'valorCurso' => $valorCurso
];


json_encode(['cursos']=>$curso);

?>