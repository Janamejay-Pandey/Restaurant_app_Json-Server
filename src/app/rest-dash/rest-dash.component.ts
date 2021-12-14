import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-rest-dash',
  templateUrl: './rest-dash.component.html',
  styleUrls: ['./rest-dash.component.css']
})
export class RestDashComponent implements OnInit {

  formValue!: FormGroup
  //create object
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData:any

  showAdd!: boolean;
  showBtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
   this.getAllData();

  
     this.formValue.reset();
     this.showAdd = true;
     this.showBtn = false;
   
  }
// now subscribe the data which is maped via services

addRestaurant() {
  this.restaurantModelObj.name = this.formValue.value.name;
  this.restaurantModelObj.email = this.formValue.value.email;
  this.restaurantModelObj.mobile = this.formValue.value.mobile;
  this.restaurantModelObj.address = this.formValue.value.address;
  this.restaurantModelObj.services = this.formValue.value.services;

  this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
    console.log(res);
    alert("Restaurant record Added Successfully !!");
    this.formValue.reset();
    this.getAllData(); // for instance refresh page only
  },
  err=>{
    console.log(err);
    alert("record fail");
  }
  )
}

// get all data into a table 
getAllData() {
  this.api.getRestaurant().subscribe(res=>{
    this.allRestaurantData = res;
  })
}

//delete the data

deleleData(data:any) {
  this.api.deleteRestaurant(data.id).subscribe(res=>{
    alert("Record Deleted Successfully !");
    this.getAllData(); // for intance refresh
  })
}

// edit the data and upadte the value

onEditResto(data:any) {
  this.showAdd = false;
     this.showBtn = true;
  this.restaurantModelObj.id = data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
  

}
updateResto() {
  this.restaurantModelObj.name = this.formValue.value.name;
  this.restaurantModelObj.email = this.formValue.value.email;
  this.restaurantModelObj.mobile = this.formValue.value.mobile;
  this.restaurantModelObj.address = this.formValue.value.address;
  this.restaurantModelObj.services = this.formValue.value.services;
  
  this.api.putRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res=>{
     alert("Record Updated Successfully !!");
     this.getAllData();
  })
  
  this.formValue.reset();
}


}
