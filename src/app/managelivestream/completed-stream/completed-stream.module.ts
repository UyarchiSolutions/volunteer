import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletestreamComponent } from './completestream/completestream.component';
import { CompletestreamRoutingModule } from './completestream-routing.module';



@NgModule({
  declarations: [
    CompletestreamComponent,
  ],
  imports: [
    CommonModule,
    CompletestreamRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CompletedStreamModule { }
