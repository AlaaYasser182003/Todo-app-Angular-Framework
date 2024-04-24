import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestdataService } from './services/testdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public userService:TestdataService,
    private router:Router){}
  ngOnInit(): void {
    this.userService.userData = JSON.parse(localStorage.getItem('userData')||'{}')
    
  }
  logout() {
    localStorage.removeItem('userData')
    this.userService.userData={}
    this.router.navigate(['/login'])
  }
 }
