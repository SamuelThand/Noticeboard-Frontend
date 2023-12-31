import { Component, OnDestroy, OnInit } from '@angular/core';
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
  #newPostDialog: MatDialog;
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
    this.#newPostDialog = newPostDialog;
  }

  ngOnInit(): void {
    this.#getPosts();
    this.#currentUserSubscription =
      this.#authService.currentUserValue.subscribe(
        (user) => (this.currentUser = user)
      );
  }

  ngOnDestroy() {
    this.#currentUserSubscription?.unsubscribe();
  }

  #getPosts() {
    this.#backendService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  protected onSearchChange(searchString: string): void {
    this.searchString = searchString;
  }

  protected onPostEvent(): void {
    this.#getPosts();
  }

  /**
   * Check if a post should be displayed based on the current search string
   *
   * @param post
   * @returns The post should be displayed
   */
  protected shouldDisplayPost(post: Post): boolean {
    const formattedDate = this.#datePipe?.transform(
      post.date ?? '',
      'yyyy-MM-dd, hh:mm'
    );
    const includesDate = formattedDate?.includes(this.searchString) ?? false;

    return (
      post.title.includes(this.searchString) ||
      this.getPostUsername(post).includes(this.searchString) ||
      post.tag.includes(this.searchString) ||
      post.content.includes(this.searchString) ||
      includesDate
    );
  }

  protected newPost(): void {
    const dialog = this.#newPostDialog.open(NewpostComponent, {
      width: '30%'
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.#backendService.addPost(result).subscribe(() => {
          this.#backendService.getPosts().subscribe((posts: Post[]) => {
            this.posts = posts;
          });
        });
      }
    });
  }

  getPostUsername(post: any): string {
    return post.creator.userName;
  }
}
