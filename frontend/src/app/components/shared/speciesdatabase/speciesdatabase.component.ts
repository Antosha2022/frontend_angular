import {Component} from '@angular/core';
import {SpeciesService} from "../../../service/species.service";
import {SpeciesInterface} from "./species.interface";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-speciesdatabase',
  templateUrl: './speciesdatabase.component.html',
  styleUrls: ['./speciesdatabase.component.scss']
})

export class SpeciesDatabaseComponent {

  displayedColumns: Array<keyof SpeciesInterface> = [
    'id',
    'latin_name',
    'trivial_name',
    'habitat',
    'specialisation',
    'pollen_sources',
  ];
  searchValue = ''
  searchForm = this.fb.nonNullable.group({
    searchValue:'',
  })
  speciesCollection: SpeciesInterface[]=[]
  constructor(
    private speciesService: SpeciesService,
    private fb: FormBuilder
  ) {
    this.fetchData()
  }
  fetchData():void{
    this.speciesService.fetchSpecies(this.searchValue).subscribe((speciesCollection: SpeciesInterface[])=>{
      this.speciesCollection = speciesCollection;
    })
  }
  capitalize(str:string): string{
    return str.charAt(0).toUpperCase()+str.substring(1);
  }
  onSearchSubmit():void{
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}

