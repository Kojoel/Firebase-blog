import { Injectable } from '@angular/core';
import { BlogPost } from '../interfaces/blogPosts.interace';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditModalService {
  editModalVisible: boolean = false;
  postData: BlogPost | undefined;

  constructor(
    private router: Router,
  ) { }

  getPostData(post: BlogPost) {
    // this.toggleEditPost();
    this.postData = post;
    this.router.navigateByUrl('/edit');
  }

  // toggleEditPost() {
  //   this.editModalVisible = !this.editModalVisible;
  //   // console.log("its working o", this.postData);
  // }
}
