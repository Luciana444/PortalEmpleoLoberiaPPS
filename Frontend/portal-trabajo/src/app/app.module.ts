import { BrowserAnimationsModule,provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 15000,
      closeButton: true,
      progressBar: true,
    }),
    AppComponent
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule { }