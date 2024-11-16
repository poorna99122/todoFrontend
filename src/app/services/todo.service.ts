import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  isEditing ?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoAddedSource = new Subject<void>();
  todoAdded$ = this.todoAddedSource.asObservable();
  private apiUrl = '/api/todos';

  constructor(private http: HttpClient) {}

   // Method to emit the event
   notifyTodoAdded() {
    this.todoAddedSource.next();
  }

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching todos', error);
        return throwError(error); // rethrow the error or handle it as needed
      })
    );
  }

  createTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, todo);
  }

  updateTodo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodoById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
