import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Message } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  @Input() visible: boolean;
  public participantes:[] = [];

  constructor(
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.participantes = JSON.parse(localStorage.getItem('participantes')) !== null ? JSON.parse(localStorage.getItem('participantes')): '';
    console.log(this.participantes)
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  
}
