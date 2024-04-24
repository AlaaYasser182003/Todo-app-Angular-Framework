import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/users';
import { TestdataService } from 'src/app/services/testdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup=new FormGroup({})
  users:user[]=[]
  submited:boolean=false
  constructor(private fb:FormBuilder,
    private ser:TestdataService,
    private router:Router,
) {

  }
  
  ngOnInit(): void {
   this.ser.getUsers().subscribe((res:any)=> {
      this.users=res
      console.log(this.users)
    })
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  submit() {
  this.submited=true
  let formValue = this.loginForm.value
  if(this.loginForm.valid) {
    this.ser.getTasks(formValue.username,formValue.password).subscribe((res) => {
      let selectedUser  = this.users.find(item=>item.username==formValue.username)
      this.ser.userData= {
        ...selectedUser,
        password:formValue.password
      }
      // this.loginForm.value

      localStorage.setItem('userData',JSON.stringify(this.ser.userData))
      this.ser.todos=res
      this.router.navigate(['/todos'])
      console.log(res)
    },err => {
      alert(err?.error?.message)
    })
  }
  }
}
