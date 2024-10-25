import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { MATERIAL_MODULES } from '../../shared/material/material.imports';
import { MediaMatcher } from '@angular/cdk/layout';
import { ItemMenuComponent } from '../../shared/components/item-menu/item-menu.component';
import { UserService } from '../../shared/services/users.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
  
    MATERIAL_MODULES,
    ItemMenuComponent,
    RouterLink,
    RouterModule,
  ],

  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
})
export default class PanelComponent {
  mobileQuery!: MediaQueryList;

  hideSidebar = signal(false);

  
  private _mobileQueryListener: () => void;
  constructor(private route:Router, private media:MediaMatcher, private ActivatedRoute:ActivatedRoute, public user:UserService, private changeDetectorRef:ChangeDetectorRef) {

  
  
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.listenRoute();
  }

  listenRoute(){
    this.route.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {

      this.hideSidebar.set(event.urlAfterRedirects.includes("/panel/instance/"));
      console.log(this.hideSidebar());
      
      // Verificar la ruta actual
     // this.showLogoutButton = !['/login', '/register'].includes(event.urlAfterRedirects);
    });
  }
  itemsMenu: any[] = [
    {
      name: 'Instancias',
      icon: 'apartment',
      children: [],
      route: '/panel/instances',
      isActive: false,
    },
    {
      name: 'Catalogos',
      icon: 'list_alt',
      children: [
        {
          name: 'Países',
          icon: 'public',
          route: '/panel/countries',
          isActive: false,
        },
        {
          name: 'Estatus',
          icon: 'checklist_rtl',
          route: '/panel/status',
          isActive: false,
        },
        // {name:'Países',Icon:'dashboard', route:"", isActive:false},
        // {name:'Países',Icon:'dashboard', route:"", isActive:false}
      ],
      route: null,
      isActive: false,
    },
  ];

  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  secondSideNav = computed(() => (this.collapsed() ? '0px' : '190px'));
  profilePicSize = computed(() => (this.collapsed() ? '60' : '110'));
}
