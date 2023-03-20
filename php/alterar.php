<?php
//Incluir Conexão
include("./conexao.php");

//Obter Dados
$obterDados = file_get_contents("php://input");

//Extrair dados Jason
$extrair = json_decode($obterDados);

//Separar dados Jason
$idCurso    = $extrair->cursos->idCurso;
$nomeCurso  = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;

//SQL
$sql    =   "UPDATE cursos set nomeCurso='$nomeCurso', valorCurso=$valorCurso where idCurso=$idCurso";
mysqli_query($conexao, $sql);

//Exportar os Dados Cadastrados em Json
$curso = [
    'idCurso'    => $idCurso,
    'nomeCurso'  => $nomeCurso,
    'valorCurso' => $valorCurso
]

json_encode(['cursos']=>$curso);

?>