import {Component, Inject} from '@angular/core';
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {FormGroup} from "@angular/forms";
import {ReviewFindingDto} from "../../../service/Api/DTO/review-finding.dto";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  dataSourceSpecies: SpeciesItemDto[] = [];
  originalSpecies?: SpeciesItemDto;
  untouchable = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
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
  confirmForm = new FormGroup({
  })
  addNewConfirm(): void {
    this.untouchable = true;
    if (this.confirmForm.valid) {
      this.dialogRef.close(this.data)
    }
  }
}
