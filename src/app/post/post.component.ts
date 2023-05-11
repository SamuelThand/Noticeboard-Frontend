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

  @Output() postDeleted = new EventEmitter<void>(); // Add this line

  constructor(authService: AuthService, backendService: BackendService) {
    this.currentUser = null;
    this.#currentUserSubscription = null;
    this.#authService = authService;
    this.#backendService = backendService;
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

  @Input() post: Post = {
    _id: '',
    creator: '',
    title: '',
    content: '',
    date: new Date(),
    tag: ''
  };

  protected deletePost() {
    this.#backendService.deletePost(this.post._id).subscribe(() => {
      this.postDeleted.emit();
    });
  }
}
