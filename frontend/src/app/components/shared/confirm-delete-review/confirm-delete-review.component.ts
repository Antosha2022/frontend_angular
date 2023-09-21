import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {FormGroup} from "@angular/forms";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";

@Component({
  selector: 'app-confirm-delete-review',
  templateUrl: './confirm-delete-review.component.html',
  styleUrls: ['./confirm-delete-review.component.scss']
})
export class ConfirmDeleteReviewComponent {
  reviewId = 0;
  untouchable = false
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteReviewComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ReviewDto,
    private api: ApiService,
  ) {
    this.api.reviewEndpoint.getOneReview(data.id).subscribe((review:ReviewDto)=>{
    })
  }

  confirmForm = new FormGroup({
  })
  confirmDeleteReview(id: number): void {
    this.untouchable = true
    this.api.reviewEndpoint.deleteReview(this.data.id).subscribe(()=>{
      this.dialogRef.close(this.data)
    });
  }
}
