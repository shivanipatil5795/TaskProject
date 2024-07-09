import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegiComponent } from './regi/regi.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Task3Component } from './task3/task3.component';
import { EmailOTPComponent } from './email-otp/email-otp.component';

@NgModule({
  declarations: [
    AppComponent,
    RegiComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    Task3Component,
    EmailOTPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
