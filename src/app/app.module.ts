import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomSliderComponent } from './Components/custom-slider/custom-slider.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntInterceptor } from './user-profile/int.interceptor';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [AppComponent, CustomSliderComponent],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatProgressBarModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
