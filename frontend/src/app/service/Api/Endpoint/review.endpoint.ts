import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewDto} from "../DTO/review.dto";
import {ReviewFindingDto} from "../DTO/review-finding.dto";

export class ReviewEndpoint {
  constructor(private http: HttpClient, private apiUrl: string) {}

  // Review Resource
  getAllReviews() {
    return this.http.get<ReviewDto[]>(this.apiUrl + '/reviews', {withCredentials: true}).pipe();
  }
  getOneReview(reviewId:number){
    return this.http.get<ReviewDto>(this.apiUrl + '/reviews/'+ reviewId, {withCredentials: true}).pipe();
  }
  createReview(review: ReviewDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl + '/reviews', review,{withCredentials: true}).pipe();
  }
  rejectReview(review: ReviewDto) {
    return this.http.patch<object>(this.apiUrl + '/reviews/'+ review.id, review, {withCredentials: true}).pipe();
  }
  deleteReview(reviewId: number) {
    return this.http.delete<object>(this.apiUrl + '/reviews/'+ reviewId).pipe();
  }

  //Review Finding Resource
  getAllFindings(reviewId: number){
  return this.http.get<ReviewFindingDto[]>(this.apiUrl + '/reviews/'+ reviewId +'/findings', {withCredentials: true}).pipe();
  }
  correctReviewFinding(reviewId: number,finding: ReviewFindingDto) {
    const findingId = Number(finding.id);
    return this.http.patch<object>(this.apiUrl + '/reviews/'+ reviewId +'/findings/' + findingId, finding, {withCredentials: true}).pipe();
  }
  approveReviewFinding(reviewId: number, finding: ReviewFindingDto){
    const findingId = Number(finding.id);
    return this.http.patch<object>(this.apiUrl + '/reviews/'+ reviewId +'/findings/' + findingId, {"approve": true},{withCredentials: true}).pipe();
  }
  restoreFindingToPrevious(reviewId: number,finding: ReviewFindingDto): Observable<object> {
    const findingId = Number(finding.id);
    return this.http.delete<object>(this.apiUrl + '/reviews/'+ reviewId +'/findings/' + findingId).pipe();
  }
  completeReview(review: ReviewDto) {
    const reviewId = Number(review.id)
    return this.http.patch<object>(this.apiUrl + '/reviews/'+ reviewId, review, {withCredentials: true}).pipe();
  }
}
