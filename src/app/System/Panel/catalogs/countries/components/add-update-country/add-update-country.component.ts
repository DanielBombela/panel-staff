import { Component, Inject, OnInit } from '@angular/core';
import { MATERIAL_MODULES } from '../../../../../../shared/material/material.imports';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogsService } from '../../../services/catalogs.service';
import { LoadingService } from '../../../../../../shared/services/loading.service';
import { Country } from '../../../interfaces/country.interfaces';

@Component({
  selector: 'app-add-update-country',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule],
  templateUrl: './add-update-country.component.html',
  styleUrl: './add-update-country.component.scss',
})
export class AddUpdateCountryComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalog: CatalogsService,
    private loading: LoadingService,
    public dialogRef: MatDialogRef<AddUpdateCountryComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.pathcForm();
    }
  }

  pathcForm() {
    let Country: Country = this.data.Country;
    this.formGroup.patchValue({
      name: Country.name,
      code_country: Country.code_country,
      coin_country: Country.coin_country,
      symbol_country: Country.symbol_country,
      id: Country.id,
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      code_country: ['', [Validators.required]],
      coin_country: ['', [Validators.required]],
      symbol_country: ['', [Validators.required]],
      id: [''],
    });
  }
  public close(): void {
    this.dialogRef.close();
  }

  save() {
    if (!this.data.Country) {
      this.addCountry();
      return;
    }
    this.updateCountry();
  }
  updateCountry() {
    this.loading.show();
    this.catalog.updateCountry(this.formGroup.value).subscribe({
      next: (response: any) => {
        this.close(), this.loading.hide();
      },
      error: (e) => {
        this.loading.hide();
        // this.router.navigateByUrl("/panel/companies")
      },
    });
  }

  addCountry() {
    this.loading.show();
    this.catalog.addCountry(this.formGroup.value).subscribe({
      next: (response: any) => {
        this.close(), this.loading.hide();
      },
      error: (e) => {
        this.loading.hide();
        // this.router.navigateByUrl("/panel/companies")
      },
    });
  }
}
