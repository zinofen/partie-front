import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../etudiant';
import { GridApi,GridReadyEvent } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  //public gridApi!: GridApi;

//je déclare baseUrl
baseUrl: string= "http://localhost:8080";
  constructor(private http:HttpClient) { }

  public getEtudiants(page: Number ,size: Number): Observable<Etudiant[]> {
    
    return this.http.get<Etudiant[]>(this.baseUrl+'/etudiants/'+page+'/'+size);
}




}
