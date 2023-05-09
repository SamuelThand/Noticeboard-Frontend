import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewpostComponent } from '../newpost/newpost.component';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private backendService: BackendService;
  private datePipe: DatePipe;
  protected searchString: string = '';
  protected posts: Post[] = [];

  constructor(backendService: BackendService, public newPostDialog: MatDialog) {
    this.datePipe = new DatePipe('en-US');
    this.backendService = backendService;
  }

  ngOnInit(): void {
    this.backendService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onSearchChange(searchString: string): void {
    this.searchString = searchString;
  }

  shouldDisplayPost(post: Post): boolean {
    const formattedDate = this.datePipe?.transform(
      post.date ?? '',
      'yyyy-MM-dd, hh:mm'
    );
    const includesDate = formattedDate?.includes(this.searchString) ?? false;

    return (
      post.title.includes(this.searchString) ||
      post.creator.includes(this.searchString) ||
      post.tag.includes(this.searchString) ||
      post.content.includes(this.searchString) ||
      includesDate
    );
  }

  newPost(): void {
    const dialog = this.newPostDialog.open(NewpostComponent, {
      width: '30%'
    });

    //TODO post stuff

    dialog.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
