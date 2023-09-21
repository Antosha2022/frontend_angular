import {Component} from '@angular/core';
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {ApiService} from "../../../service/Api/api.service";
import {UserSessionService} from "../../../service/Session/user-session.service";
import {ReviewFindingDto} from "../../../service/Api/DTO/review-finding.dto";
import {ConfirmDeleteReviewComponent} from "../confirm-delete-review/confirm-delete-review.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent {
  dataReview: ReviewDto[] = [];
  currentUserId = 0;
  untouchable = false
  displayedColumns: string[] = [
    'id',
    'requester_id',
    'reviewer_id',
    'field_visit_id',
    'details',
    'status',
    'version',
    'actions'
  ];
  constructor(
    private api: ApiService,
    private userSessionService: UserSessionService,
    private router: Router,
    public dialog: MatDialog
  ){
    this.loadReviewList()
    this.currentUserId = Number(this.userSessionService.getUser()?.id)
  }

  private loadReviewList(): void {
    this.api.reviewEndpoint.getAllReviews().subscribe((result: ReviewDto[]) => {
      this.dataReview = result
    })
  }
  rejectTargetReview(review: ReviewDto) {
    review.status = 'rejected';
    this.api.reviewEndpoint.rejectReview(review).subscribe();
    this.loadReviewList()
  }
  openConfirmDeleteTargetReview(review:ReviewDto): void {
    this.untouchable = true
    const dialogRef = this.dialog.open(ConfirmDeleteReviewComponent, {
      data: review
    })
    dialogRef.afterClosed().subscribe((finding: ReviewFindingDto) => {
      this.loadReviewList();
    })
  }
  archiveReview(review:ReviewDto) {
    // review.status = 'archived';
    // this.loadReviewList();
  }

  restoreReview(review:ReviewDto){
    // review.status = 'restored'
    // this.loadReviewList();
  }

}
