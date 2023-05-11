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

  @Output() postDeleted = new EventEmitter<void>(); // Add this line

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
    tag: ''
  };

  protected editPost(): void {
    const dialog = this.#editPostDialog.open(EditpostComponent, {
      width: '30%'
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        //TODO edita post med put route
        //TODO refresha posts
        // this.#backendService.addPost(result).subscribe(() => {
        // this.#backendService.getPosts().subscribe((posts: Post[]) => {
        // this.posts = posts;
        // });
        // });
      }
    });
  }

  protected deletePost() {
    this.#backendService.deletePost(this.post._id).subscribe(() => {
      console.log('delete');
      this.postDeleted.emit();
    });
  }
}
