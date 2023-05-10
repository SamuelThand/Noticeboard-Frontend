import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
  private currentUserSubscription: Subscription | null;

  constructor(private authService: AuthService) {
    this.currentUser = null;
    this.currentUserSubscription = null;
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUserValue.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnDestroy() {
    this.currentUserSubscription?.unsubscribe();
  }

  @Input() post: Post = {
    _id: '',
    creator: '',
    title: '',
    content: '',
    date: new Date(),
    tag: ''
  };
}
