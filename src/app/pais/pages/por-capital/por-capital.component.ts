import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {
  termino: string ='El Salvador';
  hayError: boolean = false;
  paisesResult: Country[] = [];  
  fieldsFromAPI: string[] = ['name', 'flags', 'population', 'cca2', 'capital'];
  constructor( private paisService: PaisService<Country[]> ){}

  buscar( termino: string ){    
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(this.termino, this.fieldsFromAPI).subscribe( (capitales)=>{            
      this.paisesResult = capitales || [];
    }, (err) =>{
      this.hayError = true;
    });
  }

  sugerencias( termino: string ){
    this.hayError = false;
  }
  
}
