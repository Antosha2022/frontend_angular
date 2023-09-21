import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";

@Component({
  selector: 'app-species-search-form',
  templateUrl: './species-search-form.component.html',
  styleUrls: ['./species-search-form.component.scss']
})
export class SpeciesSearchFormComponent {
  constructor(
    public dialogRef: MatDialogRef<SpeciesSearchFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: SpeciesItemDto
  ) {
  }
  searchForm = new FormGroup({
    id: new FormControl(this.data.id, [
      // Validators.required,
    ]),
  })

  newSearch(): void {
    if (this.searchForm.valid) {
      this.data.id = this.searchForm.controls.id.value || 0
      this.dialogRef.close(this.data)
    }
  }
  speciesSelectedEvent($event: number) {
    this.data.id = $event
  }


}
