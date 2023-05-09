import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewpostComponent } from '../newpost/newpost.component';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  protected searchString: string = '';
  protected posts: Post[] = [];

  protected testPost: Post = {
    _id: 'id123',
    creator: 'Skapare skaparesson',
    title: 'Titel',
    content: 'blablablabla this is my post',
    date: new Date(),
    tag: 'TAG'
  };

  constructor(public newPostDialog: MatDialog) {
    this.posts = Array.from({ length: 20 }, () => this.testPost);
    this.posts.push({
      _id: 'idaefef123',
      creator: 'Skaaefaefpaaefaefre skaefaaefaefaefparesson',
      title: 'Taefaefaitel',
      content: 'blabefaeflablabla thiaefas isefaef my post',
      date: new Date(),
      tag: 'TAG'
    });
  }

  onSearchChange(searchString: string): void {
    this.searchString = searchString;
  }

  shouldDisplayPost(post: Post): boolean {
    if (
      post.title.includes(this.searchString) ||
      post.creator.includes(this.searchString) ||
      post.date.toDateString().includes(this.searchString) || //TODO Modifiera så det funkar
      post.tag.includes(this.searchString) ||
      post.content.includes(this.searchString)
    )
      return true;
    else return false;
  }

  newPost(): void {
    const dialog = this.newPostDialog.open(NewpostComponent, {
      width: '30%',
      data: { username: '', password: '' }
    });

    dialog.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
