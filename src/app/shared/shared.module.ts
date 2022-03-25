import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteWarningComponent } from './reusableComponents/delete-warning/delete-warning.component';

@NgModule({
  declarations: [SideBarComponent, DeleteWarningComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [SideBarComponent],
  providers: [ApiService, LocalStorageService]
})
export class SharedModule {}
