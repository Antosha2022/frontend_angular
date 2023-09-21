import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {Router} from "@angular/router";
import {UserSessionService} from "../../../service/Session/user-session.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {
 constructor(
   public dialogRef: MatDialogRef<ReviewFormComponent>,
   @Inject(MAT_DIALOG_DATA)
   public data: ReviewDto,
   private router: Router,
   private userSessionService: UserSessionService
 ) {
 }
  askReviewForm = new FormGroup({
    reviewer_email: new FormControl(this.data.reviewer_email, [
      Validators.required,
    ]),
    details: new FormControl(this.data.details, [
      Validators.required,
    ]),
  })

  onSubmitted(): void {
    if (this.askReviewForm.valid &&
      this.askReviewForm.controls.reviewer_email.value !== this.userSessionService.getUser()!.email ) {
      const routerStateSnapshot = this.router.routerState.snapshot;
      const visitTargetId = Number((routerStateSnapshot.url).substr(14));

      this.data.reviewer_email = this.askReviewForm.controls.reviewer_email.value || ''
      this.data.field_visit_id = visitTargetId
      this.data.details = this.askReviewForm.controls.details.value || ''

      this.dialogRef.close(this.data)
    }
  }
}
