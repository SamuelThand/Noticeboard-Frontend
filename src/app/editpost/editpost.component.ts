import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent {
  public dialog: MatDialogRef<EditpostComponent>;

  protected postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required])
  });

  constructor(dialog: MatDialogRef<EditpostComponent>) {
    this.dialog = dialog;
  }

  protected onSubmit(): void {
    if (this.postForm.valid) this.dialog.close(this.postForm.value);
  }

  protected onNoClick(): void {
    this.dialog.close();
  }

  setValues(title: string, content: string, tag: string): void {
    this.postForm.setValue({
      title: title,
      content: content,
      tag: tag
    });
  }
}
