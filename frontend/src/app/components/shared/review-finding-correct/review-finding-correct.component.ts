import {Component, Inject} from '@angular/core';
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewFindingDto} from "../../../service/Api/DTO/review-finding.dto";

@Component({
  selector: 'app-review-finding-correct',
  templateUrl: './review-finding-correct.component.html',
  styleUrls: ['./review-finding-correct.component.scss']
})
export class ReviewFindingCorrectComponent {
  dataSourceSpecies: SpeciesItemDto[] = [];
  originalSpecies?: SpeciesItemDto;
  // finding?: ReviewFindingDto;

  constructor(
    public dialogRef: MatDialogRef<ReviewFindingCorrectComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ReviewFindingDto,
    private api: ApiService,
  ) {
    this.api.speciesDatabaseEndpoint.getAllSpecies().subscribe((result: SpeciesItemDto[]) => {
      this.dataSourceSpecies = result
    })

    const  originalSpeciesId = Number(this.data.species_id)
    this.api.speciesDatabaseEndpoint.getOneSpecies(originalSpeciesId).subscribe((species:SpeciesItemDto)=>{
      this.originalSpecies = species;
    });
  }

  commentForm = new FormGroup({

    species_id: new FormControl(this.data.species_id, [
      Validators.required,
    ]),
    sex: new FormControl(this.data.sex, [
      Validators.required,
    ]),
    comment: new FormControl(this.data.comment, [
      Validators.required,
    ]),
  })

  addNewComment(): void {
    if (this.commentForm.valid) {
      this.data.species_id = this.commentForm.controls.species_id.value || 1
      this.data.sex = this.commentForm.controls.sex.value || ''
      this.data.comment = this.commentForm.controls.comment.value!

      this.dialogRef.close(this.data)
    }
  }
  speciesSelectedEvent($event: number) {
    if($event !==0 ) {
     this.data.species_id = $event
    }
  }
}
