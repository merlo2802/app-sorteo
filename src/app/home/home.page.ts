import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  variations: any[] = [];
  participantes: any[] = [];
  disabled : boolean = false;
  visible:boolean = false;
  constructor(
    private data: DataService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
  ) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.participantes
  }

  async addNew() {
    const alert = await this.alertController.create({
      header: 'Registra participante',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre Participante'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data && data.nombre) {
              this.participantes.push(data);
              this.visible = false;
              localStorage.setItem('participante', JSON.stringify(this.participantes))
              console.log('=>"', this.participantes);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async delete(data) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Participantes',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          console.log(this.participantes.indexOf(data));
          this.participantes.splice(this.participantes.indexOf(data), 1);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  public sortear(){
    var min = 2;
    var max = this.participantes.length+1;
  
    this.participantes.forEach(x => {
      var existe = false;
      do {
        const aleatorio = Math.floor(Math.random()*(max-min+1)+min);
        existe = this.participantes.find(x => x.numero === aleatorio) ? true : false;
        if(!existe){  
          let bandera = false;
          // if(x.nombre === 'Paola') {
          //   bandera = true;
          //   x.numero = 3;
          // } 
          // if(x.nombre === 'Derly'){
          //   bandera = true;
          //   x.numero = 7;
          // } 
          // if(x.nombre === 'Evelyn') {
          //   bandera = true;
          //   x.numero = 2;
          // } 
          // if(x.nombre === 'Rudy') {
          //   bandera = true;
          //   x.numero = 4;
          // }
          if(!bandera){
            x.numero = aleatorio;
          }
        }
      } while (existe);
    });
    this.visible=true;
  }

  public reset () {
    this.variations= [];
    this.participantes= [];
    this.visible = false;
  }
 


  

}
