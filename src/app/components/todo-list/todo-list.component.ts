import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ToDo, TodoService } from 'src/app/services/todo.service';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  private subscription!: Subscription;
  public updated: boolean = true;

  todos: ToDo[] = [];

 
  private titleChangeSubject = new Subject<any>(); // Subject to emit title changes

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = [{id:0,title:'',completed:false,isEditing:false}]
    this.loadTodos();
    // Subscribe to the observable for new ToDo notifications
    this.subscription = this.todoService.todoAdded$.subscribe(() => {
      this.loadTodos();
    });
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((data) => (this.todos = data));
    console.log('TodoList', this.todos);
  }

  toggleCompletion(todo: ToDo): void {
    todo.completed = !todo.completed;
    this.updateTodo(todo);
  }

  updateTodo(todo: ToDo) {
    this.todoService.updateTodo(todo).subscribe(() => this.loadTodos());
    todo.isEditing = false;
  }



  deleteTodo(id: number): void {
    this.todoService.deleteTodoById(id).subscribe(() => this.loadTodos());
  }

  modify(todo: any) {
    this.todos.forEach((t) => (t.isEditing = false)); // Close any open inputs
    todo.isEditing = true; // Enable editing for the clicked todo
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up the subscription
    }
  }
}
