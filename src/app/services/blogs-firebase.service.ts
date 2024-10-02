import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BlogPost } from '../interfaces/blogPosts.interace';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsFirebaseService {

  constructor(
    public firestore: Firestore
    ) { }
    
    blogPostsCollection = collection(this.firestore, 'blogPosts')

    getBlogPosts(): Observable<BlogPost[]> {
      return collectionData(this.blogPostsCollection, {
        idField: 'id',
      }) as Observable<BlogPost[]>;
    }
}
