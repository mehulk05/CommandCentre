import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modules/authentication/models/user';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MenuService } from '../../services/sidebar-menu.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  currentUserInfo!: User;
  menus: any = [];
  activeMenuIndex: number = 0;
  currentPagePath = '/';
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSideBar();
  }

  getSideBar() {
    this.menus = [
      {
        id: 1,
        displayName: 'My Profile',
        groupMenu: null,
        position: 1,
        items: []
      },
      {
        id: 2,
        displayName: 'Website',
        groupMenu: null,
        position: 1,
        items: []
      },
      {
        id: 3,
        displayName: 'Baecamp',
        groupMenu: null,
        position: 1,
        items: [],
        url: 'https://3.basecamp.com/'
      },
      {
        id: 4,
        displayName: 'Unbounce',
        groupMenu: null,
        position: 1,
        items: [],
        url: 'https://unbounce.com/'
      },
      {
        id: 5,
        displayName: 'Zapier',
        groupMenu: null,
        position: 1,
        items: [],
        url: 'https://zapier.com/app/zaps'
      },
      {
        id: 6,
        displayName: 'Zenoti',
        groupMenu: null,
        position: 1,
        items: [],
        url: 'https://docs.zenoti.com/'
      },
      {
        id: 7,
        displayName: 'Close CRM',
        groupMenu: null,
        position: 1,
        items: [],
        url: 'https://close.com/'
      },
      {
        id: 8,
        displayName: 'Sync data',
        groupMenu: null,
        position: 1,
        items: [],
        routerLink: '/leads/sync'
      }
    ];
  }

  menuOperation() {
    this.menus.sort((a: any, b: any) => {
      return a.position - b.position;
    });

    for (let i = 0; i < this.menus.length; i++) {
      this.sortMenu(this.menus[i]);
    }
    this.menus = this.menus.filter((menu: any) => menu.groupMenu == null);
    console.log(this.menus);
  }

  sortMenu(menu: any) {
    if (menu.menuType == 'Group') {
      menu.items.sort((a: any, b: any) => {
        return a.position - b.position;
      });
    }

    if (menu.items != null && menu.items.length > 0) {
      for (let i = 0; i < menu.items.length; i++) {
        this.sortMenu(menu.items[i]);
      }
    }
  }

  activeMenu(menuIndex: number) {
    this.activeMenuIndex = menuIndex;
  }

  logout() {
    this.localStorageService.clearStorage();
    this.authService.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
