import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewpostComponent } from '../newpost/newpost.component';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  protected currentUser: User | null;
  #currentUserSubscription: Subscription | null;
  #backendService: BackendService;
  #authService: AuthService;
  public newPostDialog: MatDialog;
  #datePipe: DatePipe;
  protected searchString: string = '';
  protected posts: Post[] = [];

  constructor(
    backendService: BackendService,
    authService: AuthService,
    newPostDialog: MatDialog
  ) {
    this.#datePipe = new DatePipe('en-US');
    this.currentUser = null;
    this.#currentUserSubscription = null;
    this.#backendService = backendService;
    this.#authService = authService;
    this.newPostDialog = newPostDialog;
  }

  ngOnInit(): void {
    this.#backendService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.#currentUserSubscription =
      this.#authService.currentUserValue.subscribe(
        (user) => (this.currentUser = user)
      );
  }

  ngOnDestroy() {
    this.#currentUserSubscription?.unsubscribe();
  }

  protected onSearchChange(searchString: string): void {
    this.searchString = searchString;
  }

  protected shouldDisplayPost(post: Post): boolean {
    const formattedDate = this.#datePipe?.transform(
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

  protected newPost(): void {
    const dialog = this.newPostDialog.open(NewpostComponent, {
      width: '30%'
    });

    //TODO post stuff

    dialog.afterClosed().subscribe((result) => {
      this.#backendService
        .addPost(result)
        .subscribe((post) => console.log(post));
      // console.log(result);
      //TODO uppdatera postlistan
    });
  }
}
