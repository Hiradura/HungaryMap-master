import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<firebase.User | null>(null);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.loggedUserSubject.next(user);
    });
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.loggedUserSubject.asObservable();
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  updateUserProfile(profileData: { displayName?: string }): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        return user.updateProfile({ 
          displayName: profileData.displayName ?? null 
        }).then(() => {
          this.loggedUserSubject.next({ ...user, displayName: profileData.displayName ?? null });
        });
      } else {
        return Promise.reject('Nincs bejelentkezett felhasználó.');
      }
    });
  }
}
