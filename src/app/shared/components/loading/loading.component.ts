import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']  // Nota que es style**s**Url en plural
})
export class LoadingComponent {
  private loading = inject(LoadingService);
  isLoading$ = this.loading.isloading$;

  constructor() {}
}