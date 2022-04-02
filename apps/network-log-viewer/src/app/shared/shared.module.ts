import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordViewerComponent } from './components/record-viewer/record-viewer.component';
import { DataViewerComponent } from './components/data-viewer/data-viewer.component';



@NgModule({
  declarations: [
    RecordViewerComponent,
    DataViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecordViewerComponent,
    DataViewerComponent
  ]
})
export class SharedModule { }
