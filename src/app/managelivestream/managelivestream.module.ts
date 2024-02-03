import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagelivestreamComponent } from './managelivestream/managelivestream.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Managelivestraemroutingmodule } from './managelivestream-routing.module';
import { SetTimeComponent } from './set-time/set-time.component';
import { AssignHostComponent } from './assign-host/assign-host.component';
import { FormatTimePipe, GolivestreamComponent } from './golivestream/golivestream.component';
import { StreamchatComponent } from './streamchat/streamchat.component';
import { ProductlistshowComponent } from './productlistshow/productlistshow.component';
import { ProductdetailviewComponent } from './productdetailview/productdetailview.component';
import { CompletedStreamModule } from './completed-stream/completed-stream.module';
import { PendingChangesGuard } from './can-deactivate.guard';
import { ViewStreamComponent } from './view-stream/view-stream.component';
import { GolivestreamComponentMobile } from './golivestream-mobile/golivestream.component';
import { StreamchatComponentMobile } from './streamchat-mobile/streamchat.component';
import { ProductlistshowComponentMobile } from './productlistshow-mobile/productlistshow.component';



@NgModule({
  declarations: [
    ManagelivestreamComponent,
    SetTimeComponent,
    AssignHostComponent,
    GolivestreamComponent,
    StreamchatComponent,
    ProductlistshowComponent,
    FormatTimePipe,
    ProductdetailviewComponent,
    ViewStreamComponent,
    GolivestreamComponentMobile,
    StreamchatComponentMobile,
    ProductlistshowComponentMobile

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    Managelivestraemroutingmodule,

  ],
  providers: [PendingChangesGuard]
})
export class ManagelivestreamModule { }
