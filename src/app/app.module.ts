import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppLoadService } from './services/app-load.service';
import { AppRoutingModule } from './app-routing.module';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewpostComponent } from './newpost/newpost.component';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { EditpostComponent } from './editpost/editpost.component';

export function initApp(appLoadService: AppLoadService) {
  return () => appLoadService.initApp();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardComponent,
    PostComponent,
    SearchComponent,
    NewpostComponent,
    EditpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    AppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppLoadService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
