import { AssignHostComponent } from './assign-host/assign-host.component';
import { SetTimeComponent } from './set-time/set-time.component';
import { ManagelivestreamComponent } from './managelivestream/managelivestream.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GolivestreamComponent } from './golivestream/golivestream.component';
import { ViewStreamComponent } from './view-stream/view-stream.component';



const routes: Routes = [
  {
    path: '', children: [
      { path: "", component: ViewStreamComponent, pathMatch: "full" },
      // { path: "settime", component: SetTimeComponent, pathMatch: "full" },
      // { path: "assignhost", component: AssignHostComponent, pathMatch: "full" },
      // { path: "golive", component: GolivestreamComponent, },
      // { path: "completed", loadChildren: () => import("./completed-stream/completed-stream.module").then((m) => m.CompletedStreamModule) },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managelivestraemroutingmodule { }
