import {Component, OnInit} from '@angular/core';
import {CollectionDetailDto} from "../../../service/Api/DTO/collection-detail.dto";
import {ApiService} from "../../../service/Api/api.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit {

  private collectionId?: number;
  public collection?: CollectionDetailDto = undefined;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
      this.api.collectionEndpoint.getCollectionDetail(this.collectionId).subscribe((collection: CollectionDetailDto) => {
        this.collection = collection
      })
  }
}
