import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardComponent } from './board/board.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardComponent,
    PostComponent,
    SearchComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
