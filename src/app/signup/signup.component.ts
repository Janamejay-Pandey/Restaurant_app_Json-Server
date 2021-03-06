import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup

  constructor(private _formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:['']
    })
  }

  SignupFunction(){
    this.http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
      alert("Sign Up Successfully !!")
      this.signupForm.reset();
      this.router.navigate(['login'])
      console.log(res)
    },
    err=>{
      alert("kuch to galat h ")
    }
    )
  }

}
