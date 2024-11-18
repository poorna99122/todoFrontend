import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },  // Welcome component (default route)
  { path: 'todo', component: TodoMainComponent }, // TodoMain component
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
