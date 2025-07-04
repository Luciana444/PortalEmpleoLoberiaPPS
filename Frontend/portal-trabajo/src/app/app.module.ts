import { BrowserAnimationsModule,provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
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
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}