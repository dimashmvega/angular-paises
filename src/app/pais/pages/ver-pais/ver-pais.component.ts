import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators'

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  hayError: boolean = false;
  pais!: Country;

  constructor ( private activatedRouter: ActivatedRoute, 
                private paisService: PaisService<Country[]> ) {}

  //Forma de hacerlo en una sola funcion
  ngOnInit(): void {    
    this.activatedRouter.params
        .pipe(
          switchMap( (param) => this.paisService.buscarCodigoPais( param['id'] ) ),
          tap( console.log )
        )
        .subscribe( pais =>{
          this.pais = pais[0];
        })


    // Forma de hacerlo comun pero en dos pasos:
    //Primero obtener el valor de la url (ej. SV, CR, HON)
    // this.activatedRouter.params
    //     .subscribe( ({ id }) =>{
    //       console.log(id);
    //       idPais = id;
    //     });

    //Luego con el codigo, hacemos la busqueda en la API
    // this.paisService.buscarCodigoPais(idPais)
    //         .subscribe( (capitales)=>{            
    //           this.paisesResult = capitales || [];
    //           console.log(this.paisesResult);
    //         }, (err) =>{
    //           this.hayError = true;
    //         });
  }



  
}
