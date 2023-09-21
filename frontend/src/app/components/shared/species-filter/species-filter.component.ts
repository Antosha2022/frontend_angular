import {Component, OnInit, forwardRef, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe, NgClass} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ApiService} from "../../../service/Api/api.service";
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-species-filter',
  templateUrl: './species-filter.component.html',
  styleUrls: ['./species-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpeciesFilterComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatListModule,
    NgClass,
  ],
})
export class SpeciesFilterComponent implements OnInit, ControlValueAccessor {
  @Output() selectedEvent = new EventEmitter<number>;

  private onChange(value: string) {
  };

  onTouched = () => {
  };
  myControl = new FormControl('');
  latinFilter: string[] = [];
  trivialFilter: string[] = [];
  unionFilter: string[] = [];
  selectedSpeciesId: number = 0;
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private api: ApiService
  ) {
    this.api.speciesDatabaseEndpoint.getAllSpecies().subscribe((resultLatin: SpeciesItemDto[]) => {
      const latin = 'latin_name';
      const latinArray = resultLatin.map(e => e[latin]);
      this.latinFilter = latinArray;
      const trivial = 'trivial_name';
      const trivialArray = resultLatin.map(e => e[trivial]);
      this.trivialFilter = trivialArray;

      this.unionFilter = latinArray.concat(trivialArray);
    });
  }

  writeValue(latinTrivialName: string): void {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.unionFilter.filter(option => option.toLowerCase().includes(filterValue));
  }

  registerOnChange(fn: (latinTrivialName: string) => void): void {
    this.onChange = fn;
    let selectedSpecies = this.myControl.value;

    for (const elem of this.latinFilter) {
      if (elem === selectedSpecies) {
        this.selectedSpeciesId = this.latinFilter.indexOf(elem) + 1;
      }
    }

    for (const elem of this.trivialFilter) {
      if (elem === selectedSpecies) {
        this.selectedSpeciesId = this.trivialFilter.indexOf(elem) + 1;
      }
    }
    this.selectedEvent.emit(this.selectedSpeciesId)
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  dropListShow(){
    this.ngOnInit()
  }
}
