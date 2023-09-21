import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VisitDto} from "../../../service/Api/DTO/visit.dto";
import {ApiService} from "../../../service/Api/api.service";
import {ActivatedRoute, Router} from '@angular/router';
import {VisitFormComponent} from "../visit-form/visit-form.component";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})

export class VisitsComponent {
  dataSourceVisits: VisitDto[] = [];
  attachedFindings: FindingDto[] = [];
  collectionId = 0;
  lastVersion = 0;
  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'date',
    'description',
    'has_pending_review',
    'has_completed_review',
    'actions'
  ];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.loadCollectionVisits();
  }
  private loadCollectionVisits(): void {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.api.visitEndpoint.getAllVisits(this.collectionId).subscribe((result: VisitDto[]) => {
      this.dataSourceVisits = result
      for(const fieldVisit of result){
        this.api.reviewEndpoint.getAllReviews().subscribe((reviews:ReviewDto[])=>{
          for(const review of reviews){
           let reviewVisit: ReviewDto;
            if(review.field_visit_id === fieldVisit.id){
              reviewVisit = review;
              fieldVisit.last_review_version = review.version
            }
          }
        })
      }
    })
  }
  openDialogVisit() {
    const dialogRef = this.dialog.open(VisitFormComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe((field_visit: VisitDto) => {
      this.api.visitEndpoint.createVisit(this.collectionId, field_visit)
        .subscribe((object: { id: number }) =>  {
        this.loadCollectionVisits();
        }
      )
    })
  }

  openDialogEditVisit(field_visit: VisitDto): void {
    const dialogRef = this.dialog.open(VisitFormComponent, {
      data: field_visit
    })
    dialogRef.afterClosed().subscribe((field_visit: VisitDto) => {
      this.api.visitEndpoint.updateVisit(this.collectionId,field_visit).subscribe(() => {
        this.loadCollectionVisits();
      });
    })
  }

  deleteVisit(field_visit: VisitDto): void {
    this.api.visitEndpoint.deleteVisit(this.collectionId,field_visit).subscribe(() => {
      this.loadCollectionVisits();
    });
  }
}

