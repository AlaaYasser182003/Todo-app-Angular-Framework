import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class TestdataService {
  
api='http://localhost:4000/'
userData:any
todos:any[]=[]
constructor(    private http:HttpClient) {

}

getUsers() {
  return this.http.get(`${this.api}users`)
}
getTasks(username:string,password:string) {
  let fromValue = btoa(`${username}:${password}`)
  let headers = new HttpHeaders({
      Authorization:`Basic ${fromValue}`
  })
  return this.http.get<user[]>(`${this.api}todos`,{
    headers
  })
}
addTask(body:any) {
  let fromValue = btoa(`${this.userData?.username}:${this.userData?.password}`)
  let headers = new HttpHeaders({
      Authorization:`Basic ${fromValue}`
  })
  return this.http.post(`${this.api}todos`,body,{
    headers
  })
}
deleteTask(id:string) {
  let fromValue = btoa(`${this.userData?.username}:${this.userData?.password}`)
  let headers = new HttpHeaders({
      Authorization:`Basic ${fromValue}`
  })
  return this.http.delete(`${this.api}todos/${id}`,{
    headers
  })
}
editTask(id:string,completed=false) {
  let fromValue = btoa(`${this.userData?.username}:${this.userData?.password}`)
  let headers = new HttpHeaders({
      Authorization:`Basic ${fromValue}`
  })
  return this.http.put(`${this.api}todos/${id}`,{
    completed
  },{
    headers
  })
}




}