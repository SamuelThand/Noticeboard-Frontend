import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent {
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required])
  });

  constructor(
    public dialog: MatDialogRef<NewpostComponent>,
    private backendService: BackendService
  ) {}

  onSubmit(): void {
    if (this.postForm.valid) this.dialog.close(this.postForm.value);
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
