import {Component, OnInit} from '@angular/core';
import {ReviewFindingDto} from "../../../service/Api/DTO/review-finding.dto";
import {ApiService} from "../../../service/Api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ReviewFindingCorrectComponent} from "../review-finding-correct/review-finding-correct.component";
import {UserSessionService} from "../../../service/Session/user-session.service";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-review-finding-list',
  templateUrl: './review-finding-list.component.html',
  styleUrls: ['./review-finding-list.component.scss']
})
export class ReviewFindingListComponent {
  sourceReviewFinding: ReviewFindingDto[] = [];
  review?: ReviewDto;
  buttonCompleteReviewIsAvailable = false;
  currentUserId = 0;
  displayedColumns: string[] = [
    'id',
    'number',
    'details',
    'species_id',
    'sex',
    'comment',
    'status',
    'version',
    'actions'
  ];

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    public router: Router,
    private userSessionService: UserSessionService,
  ) {
    this.loadReviewFindings()
    this.currentUserId = Number(this.userSessionService.getUser()?.id)
  }

  private loadReviewFindings(): void {
    const routerStateSnapshot = this.router.routerState.snapshot;
    const reviewId = Number((routerStateSnapshot.url).substr(15));

      this.api.reviewEndpoint.getOneReview(reviewId).subscribe((review:ReviewDto)=>{
        this.review = review

        if (this.review.version === 1) {
          this.api.reviewEndpoint.getAllFindings(reviewId).subscribe((result: ReviewFindingDto[]) => {
            this.sourceReviewFinding = result
            for (const elem of result) {
              // this.startFindingVersion = elem.version
              if (elem.status === 'pending' || elem.status === 'none') {
                this.buttonCompleteReviewIsAvailable = false;
              } else {
                this.buttonCompleteReviewIsAvailable = true;
              }
            }
            for (const elem of result){
              if(elem.version === 1 && elem.status === 'pending'){
                this.buttonCompleteReviewIsAvailable = false;
              }
            }
          })
        }

        if (this.review.version === 2) {
          this.api.reviewEndpoint.getAllFindings(reviewId).subscribe((result1: ReviewFindingDto[]) => {
            this.sourceReviewFinding = result1
            for (const elem of result1) {
              if (elem.version === 1 ) {
                elem.status = 'none'
              }
            }

            for( const finding of result1) {
              if (finding.status === 'pending' || finding.status === 'none') {
                this.buttonCompleteReviewIsAvailable = false;
              } else {
                this.buttonCompleteReviewIsAvailable = true;
              }
            }
            for (const elem of result1){
              if(elem.version === 2 && elem.status === 'pending'){
                this.buttonCompleteReviewIsAvailable = false;
              }
            }
          })
        }
    })
  }

  openDialogComment(finding: ReviewFindingDto): void {
    const dialogRef = this.dialog.open(ReviewFindingCorrectComponent, {
      data: finding
    })

    dialogRef.afterClosed().subscribe((finding: ReviewFindingDto) => {
      const routerStateSnapshot = this.router.routerState.snapshot;
      const reviewId = Number((routerStateSnapshot.url).substr(15));

      this.api.reviewEndpoint.correctReviewFinding(reviewId,finding).subscribe((finding: ReviewFindingDto) => {
        this.loadReviewFindings()
      });
    })
  }

  openDialogConfirm(finding: ReviewFindingDto): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: finding
    })

    dialogRef.afterClosed().subscribe((finding: ReviewFindingDto) => {
      const routerStateSnapshot = this.router.routerState.snapshot;
      const reviewId = Number((routerStateSnapshot.url).substr(15));

      this.api.reviewEndpoint.approveReviewFinding(reviewId,finding).subscribe(()=>{
        this.loadReviewFindings()
      })
    })
  }

  restoreFinding(finding: ReviewFindingDto):void{
    const routerStateSnapshot = this.router.routerState.snapshot;
    const reviewId = Number((routerStateSnapshot.url).substr(15));

    this.api.reviewEndpoint.restoreFindingToPrevious(reviewId,finding).subscribe(()=>{
      this.loadReviewFindings()
    })
  }
  submitCheckedReview(review: ReviewDto) {
    review.status = 'completed'
    this.api.reviewEndpoint.completeReview(review).subscribe()
  }
}
