import { Injectable, signal } from '@angular/core';
import { BlogPost } from '../interfaces/blogPosts.interace';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  blogPostSig = signal<BlogPost[]>([]);

  constructor() { }

  createPost(content: string): void {
    const newPost: BlogPost = {
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      userid: '',
      id: '',
    };
    this.blogPostSig.update((blogPosts) => [...blogPosts, newPost]);
  }


}
