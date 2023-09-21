import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-finding-form',
  templateUrl: './finding-form.component.html',
  styleUrls: ['./finding-form.component.scss'],

})
export class FindingFormComponent {
  constructor(
    public dialogRef: MatDialogRef<FindingFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: FindingDto
  ) {
  }

  findingForm = new FormGroup({
    number: new FormControl(this.data.number, [
      Validators.required,
    ]),
    location_latitude: new FormControl(this.data.location_latitude, [
      Validators.required,
    ]),
    location_longitude: new FormControl(this.data.location_longitude, [
      Validators.required,
    ]),
    location_altitude: new FormControl(this.data.location_altitude, [
      Validators.required,
    ]),
    species_id: new FormControl(this.data.species_id, [
      // Validators.required,
    ]),
    sex: new FormControl(this.data.sex, [
      Validators.required,
    ]),
    details: new FormControl(this.data.details, [
      Validators.required,
    ]),
  })

  addNewFinding(): void {
    if (this.findingForm.valid) {
      this.data.number = this.findingForm.controls.number.value!
      this.data.location_latitude = this.findingForm.controls.location_latitude.value || 0
      this.data.location_longitude = this.findingForm.controls.location_longitude.value || 0
      this.data.location_altitude = this.findingForm.controls.location_altitude.value || 0
      this.data.species_id = this.findingForm.controls.species_id.value || 0
      this.data.sex = this.findingForm.controls.sex.value || ''
      this.data.details = this.findingForm.controls.details.value!

      this.dialogRef.close(this.data)
    }
  }

  speciesSelectedEvent($event: number) {
    this.data.species_id = $event
  }
}
