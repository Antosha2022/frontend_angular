import {Component} from '@angular/core';
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
import {ApiService} from "../../../service/Api/api.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {VisitDetailDto} from "../../../service/Api/DTO/visit-detail.dto";
import {FindingFormComponent} from "../finding-form/finding-form.component";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {ReviewFormComponent} from "../review-form/review-form.component";
import {PrintTagsComponent} from "../print-tags/print-tags.component";

@Component({
  selector: 'app-findings-list',
  templateUrl: './findings-list.component.html',
  styleUrls: ['./findings-list.component.scss']
})
export class FindingsListComponent {
  collectionId?: number;
  visitId?: number;
  dataSourceFindings: FindingDto[] = [];
  arrayFindingVisit = 0;
  askReviewButtonAvailable = false;
  askSuperReviewButtonAvailable = false;
  addNewFindingButtonAvailable = true;
  displayedColumns: string[] = [
    'id',
    'number',
    'location_latitude',
    'location_longitude',
    'location_altitude',
    'species_id',
    'sex',
    'comment',
    'status',
    'version',
    'actions'
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.loadFindingsForVisit();
  }
  public loadFindingsForVisit(): void {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.visitId = Number(this.router.routerState.snapshot.url.split('/')[4])

      this.api.visitEndpoint.getOneVisit(this.collectionId, this.visitId).subscribe((field_visit: VisitDetailDto) => {
            if(field_visit.has_pending_review === 1 || field_visit.has_completed_review === 1 ){
              this.addNewFindingButtonAvailable = false;
              this.askSuperReviewButtonAvailable = false;
            }
            if (field_visit.has_pending_review === 1 && field_visit.has_completed_review === 0){
              this.askSuperReviewButtonAvailable = false;
            }
            if (field_visit.has_pending_review === 0 && field_visit.has_completed_review === 1){
              this.askSuperReviewButtonAvailable = true;
            }

        this.api.findingsEndpoint.getAllFindings( this.collectionId!, this.visitId! ).subscribe((result: FindingDto[]) => {
          this.dataSourceFindings = result;
            for (const elem of result){
              if (elem.version === 0 && this.addNewFindingButtonAvailable){
                this.askReviewButtonAvailable = true;
              }
              if (elem.version === 2){
                this.askSuperReviewButtonAvailable = false;
              }
            }
            this.arrayFindingVisit = result.length;
        })
    })
  }

  openDialogAddFinding() {
    const dialogRef = this.dialog.open(FindingFormComponent, {
      data: {}
    })
      dialogRef.afterClosed().subscribe((finding: FindingDto) => {
          this.api.findingsEndpoint.createFinding(this.collectionId!, this.visitId!, finding).subscribe((object:{id: number}) =>  {
              this.loadFindingsForVisit();
          })
      })
  }

  openDialogEditFinding(finding: FindingDto){
    const dialogRef = this.dialog.open(FindingFormComponent, {
      data: finding
    })
    dialogRef.afterClosed().subscribe((finding: FindingDto) => {
        this.api.findingsEndpoint.updateFinding(this.collectionId!, finding).subscribe(() => {
          this.loadFindingsForVisit();
        });
      })
  }

  deleteSelectedFinding(finding: FindingDto): void {
        this.api.findingsEndpoint.deleteFinding(this.collectionId!,finding).subscribe(() => {
        });
        this.loadFindingsForVisit();
  }

  createReviewForm(){
    const dialogRef = this.dialog.open(ReviewFormComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe((review: ReviewDto) => {
        this.api.reviewEndpoint.createReview(review).subscribe((object:{id: number}) =>  {
          this.loadFindingsForVisit();
           })
        })
  }
  createSuperviewForm(){
    const dialogRef = this.dialog.open(ReviewFormComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe((review: ReviewDto) => {
      this.api.reviewEndpoint.createReview(review).subscribe((object:{id: number}) =>  {
        this.loadFindingsForVisit();
      })

        this.api.findingsEndpoint.getAllFindings(this.collectionId!,this.visitId!).subscribe((findings:FindingDto[])=>{
          for (const elem of findings){
            elem.status = 'none'
          }
        })
      })
  }

  printBssTags(){
    this.openDialogTags()
  }

  openDialogTags(): void {
    const dialogRef = this.dialog.open(PrintTagsComponent, {
    })
    dialogRef.afterClosed().subscribe()
  }
}
