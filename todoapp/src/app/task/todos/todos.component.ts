import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestdataService } from 'src/app/services/testdata.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  displayedColumns: string[] = ['id', 'task', 'completed', 'operations'];
  showDeleteModal=-1
  addTaskInput:FormControl=new FormControl('',Validators.required)
  submited=false
  showAddTaskModal=-1
  showEditTaskModal=-1
  constructor(public ser:TestdataService,
    private router:Router){}
/*


*/ 
  ngOnInit(): void {

    this.getTasks()
  }
  addTask() {
    this.submited=true
    if(this.addTaskInput.valid) {
      this.ser.addTask({
        completed:false,
        task:this.addTaskInput.value,  
        user_id:   this.ser.userData?.id
      }).subscribe(res=> {
        this.getTasks(true)
        this.showAddTaskModal=-1
      },err=> {
        console.log(err)
      })
    }

  }
  getTasks(getAfterDelete=false) {
    if((this.ser?.userData?.username&&!this.ser.todos.length) || getAfterDelete) {
      this.ser.getTasks(this.ser?.userData?.username,this.ser?.userData?.password).subscribe((res) => {
        this.ser.todos=res
      },err => {
        alert(err?.error?.message)
      })
    } 
  }
  deleteTask(id:any) {
    this.ser.deleteTask(id).subscribe(res=> {
      this.showDeleteModal=-1
      this.getTasks(true)
    })
  }
  completChange(event:any,id:any) {
    this.ser.editTask(id,event).subscribe(res=>{
      alert('Done')
    })
  }
  editTask(id:any){
    this.ser.editTask(id).subscribe(res=>{
      this.showEditTaskModal
    })
  }
}
