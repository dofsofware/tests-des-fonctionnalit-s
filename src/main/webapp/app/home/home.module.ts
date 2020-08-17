import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WanterreSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  imports: [WanterreSharedModule, RouterModule.forChild([HOME_ROUTE]), CheckboxModule, InputSwitchModule, TabViewModule],
  declarations: [HomeComponent],
})
export class WanterreHomeModule {}
