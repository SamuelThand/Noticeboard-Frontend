import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { EditpostComponent } from '../editpost/editpost.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  protected currentUser: User | null;
  #currentUserSubscription: Subscription | null;
  #authService: AuthService;
  #backendService: BackendService;
  #editPostDialog: MatDialog;
  #snackBar: MatSnackBar;
  @Output() postEvent = new EventEmitter<void>();

  constructor(
    authService: AuthService,
    backendService: BackendService,
    editPostDialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    this.currentUser = null;
    this.#currentUserSubscription = null;
    this.#authService = authService;
    this.#backendService = backendService;
    this.#editPostDialog = editPostDialog;
    this.#snackBar = snackBar;
  }

  ngOnInit(): void {
    this.#currentUserSubscription =
      this.#authService.currentUserValue.subscribe(
        (user) => (this.currentUser = user)
      );
  }

  ngOnDestroy() {
    this.#currentUserSubscription?.unsubscribe();
  }

  getUserName(obj: any): string {
    return obj.userName;
  }

  getCreatorID(obj: any): string {
    return obj._id;
  }

  /**
   * Fields of the post inputted from the ngFor directive in board component
   */
  @Input() post: Post = {
    _id: '',
    creator: '',
    title: '',
    content: '',
    date: new Date(),
    likes: [],
    hates: [],
    lastEdited: new Date(),
    tag: ''
  };

  /**
   * Open a new editpost component to edit the post, emit the result if
   * an edit is made successfully.
   */
  protected editPost(): void {
    const dialog = this.#editPostDialog.open(EditpostComponent, {
      width: '30%'
    });

    dialog.componentInstance.setValues(
      this.post.title,
      this.post.content,
      this.post.tag
    );

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.#backendService.editPost(this.post._id, result).subscribe(() => {
          this.postEvent.emit();
        });
      }
    });
  }

  protected likePost(): void {
    this.#backendService.likePost(this.post._id).subscribe(() => {
      this.postEvent.emit();
    });
  }

  protected hatePost(): void {
    this.#backendService.hatePost(this.post._id).subscribe(() => {
      this.postEvent.emit();
    });
  }

  protected deletePost() {
    const dialog = this.#snackBar.open(
      'You are about to delete post: ' +
        this.post.title +
        '. Are you sure you want to continue?',
      'Yes',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    );

    dialog.onAction().subscribe(() => {
      this.#backendService.deletePost(this.post._id).subscribe(() => {
        this.postEvent.emit();
      });
    });
  }
}
