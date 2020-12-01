import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Model, IModel } from "./Model";

@Injectable({ providedIn: "root" })
export class AppService {
  private posts: Model[] = [];
  private postsUpdated = new Subject<Model[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    this.postsUpdated.next(this.posts.slice());
  }

  addPosts(data: IModel) {
    this.posts.push(data);
    this.postsUpdated.next(this.posts.slice());
  }

  deletePost(id: number) {
    this.posts.splice(id, 1);
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
    this.postsUpdated.next(this.posts.slice());
  }
}
