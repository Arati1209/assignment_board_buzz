
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addInfForm!: FormGroup;
  editId:any;
  submitted = false;
  infoList:any=[];
  flag=true;
  constructor(
    private router: Router,
    private datepipe:DatePipe,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.arr();

    this.addInfForm = this.fb.group({
      fname: new FormControl('',

        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      lname: new FormControl('',

        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ])
      ),
      company: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        Validators.compose([

          Validators.required,
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$'
          ),
        ])
      ),
      confirmPwd: new FormControl(''),

    })
  }

  validation_msg = {
    fname: [
      {
        type: 'required',
        message: 'First Name is required'
      },
      {
        type: 'pattern',
        message: 'First Name is string'
      }
    ],
  
    lname: [
      {
        type: 'required',
        message: 'Last Name is required'
      },
      {
        type: 'pattern',
        message: 'Last Name is string'
      }
    ],
    phone: [
      {
        type: 'maxlength',
        message: ' Contact Number should be 10 digit.',
      },
      {
        type: 'maxlength',
        message: ' Contact Number should be 10 digit.',
      },
      {
        type: 'pattern',
        message: 'Enter only number.',
      },
      {
        type: 'required',
        message: 'phone number  is required'
      },
    ],
    email: [
      {
        type: 'pattern',
        message: 'Email must be a valid email address',
      },
      {
        type: 'required',
        message: 'email number  is required'
      },
    ],
    gender: [
      {
        type: 'required',
        message: 'Gender is required'
      },
    ],
    company: [
      {
        type: 'required',
        message: 'Company Name is required'
      },
    ],
    dob: [
      {
        type: 'required',
        message: 'Date of birth is required '
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.',
      },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Password cannot be more than 16 characters long.',
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase,one special character, one lowercase, and one number.',
      },
    ],
    confirmPwd: [
      {
        type: 'required',
        message: 'Password is required.',
      },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Password cannot be more than 16 characters long.',
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase,one special character, one lowercase, and one number.',
      },
    ],
  }
  arr(){
    this.infoList=[
      {
          "firstname": "Akhil",
          "lastname": "Kumar",
          "email": "akhil@gmail.com	",
          "phone": 9959479459,
          "company": "BuzzBoard",
          "gender": "male",
          "birthdate": "1991-03-14",
          "password": "Abcd@123"
      },
      {
          "firstname": "Rahul",
          "lastname": "Dev",
          "email": "rahul@gmail.com",
          "phone": 8923193993,
          "company": "Infosys",
          "gender": "female",
          "birthdate": "1990-07-09",
          "password": "Pqrs@123"
      },
      {
        "firstname": "Sampath",
        "lastname": "Kumar",
        "email": "sam@gmail.com",
        "phone": 9703037744,
        "company": "Cognizant",
        "gender": "female",
        "birthdate": "1989-06-27",
        "password": "Xyz@1234"
    }
  ]
  }
  checkPassword(){
    if(this.addInfForm.value.password!=this.addInfForm.value.confirmPwd)
    {
      alert('password does not match')
    }

  }

  submit() {
    this.submitted=true;
   if(this.addInfForm.valid)
   {
       const dt = new Date(this.addInfForm.value.dob);
       const dob=this.datepipe.transform(dt,'yyyy-dd-MM')
      let data = {
        firstname: this.addInfForm.value.fname,
        lastname: this.addInfForm.value.lname,
        email: this.addInfForm.value.email,
        phone: this.addInfForm.value.phone,
        company: this.addInfForm.value.company,
        gender: this.addInfForm.value.gender,
        birthdate: this.addInfForm.value.dob,
        password: this.addInfForm.value.password,
         
      }
    
        this.infoList.push(data)
        this.addInfForm.reset();
        console.log('dag',this.infoList);
      

   }
   else{
    alert('Please enter required and valid data')
   }
  
  
  }
  edit(obj:any,i:any){
    console.log(i);
    this.flag=false;
    this.editId=i;
    this.addInfForm.controls['fname'].setValue(obj.firstname);
    this.addInfForm.controls['lname'].setValue(obj.lastname);
    this.addInfForm.controls['dob'].setValue(obj.birthdate);
    this.addInfForm.controls['email'].setValue(obj.email);
    this.addInfForm.controls['phone'].setValue(obj.phone);
    if(obj.gender=='female')
    this.addInfForm.controls['gender'].setValue('female');
    else
    this.addInfForm.controls['gender'].setValue('male');
    this.addInfForm.controls['company'].setValue(obj.company);
    this.addInfForm.controls['password'].setValue(obj.password);
    this.addInfForm.controls['confirmPwd'].setValue(obj.password);
 

  }
  delete(i:any){
    this.infoList.splice(i, 1);
    this.infoList;
  }
  update() {
    if(this.addInfForm.valid)
    {
        const dt = new Date(this.addInfForm.value.dob);
        const dob=this.datepipe.transform(dt,'yyyy-dd-MM')
       let data = {
         firstname: this.addInfForm.value.fname,
         lastname: this.addInfForm.value.lname,
         email: this.addInfForm.value.email,
         phone: this.addInfForm.value.phone,
         company: this.addInfForm.value.company,
         gender: this.addInfForm.value.gender,
         birthdate: this.addInfForm.value.dob,
         password: this.addInfForm.value.password,
          
       }
    this.infoList[this.editId]=data;
    this.cancel();
   
 }
 else{
  alert('Please enter required and valid data')
 }
  }
  cancel(){
  this.addUser();
  }
  addUser()
  {
    this.addInfForm.reset();
    this.flag=true;
  }

}
