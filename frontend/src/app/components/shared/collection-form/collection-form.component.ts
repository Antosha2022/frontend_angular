import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpeciesDatabaseDto} from "../../../service/Api/DTO/speciesdatabase.dto";
import {ApiService} from "../../../service/Api/api.service";
import {CollectionDto} from "../../../service/Api/DTO/collections.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent {
  dataSourceSpeciesDatabase: SpeciesDatabaseDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<CollectionFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: CollectionDto,
    private api: ApiService,
  ) {
    this.api.speciesDatabaseEndpoint.getAllDatabases().subscribe((result: SpeciesDatabaseDto[]) => {
      this.dataSourceSpeciesDatabase = result
    });
  }

  form = new FormGroup({
    species_database_id: new FormControl(this.data.species_database_id, [
      Validators.required,
    ]),
    name: new FormControl(this.data.name, [
      Validators.required,
    ]),
    location: new FormControl(this.data.location, [
      Validators.required,
    ]),
    description: new FormControl(this.data.description, [
      Validators.required,
    ]),
  })

  onSubmitted(): void {
    if (this.form.valid) {
      this.data.species_database_id = this.form.controls.species_database_id.value || 0
      this.data.name = this.form.controls.name.value || ''
      this.data.location = this.form.controls.location.value || ''
      this.data.description = this.form.controls.description.value || ''

      this.dialogRef.close(this.data)
    }
  }
}
