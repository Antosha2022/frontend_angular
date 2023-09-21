import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {FindingDto} from "../DTO/finding.dto";

export class FindingsEndpoint {
  constructor(private http: HttpClient, private apiUrl: string) {}

  getAllFindings(collectionId: number, visitId: number): Observable<FindingDto[]> {
    return this.http.get<FindingDto[]>(this.apiUrl + '/collections/' + collectionId + '/field-visits/' + visitId + '/findings',
      {withCredentials: true})
      .pipe();
  }
  getOneFinding(collectionId: number, visitId: number, findingId: number): Observable<FindingDto>{
    return this.http.get<FindingDto>
    (this.apiUrl + '/collections/' + collectionId + '/field-visits/' + visitId + '/findings/'+ findingId,
      {withCredentials: true})
      .pipe();
  }
  getOneFindingVersion(collectionId: number, visitId: number,findingId: number, version: number): Observable<FindingDto>{
    return this.http.get<FindingDto>
    (this.apiUrl + '/collections/' + collectionId + '/field-visits/' + visitId + '/findings/'+ findingId +'?version='+ version,
      {withCredentials: true})
      .pipe();
  }

  createFinding(collectionId: number, visitId: number, finding: FindingDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(
      this.apiUrl + '/collections/'+ collectionId+'/field-visits/'+ visitId +'/findings', finding,
      {withCredentials: true}).pipe();
  }
  updateFinding(collectionId: number, finding: FindingDto) {
    return this.http.put<object>(
      this.apiUrl + '/collections/'+ collectionId+'/field-visits/'+ finding.field_visit_id+'/findings/'+finding.id, finding,
      {withCredentials: true}).pipe();
  }
  deleteFinding(collectionId: number, finding: FindingDto): Observable<object> {
    return this.http.delete<object>(
      this.apiUrl + '/collections/'+ collectionId+'/field-visits/'+ finding.field_visit_id+'/findings/'+finding.id).pipe();
  }
}
