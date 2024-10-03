import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BlogPost, Comments, Users } from '../interfaces/blogPosts.interace';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsFirebaseService {

  constructor(
    public firestore: Firestore
    ) { }
    
    blogPostsCollection = collection(this.firestore, 'blogPosts')
    commentsCollection = collection(this.firestore, 'comments')
    usersCollection = collection(this.firestore, 'users')

    getBlogPosts(): Observable<BlogPost[]> {
      return collectionData(this.blogPostsCollection, {
        idField: 'id',
      }) as Observable<BlogPost[]>;
    }

    getComments(): Observable<Comments[]> {
      return collectionData(this.commentsCollection, {
        idField: 'id',
      }) as Observable<Comments[]>;
    }

    getUsers(): Observable<Users[]> {
      return collectionData(this.usersCollection, {
        idField: 'id',
      }) as Observable<Users[]>;
    }


    
}
