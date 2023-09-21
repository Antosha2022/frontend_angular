import {Component} from '@angular/core';
import {CollectionDto} from "../../../service/Api/DTO/collections.dto";
import {ApiService} from "../../../service/Api/api.service";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dataSourceCollection: CollectionDto[] = [];
  dataSourceReview: ReviewDto[] = [];
  currentUserID?: number;

  constructor(private api: ApiService) {
    this.loadVisibleCollections();
    this.loadReviewList();
  }

  private loadVisibleCollections(): void {
    this.api.collectionEndpoint.getAllCollections().subscribe((result: CollectionDto[]) => {
      this.dataSourceCollection = result
      this.currentUserID = result[0]?.user_id

      for (const elem of result) {
        if (elem.field_visits[0] === undefined || elem.state === 'archived') {
          elem.collectionIsVisible = false
        } else {
          elem.collectionIsVisible = true
        }
      }
    })
  }

  private loadReviewList(): void {
    this.api.reviewEndpoint.getAllReviews().subscribe((result: ReviewDto[]) => {
      this.dataSourceReview = result
    })
  }

  rejectAskReview(review: ReviewDto) {
    review.status = 'rejected';
    this.api.reviewEndpoint.rejectReview(review).subscribe();
  }
}
