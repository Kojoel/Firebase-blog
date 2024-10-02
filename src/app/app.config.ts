import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLHynCcBmKp81qzAn3VKznP6OMe-3KWZs",
  authDomain: "angular-firebase-blog-ap-332e4.firebaseapp.com",
  projectId: "angular-firebase-blog-ap-332e4",
  storageBucket: "angular-firebase-blog-ap-332e4.appspot.com",
  messagingSenderId: "1098101046907",
  appId: "1:1098101046907:web:6715a44d5cf2d155042cde",
  measurementId: "G-0Y5S8QQPRS"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // importProvidersFrom([
    // ]),
  ]
};
