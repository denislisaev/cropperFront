import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../materials/snackBar.service";
import {Observable, Subscription} from "rxjs";
import {CropService} from "../../services/crop.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../models/User";
import {Crop} from "../../models/Crop";
import {UserService} from "../../services/user.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  form!: FormGroup
  aSub!: Subscription
  crops!: Crop[]
  cropsOnPage!: Crop[]
  cropSub!: Subscription

  selectedCrop!: Crop
  cropLength!: number
  cropPageSize!: number
  cropPageIndex!: number


  users!: User[]
  usersOnPage!: User[]
  userSub!: Subscription

  selectedUser!: User
  userLength!: number
  userPageSize!: number
  userPageIndex!: number


  constructor(private cropService : CropService, private userService : UserService, private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
    if (this.cropSub){
      this.cropSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.cropPageSize = 5
    this.userPageSize = 5
    this.userSub = this.userService.getUsers().subscribe((users)=>{
      this.users = users
      this.userLength = users.length
      if (this.users.length > 0){
        if (this.users.length >= this.cropPageSize){
          this.usersOnPage = this.users.slice(0, this.userPageSize);
        } else {
          this.usersOnPage = this.users.slice(0, this.userLength);
        }
      }
    })
    this.form = new FormGroup({
      cropName: new FormControl(null, [Validators.required]),
    })
    this.cropSub = this.cropService.getCrops().subscribe((crops)=>{
      this.crops = crops
      this.cropLength = crops.length
      if (this.crops.length > 0){
        if (this.crops.length >= this.cropPageSize){
          this.cropsOnPage = this.crops.slice(0, this.cropPageSize);
        } else {
          this.cropsOnPage = this.crops.slice(0, this.cropLength);
        }
      }
    })
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.cropService.createCrop(this.form.value.cropName).subscribe(
      ()=>{
        SnackBarService.showMessage(this.snackBar, "Культура добавлена")
        this.form.enable()
        this.cropSub.unsubscribe()
        this.cropSub = this.cropService.getCrops().subscribe((crops)=>{
          this.crops = crops
          this.cropLength = crops.length
          if (this.crops.length > 0){
            if (this.crops.length >= this.cropPageSize){
              this.cropsOnPage = this.crops.slice(this.cropPageIndex*this.cropPageSize, this.cropPageIndex*this.cropPageSize + this.cropPageSize);
            } else {
              this.cropsOnPage = this.crops.slice(this.cropPageIndex*this.cropPageSize, this.cropLength);
            }
          }
        })
      },
      error => {
        SnackBarService.showMessage(this.snackBar, error?.message)
        for (let key in error) {
          SnackBarService.showMessage(this.snackBar, error[key])
        }
        this.form.enable()
      }
    )
  }

  deleteCrop(){
    this.cropService.delete(this.selectedCrop.id).subscribe(()=>{
      this.cropSub.unsubscribe()
      this.cropSub = this.cropService.getCrops().subscribe((crops)=>{
        this.crops = crops
        this.cropLength = crops.length
        if (this.crops.length > 0){
          if (this.crops.length >= this.cropPageSize){
            this.cropsOnPage = this.crops.slice(this.cropPageIndex*this.cropPageSize, this.cropPageIndex*this.cropPageSize + this.cropPageSize);
          } else {
            this.cropsOnPage = this.crops.slice(this.cropPageIndex*this.cropPageSize, this.cropLength);
          }
        }
        SnackBarService.showMessage(this.snackBar, "Культура удалена!")
      }, error => {
        SnackBarService.showMessage(this.snackBar, error?.message)
        for (let key in error) {
          SnackBarService.showMessage(this.snackBar, error[key])
        }
      })
    })
  }

  deleteUser(){
    console.log("0")
    this.userService.deleteUserByUsername(this.selectedUser.username).subscribe(()=>{
      console.log("1")
      this.userSub.unsubscribe()
      console.log("2")
      this.userSub = this.userService.getUsers().subscribe((users)=>{
        console.log("3")
        this.users = users
        this.userLength = users.length
        if (this.users.length > 0){
          if (this.users.length >= this.userPageSize){
            console.log(this.usersOnPage)
            this.usersOnPage = this.users.slice(this.userPageIndex*this.userPageSize, this.userPageIndex*this.userPageSize + this.userPageSize);
          } else {
            this.usersOnPage = this.users.slice(this.userPageIndex*this.userPageSize, this.userLength);
            console.log(this.usersOnPage)
          }
        }
        SnackBarService.showMessage(this.snackBar, "Пользователь удален!")
      })
    }, error => {
      SnackBarService.showMessage(this.snackBar, error?.message)
      for (let key in error) {
        SnackBarService.showMessage(this.snackBar, error[key])
      }
    })
  }

  onCropPaginateChange(event: PageEvent) {
    this.cropPageIndex = event.pageIndex
    if (this.crops.length > event.pageIndex*event.pageSize){
      if (this.crops.length >= event.pageIndex*event.pageSize + event.pageSize){
        this.cropsOnPage = this.crops.slice(event.pageIndex*event.pageSize, event.pageIndex*event.pageSize + event.pageSize);
      } else {
        this.cropsOnPage = this.crops.slice(event.pageIndex*event.pageSize, event.length);
      }
    }
  }

  onUserPaginateChange(event: PageEvent) {
    this.userPageIndex = event.pageIndex
    if (this.users.length > event.pageIndex*event.pageSize){
      if (this.users.length >= event.pageIndex*event.pageSize + event.pageSize){
        this.usersOnPage = this.users.slice(event.pageIndex*event.pageSize, event.pageIndex*event.pageSize + event.pageSize);
      } else {
        this.usersOnPage = this.users.slice(event.pageIndex*event.pageSize, event.length);
      }
    }
  }

  selectCrop(crop: Crop){
    this.selectedCrop = crop
  }

  selectUser(user: User){
    this.selectedUser = user
  }

}
