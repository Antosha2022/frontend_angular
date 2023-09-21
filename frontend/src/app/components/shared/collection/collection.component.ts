import {Component} from '@angular/core';
import {CollectionDto} from "../../../service/Api/DTO/collections.dto";
import {ApiService} from "../../../service/Api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {CollectionFormComponent} from "../collection-form/collection-form.component";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  dataSource: CollectionDto[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'description',
    'state',
    'actions'
  ];

  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) {
    this.loadCollections()
  }

  private loadCollections(): void {
    this.api.collectionEndpoint.getAllCollections().subscribe((result: CollectionDto[]) => {
      this.dataSource = result
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollectionFormComponent, {
      data: {}
    })
    dialogRef.afterClosed().subscribe((collection: CollectionDto) => {
      this.api.collectionEndpoint.createCollection(collection).subscribe((object: { id: number }) => {
        this.loadCollections()
      });
    })
  }

  openDialogEdit(collection: CollectionDto): void {
    const dialogRef = this.dialog.open(CollectionFormComponent, {
      data: collection
    })

    dialogRef.afterClosed().subscribe((collection: CollectionDto) => {
      this.api.collectionEndpoint.updateCollection(collection).subscribe(() => {
        this.loadCollections()
      });
    })
  }
  archive(collection: CollectionDto): void {
    this.api.collectionEndpoint.archiveCollection(collection).subscribe(() => {
      this.loadCollections()
    });
  }
  restore(collection: CollectionDto): void {
    this.api.collectionEndpoint.restoreCollection(collection).subscribe(() => {
      this.loadCollections()
    });
  }
}
