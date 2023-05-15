import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // #url: string = 'http://localhost:3000/'; //TODO development URL
  // #url: string = 'http://127.0.0.1:3000/';
  // #url: string = 'https://localhost:8443/'; //TODO production HTTPS URL
  #url: string = 'https://10.55.102.33:8443/'; //TODO production HTTPS URL
  #http: HttpClient;
  #postEndpoint = this.#url + 'posts/';
  #userEndpoint = this.#url + 'users/';

  constructor(http: HttpClient) {
    this.#http = http;
  }

  public isLoggedIn(): Observable<HttpResponse<Object>> {
    return this.#http.get(this.#userEndpoint + 'isloggedin', {
      observe: 'response',
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  public signIn(username: string, password: string): Observable<any> {
    return this.#http.post<User>(
      this.#userEndpoint + 'signin',
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

  public signOut(): Observable<any> {
    return this.#http.get(this.#userEndpoint + 'signout', {
      withCredentials: true
    });
  }

  public signUp(user: User): Observable<User> {
    return this.#http.post<User>(this.#userEndpoint + 'signup', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(this.#postEndpoint);
  }

  public addPost(post: Post): Observable<Post> {
    return this.#http.post<Post>(this.#postEndpoint, post, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  public editPost(id: string, post: Post): Observable<Post> {
    return this.#http.put<Post>(this.#postEndpoint + id, post, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  public likePost(id: string): Observable<Post> {
    return this.#http.put<Post>(
      this.#postEndpoint + 'like/' + id,
      {},
      {
        headers: { 'content-type': 'application/json' },
        withCredentials: true
      }
    );
  }

  public hatePost(id: string): Observable<Post> {
    return this.#http.put<Post>(
      this.#postEndpoint + 'hate/' + id,
      {},
      {
        headers: { 'content-type': 'application/json' },
        withCredentials: true
      }
    );
  }

  public deletePost(id: string): Observable<Post> {
    return this.#http.delete<Post>(this.#postEndpoint + id, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }
}
