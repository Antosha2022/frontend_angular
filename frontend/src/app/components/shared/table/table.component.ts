import {Component} from '@angular/core';
import {SpeciesDatabaseDto} from "../../../service/Api/DTO/speciesdatabase.dto";
import {ApiService} from "../../../service/Api/api.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  dataSource: SpeciesDatabaseDto[] = [];
  displayedColumns: string[] = [
    'actions',
    'id',
    'name'
  ];
  constructor(private api: ApiService) {
    this.api.speciesDatabaseEndpoint.getAllDatabases().subscribe((result: SpeciesDatabaseDto[]) => {
      this.dataSource = result
    })
  }

}
