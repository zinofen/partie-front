import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColDef ,GridApi,
  GridReadyEvent,HeaderCheckboxSelectionCallbackParams,
  CheckboxSelectionCallbackParams,
  PaginationNumberFormatterParams,
  FirstDataRenderedEvent} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Etudiant } from './etudiant';
import { ServiceService } from './services/etudiant.service';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public gridApi!: GridApi;

  // the column definitions
  public columnDefs: ColDef[] = [
    //sortable pour activer le tri et filter pour le filtrage
    { field: 'id' , sortable: true, filter: true,checkboxSelection: true },
    { field: 'nom' , sortable: true, filter: true },
    { field: 'cin', sortable: true, filter: true },
    { field: 'adresse', sortable: true, filter: true },
    { field: 'telephone', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true }
];
public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
  headerCheckboxSelection: isFirstColumn,
  checkboxSelection: isFirstColumn,
};
public rowSelection = 'multiple'; 
//the data
etudiants :Etudiant[];
page: number=0;
size: number=30;
//pages!: Array<number>;


public paginationPageSize = 5;
constructor(private http: HttpClient,private service:ServiceService) {}

onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.paginationGoToPage(5);
}

onPageSizeChanged() {
  var value = (document.getElementById('page-size') as HTMLInputElement)
    .value;
  this.gridApi.paginationSetPageSize(Number(value));
}


onQuickFilterChanged() {
  this.gridApi.setQuickFilter(
    (document.getElementById('quickFilter') as HTMLInputElement).value
  );
}

ngOnInit():void
{
  /*  this.service.getEtudiants().subscribe(
    etudiant=>{
      this.rowData =etudiant['content'];
      console.log(this.rowData);
    }
  ); */

  this.getEtudiants();
}
public paginationNumberFormatter: (params: PaginationNumberFormatterParams
  ) => string = function (params) {
    return '[' + params.value.toLocaleString() + ']';
  };
public getEtudiants(): void {
  this.service.getEtudiants(this.page, this.size).subscribe(
    (etudiant)=>{
      this.etudiants =etudiant['content']
      //this.pages=etudiant['totalPages']
    },
      
    (response: Etudiant[]) => {
      this.etudiants = response;
      console.log(this.etudiants);
    }
    //(error: HttpErrorResponse) => {
      //alert(error.message);
    
  );
}
onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
}
}

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

