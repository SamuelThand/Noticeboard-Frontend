import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  #url: string = 'http://localhost:3000/';
  #http: HttpClient;
  #postEndpoint = this.#url + 'posts/';
  #userEndpoint = this.#url + 'users/';

  constructor(http: HttpClient) {
    this.#http = http;
  }

  /**
   * Check if there is an active session
   *
   * @returns The logged in user
   */
  public isLoggedIn(): Observable<HttpResponse<Object>> {
    return this.#http.get(this.#userEndpoint + 'isloggedin', {
      observe: 'response',
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  /**
   * Log in
   *
   * @param username
   * @param password
   * @returns The logged in user
   */
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

  /**
   * Log out
   *
   * @returns Status message
   */
  public signOut(): Observable<any> {
    return this.#http.get(this.#userEndpoint + 'signout', {
      withCredentials: true
    });
  }

  /**
   * Register a user
   *
   * @param user
   * @returns The new user
   */
  public signUp(user: User): Observable<User> {
    return this.#http.post<User>(this.#userEndpoint + 'signup', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Get all posts
   *
   * @returns Posts
   */
  public getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(this.#postEndpoint);
  }

  /**
   * Create a post
   *
   * @returns The new post
   */
  public addPost(post: Post): Observable<Post> {
    return this.#http.post<Post>(this.#postEndpoint, post, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  /**
   * Edit a post
   *
   * @returns The edited post
   */
  public editPost(id: string, post: Post): Observable<Post> {
    return this.#http.put<Post>(this.#postEndpoint + id, post, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }

  /**
   * Like a post
   *
   * @returns The liked post
   */
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

  /**
   * Hate a post
   *
   * @returns The hated post
   */
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

  /**
   * Delete a post
   *
   * @param id The post id
   * @returns The deleted post
   */
  public deletePost(id: string): Observable<Post> {
    return this.#http.delete<Post>(this.#postEndpoint + id, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
  }
}
