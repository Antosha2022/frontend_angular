import {Component, OnInit} from '@angular/core';
import {VisitDetailDto} from "../../../service/Api/DTO/visit-detail.dto";
import {Router} from "@angular/router";
import {ApiService} from "../../../service/Api/api.service";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.scss']
})
export class VisitDetailComponent implements OnInit{

  public visitId?: number;
  public collectionId?: number;
  public field_visit?: VisitDetailDto = undefined;
  last_version?: number;
  printDisable = true;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.visitId = Number(this.router.routerState.snapshot.url.split('/')[4])

      this.api.visitEndpoint.getOneVisit(this.collectionId, this.visitId).subscribe((field_visit: VisitDetailDto) => {
        this.field_visit = field_visit;

        // check if attached finding and get last version by first element array of findings
        this.api.findingsEndpoint.getAllFindings(this.collectionId!,this.visitId!).subscribe((findings: FindingDto[])=>{
          this.last_version = findings[0].version
          this.printDisable = false;
        })
    });
  }
}
