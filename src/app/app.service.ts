import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Model, IModel } from "./Model";

@Injectable({ providedIn: "root" })
export class AppService {
  private posts: Model[] = [];
  public postsUpdated = new Subject<Model[]>();

  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }

  getPosts() {
    this.postsUpdated.next(this.posts.slice());
  }
  setLocalStorage(){
    localStorage.setItem('data', JSON.stringify(this.posts))
  }
  getLocalStorage(){
    this.posts=JSON.parse(localStorage.getItem('data'));
    this.postsUpdated.next(this.posts.slice());
  }
  addPosts(data: IModel) {
    this.posts.push(data);
    this.setLocalStorage()    
    this.postsUpdated.next(this.posts.slice());
  }

  deletePost(id: number) {
    this.posts.splice(id, 1);
    this.setLocalStorage();
    this.postsUpdated.next(this.posts.slice());
  }

  getPost(id: number) {
    return { ...this.posts[id] };
  }
  updatePost(id: number, data: IModel) {
    for (let i = 0; i < this.posts.length; i++) {
      if (id == i) {
        this.posts[i] = data;
      }
    }
    this.setLocalStorage()
    this.postsUpdated.next(this.posts.slice());
  }
}
