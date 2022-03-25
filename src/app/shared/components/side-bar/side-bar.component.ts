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
    this.authService.currentUserSubject.subscribe((data: any) => {
      this.currentUserInfo = data;

      this.getSideBar();
    });
    this.activatedRoute.url.subscribe((data) => {
      console.log(data);
    });
    this.currentPagePath = window.location.pathname;
    console.log(this.router.url, window.location.pathname);
  }

  getSideBar() {
    this.menus = this.localStorageService.readStorage('sidebarData') ?? [];
    if (this.menus.length > 0) {
      this.menuOperation();
    } else {
      this.menuService
        .getUserMenus(this.currentUserInfo.id, this.currentUserInfo.roles)
        .then((res) => {
          this.menus = res;
          this.menuOperation();
          this.localStorageService.storeItem('sidebarData', res);
        });
    }
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
