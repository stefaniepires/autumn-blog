import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ErrorHandler } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {routes} from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      { provide: ErrorHandler },
      provideRouter(routes, withHashLocation()),
      provideAnimations(),
      provideHttpClient(),
      provideNativeDateAdapter(),
    ],
  }).catch(console.error);
