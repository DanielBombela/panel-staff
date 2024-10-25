import { Component, input, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MATERIAL_MODULES } from '../../material/material.imports';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {
  displayedColumns = input.required<string[]>();
  data = input.required<any[]>();
  dataSource = new MatTableDataSource<any>();
private readonly _sort = viewChild.required<MatSort>(MatSort);
private readonly _matPaginator = viewChild.required<MatPaginator>(MatPaginator);
  ngOnInit(): void {
      this.dataSource.data = this.data();
      this.dataSource.sort = this._sort();
      this.dataSource.paginator = this._matPaginator();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
