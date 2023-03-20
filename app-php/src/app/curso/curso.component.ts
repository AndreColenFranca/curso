import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //URL Base
  url = "http://localhost/api2/php/";

  //Vetor de Cursos
  vetor:Curso[];

  //objeto da classe curso
  curso = new Curso();

  //Construtor
  constructor(private curso_service:CursoService){}

  //Inicializador
  ngOnInit(): void {
    this.selecao();
  }

  // Lista Todos os cursos
  selecao() {
    this.curso_service.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  } 

  cadastro(c: Curso) {


    this.curso_service.cadastrarCursos(this.curso).subscribe(
      
      (res: Curso[]) => {
        
        //Adicionando dados ao vetor
        this.vetor =  res;
        
        //Limpar Atributos
        this.curso.nomeCurso  = "";
        this.curso.valorCurso = 0;

        //atualizar lista
        // this.selecao();
        
      }
    )
  }

  remover(c: Curso) {
    this.curso_service.removerCursos(this.curso).subscribe(
      (res: Curso[]) => {
       this.vetor =  res;

       this.curso.nomeCurso  = "";
       this.curso.valorCurso = 0;
       }
     )
  }


  alterar(curso:Curso)  {
    this.curso_service.atualizarCursos(this.curso).subscribe(
      (res) => {

       //Atualizar Vetor 
       this.vetor =  res;

       // Limpar os valores do Objeto
       this.curso.nomeCurso  = "";
       this.curso.valorCurso = 0;

       //Atualiza Lista de Curso
       this.selecao();
       }
     )
  }

  // Selecionar Curso Específico
  selecionarCurso(c:Curso) {
    this.curso.idCurso    = c.idCurso;
    this.curso.nomeCurso  = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }
}
