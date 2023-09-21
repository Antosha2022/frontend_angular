import {Injectable} from '@angular/core';
import {UserEndpoint} from "./Endpoint/user.endpoint";
import {HttpClient} from "@angular/common/http";
import {SpeciesDatabaseEndpoint} from "./Endpoint/species-database.endpoint";
import {CollectionEndpoint} from "./Endpoint/collections.endpoint";
import {VisitEndpoint} from "./Endpoint/visit.endpoint";
import {FindingsEndpoint} from "./Endpoint/findings.endpoint";
import {ReviewEndpoint} from "./Endpoint/review.endpoint";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = 'http://backend.species-collector.test/api/v1' // TODO: Later we inject this by ENV vars setting

  public userEndpoint: UserEndpoint;
  public speciesDatabaseEndpoint: SpeciesDatabaseEndpoint;
  public collectionEndpoint: CollectionEndpoint;
  public visitEndpoint: VisitEndpoint;
  public findingsEndpoint: FindingsEndpoint;
  public reviewEndpoint: ReviewEndpoint;

  constructor(http: HttpClient) {
    this.userEndpoint = new UserEndpoint(http, this.apiBaseUrl)
    this.speciesDatabaseEndpoint = new SpeciesDatabaseEndpoint(http, this.apiBaseUrl)
    this.collectionEndpoint = new CollectionEndpoint(http, this.apiBaseUrl)
    this.visitEndpoint = new VisitEndpoint(http, this.apiBaseUrl)
    this.findingsEndpoint = new FindingsEndpoint(http, this.apiBaseUrl)
    this.reviewEndpoint = new ReviewEndpoint(http, this.apiBaseUrl)
  }
}
