import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {SpeciesSearchFormComponent} from "../species-search-form/species-search-form.component";

@Component({
  selector: 'app-bees-detail',
  templateUrl: './bees-detail.component.html',
  styleUrls: ['./bees-detail.component.scss']
})
export class BeesDetailComponent implements OnInit {
  public beeId?: number = 0;
  public bee?: SpeciesItemDto = undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.beeId = params['beeId'];
      this.api.speciesDatabaseEndpoint.getOneSpecies(this.beeId!).subscribe((bee:SpeciesItemDto)=>{
        this.bee = bee
      })
    })
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
