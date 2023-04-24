import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles:[ `
    button{
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string='';
  hayError: boolean = false;
  paisesResult: Country[] = []; 
  fieldsFromAPI: string[] = ['name', 'flags', 'population', 'cca2', 'capital'];
  constructor( private paisService: PaisService<Country[]> ) {}

  activarRegion( region: string ){
    if(this.regionActiva === region){
      return;
    }
    this.regionActiva = region;   
    this.paisesResult = [];
    this.buscarRegion(this.regionActiva);
  }  

  getClaseCSS( region: string ): string{
    return (region === this.regionActiva) 
                ? 'btn btn-primary' 
                : 'btn btn-outline-primary'
  }

  buscarRegion( region: string ){
    console.log(region);

    this.paisService.buscarRegion(region, this.fieldsFromAPI)
      .subscribe( paises =>{      
      this.paisesResult = paises}, 
      (err) =>{
        this.hayError = true;
      });
  }



}
