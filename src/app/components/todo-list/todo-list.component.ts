import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToDo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  private subscription!: Subscription;

  todos: ToDo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
      // Subscribe to the observable for new ToDo notifications
      this.subscription = this.todoService.todoAdded$.subscribe(() => {
        this.loadTodos();
      });
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => this.todos = data);
    console.log("TodoList",this.todos)
  }

  toggleCompletion(todo: ToDo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodoById(id).subscribe(() => this.loadTodos());
  }

}
