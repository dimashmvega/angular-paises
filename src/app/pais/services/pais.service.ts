import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService<T> {
  private apiUrl: string ='https://restcountries.com/v3.1';      

  constructor( private http: HttpClient ) { }  

  buscarPais(termino: string, fields?: string[]):Observable<T>{        
    return this.getFunction('name', termino, fields);        
  }

  buscarCapital( termino: string, fields?: string[] ):Observable<T>{         
    return this.getFunction('capital', termino, fields);    
  }

  buscarCodigoPais( id: string ):Observable<T>{
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<T>( url );
  }

  buscarRegion( termino: string, fields?: string[] ):Observable<T>{    
    return this.getFunction('region', termino, fields);        
  }

  private getFunction( resource: string, 
                        termino: string, 
                        fields?: string[]
                        ): Observable<T>{
    const params = new HttpParams()
        .set('fields', `${fields}`);

    if(params === null){
      const url = `${ this.apiUrl }/${ resource }/${ termino }`;      
      return this.http.get<T>( url );
    }
    else{            
      const url =`${this.apiUrl}/${resource}/${termino}`
      console.log(`URL: ${url} - Parametros: ${ params }`);
      return this.http.get<T>( url, { params: params } );
    }    
  }

}
