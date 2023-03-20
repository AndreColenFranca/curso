<?php

//Incluir Conexão
include("./conexao.php");

//Obter Dados
$obterDados = file_get_contents("php://input");

//Extrair dados Jason
$extrair = json_decode($obterDados);

//Separar dados Jason
$idCurso = $extrair->cursos->idCurso;

//SQL
$sql    =   "DELETE FROM cursos where idCurso=$idCurso";
mysqli_query($conexao, $sql);

?>