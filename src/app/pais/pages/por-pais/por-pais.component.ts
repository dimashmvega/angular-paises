import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {
  termino: string ='';
  hayError: boolean = false;
  mostrarSugerencias: boolean = false;
  paisesResult: Country[] = [];
  paisesSugeridos: Country[] = [];
  fieldsFromAPI: string[] = ['name', 'flags', 'population', 'cca2', 'capital'];
  constructor( private paisService: PaisService<Country[]> ){}

  buscar( termino: string ){    
    this.hayError = false;
    this.termino = termino;    
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino, this.fieldsFromAPI)
      .subscribe( (paises)=>{      
        console.log(paises);
        this.paisesResult = paises || [];
      }, (err) =>{
          console.log(err);
          this.hayError = true;
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais( termino, this.fieldsFromAPI )
      .subscribe( paises =>{
        this.paisesSugeridos = paises.splice(0,5);
        console.log(this.paisesSugeridos);
      }, (err) =>{
        this.paisesSugeridos = []
      } );
  }

  buscarSugerido( termino: string ){
    this.buscar(termino);    
  }
}
