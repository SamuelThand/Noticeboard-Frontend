import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent {
  public dialog: MatDialogRef<NewpostComponent>;

  protected postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required])
  });

  constructor(dialog: MatDialogRef<NewpostComponent>) {
    this.dialog = dialog;
  }

  protected onSubmit(): void {
    if (this.postForm.valid) this.dialog.close(this.postForm.value);
  }

  protected onNoClick(): void {
    this.dialog.close();
  }
}
