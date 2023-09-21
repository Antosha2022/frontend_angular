import {Component} from '@angular/core';
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {ApiService} from "../../../service/Api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {SpeciesSearchFormComponent} from "../species-search-form/species-search-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bees',
  templateUrl: './bees.component.html',
  styleUrls: ['./bees.component.scss']
})
export class BeesComponent {
  dataSource: SpeciesItemDto[] = [];
  dataSpecies?: SpeciesItemDto;
  speciesId = 1;

  displayedColumns: string[] = [
    'actions',
    'id',
    'species',
    'priority',
    'latin_name',
    'genus',
    'family',
    'trivial_name',
    'author',
    'flying_time',
    'development',
    'habitat',
    'specialisation',
    'pollen_sources'
  ];
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {
    this.api.speciesDatabaseEndpoint.getAllSpecies().subscribe((result: SpeciesItemDto[]) => {
     this.dataSource = result
    })
    this.showSpeciesDetail(this.speciesId)
  }

  showSpeciesDetail($event: number) {
    if($event !==0 ) {
      this.speciesId = $event
    }
    if($event === 0){
      this.speciesId = 1
    }
  }
  openSearchForm(){
    const dialogRef = this.dialog.open(SpeciesSearchFormComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe((bee: SpeciesItemDto) => {
     if (bee.id >0){
        this.router.navigate(['/bees-detail/'+bee.id])
       }
    })
  }
}
