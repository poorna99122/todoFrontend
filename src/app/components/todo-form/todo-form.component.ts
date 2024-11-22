import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToDo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  public todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false],
    });
  }

  addTodo(): void {
    this.spinnerService.show();

    if (this.todoForm?.valid) {
      const newTodo: ToDo = {
        id: 0,
        title: this.todoForm.value.title,
        completed: this.todoForm.value.completed,
      };
      this.todoService.createTodo(newTodo).subscribe(
        (data) => {
          this.spinnerService.hide();
          this.todoService.notifyTodoAdded(); // Notify that a new ToDo is added
          this.todoForm?.reset(); // Reset form after submission
        },
        (error) => {
          this.spinnerService.hide();
          console.error('Error fetching todos:', error);
        }
      );
    }
  }
}
