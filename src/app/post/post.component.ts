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

  @Output() postEvent = new EventEmitter<void>(); // Add this line

  constructor(
    authService: AuthService,
    backendService: BackendService,
    editPostDialog: MatDialog
  ) {
    this.currentUser = null;
    this.#currentUserSubscription = null;
    this.#authService = authService;
    this.#backendService = backendService;
    this.#editPostDialog = editPostDialog;
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

  protected editPost(): void {
    const dialog = this.#editPostDialog.open(EditpostComponent, {
      width: '30%'
    });

    // TODO: find a better way to do this.
    // This is a workaround to set the values of the form when editing a post.
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

  // TODO: Only allow logged in users to like or hate posts
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
    this.#backendService.deletePost(this.post._id).subscribe(() => {
      this.postEvent.emit();
    });
  }
}
