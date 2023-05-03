import { Component } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  protected posts: Post[] = [];

  protected testPost: Post = {
    _id: 'id123',
    creator: 'Skapare skaparesson',
    title: 'Titel',
    content: 'blablablabla this is my post',
    date: new Date(),
    tag: 'TAG'
  };

  constructor() {
    this.posts = Array.from({ length: 20 }, () => this.testPost);
  }
}
