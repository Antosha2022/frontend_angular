import {Component, OnInit} from '@angular/core';
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit{

  private reviewId?: number = 0;
  public review?: ReviewDto = undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ApiService,
  ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.reviewId = params['reviewId'];
        this.api.reviewEndpoint.getOneReview(this.reviewId!).subscribe((review:ReviewDto)=>{
          this.review = review
        })
    })
  }
}
