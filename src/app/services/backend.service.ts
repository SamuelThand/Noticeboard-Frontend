import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // #url: string = 'http://localhost:3000/';
  #url: string = 'http://127.0.0.1:3000/';
  private http: HttpClient;
  private postEndpoint = this.#url + 'posts/';
  private userEndpoint = this.#url + 'users/';

  constructor(http: HttpClient) {
    this.http = http;
  }

  isLoggedIn(): Observable<HttpResponse<Object>> {
    return this.http.get(this.userEndpoint + 'isloggedin', {
      observe: 'response',
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  signIn(username: string, password: string) {
    return this.http.post<User>(
      this.userEndpoint + 'signin',
      {
        username: username,
        password: password
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
  }

  signOut(): Observable<any> {
    return this.http.get(this.userEndpoint + 'signout', {
      withCredentials: true
    });
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.userEndpoint + 'signup', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postEndpoint);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postEndpoint, post, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  editPost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(this.postEndpoint + id, post, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(this.postEndpoint + id, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }
}
