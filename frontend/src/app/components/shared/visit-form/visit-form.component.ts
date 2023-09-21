import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {ActivatedRoute, Router } from "@angular/router";
import {VisitDto} from "../../../service/Api/DTO/visit.dto";

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.scss']
})
export class VisitFormComponent {
  constructor(
    public dialogRef: MatDialogRef<VisitFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: VisitDto,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  visitForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
    ]),
    location: new FormControl(this.data.location, [
      Validators.required,
    ]),
    date: new FormControl(this.data.date, [
      Validators.required,
    ]),
    description: new FormControl(this.data.description, [
      Validators.required,
    ])
  })

  addNewVisit(): void {
    if (this.visitForm.valid)
    {
      this.data.name = this.visitForm.controls.name.value || ''
      this.data.location = this.visitForm.controls.location.value || ''
      this.data.date = this.visitForm.controls.date.value
      this.data.description = this.visitForm.controls.description.value || ''
      this.dialogRef.close(this.data);
    }
  }
}
