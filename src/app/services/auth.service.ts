import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: Auth
  ) { }

  register(
    email: string, 
    username: string, 
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password,
    ).then(response => updateProfile(response.user, {displayName: username}));

    return from(promise);
  }


  login(
    email: string, 
    password: string
  ): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(() => {});

    return from(promise);
  }
}
