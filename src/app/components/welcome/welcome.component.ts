import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

  constructor(private router : Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getStarted(){
    this.router.navigate(['/todo']);
  }

}
