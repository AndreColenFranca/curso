import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CursoService {
  
  //Url
  url = "http://localhost/api2/php/";

  //Vetor
  vetor:Curso[];

  //Construtor
  constructor(private http:HttpClient) {}

  //obter todos os cursos
  obterCursos():Observable<Curso[]>{

    return this.http.get(this.url+"listar").pipe(
      map((res) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }


  cadastrarCursos(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar',{cursos:c})
      .pipe(map((res)=>{
        this.vetor.push(res['cursos']);
        return this.vetor
      }))
  }


  removerCursos(c:Curso): Observable<Curso[]>{

    const params = new HttpParams().set("idCurso", c.idCurso.toString());
    return this.http.delete(this.url+'excluir',{params: params})
      .pipe(map((res)=> {

        const filtro = this.vetor.filter((curso)=> {
          return +curso['idCurso'] !== +c.idCurso;
        });
        return this.vetor
      }))
  }
  //Atualiza Curso
  atualizarCursos(c:Curso): Observable<Curso[]>{

    // Executa Alteracao via URL
    return this.http.put(this.url+'alterar',{crsos:c})
        // Percorrer o vetor para saber qual é p id do CCurso Alterado
        .pipe(map((res)=> {
        const cursoAlterado = this.vetor.find((item)=> {
          return +item['idCurso'] === +['idCurso'];
        });

        //Altedra o valor do vetor local
        if(cursoAlterado){
          cursoAlterado['nomeCurso']  = c['nomeCurso'];
          cursoAlterado['valorCurso'] = c['valorCurso'];
        }
        //Retorno
        return this.vetor;
      }))
  }
}
