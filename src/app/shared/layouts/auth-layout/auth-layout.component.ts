import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = "linear-gradient(to top, #83ADB0, #446366)"
  }

}
