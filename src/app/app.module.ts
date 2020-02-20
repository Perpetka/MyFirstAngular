import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DieComponent } from './die.component';
import { DieCollectionComponent } from './die-collection.component';

import { OrangeAreaComponent } from './game/orange-area.component';
import {PurpleAreaComponent} from './game/purple-area.component';
import {YellowAreaComponent} from './game/yellow-area.component';
import {GreenAreaComponent} from './game/green-area.component';
import { ValueFieldComponent } from './game/value-field.component';
import { ExactFieldComponent } from './game/exact-field.component';
import { GameComponent } from "./game/game.component";
import { DieProviderComponent } from "./die-provider.component";
import { DiceTrayComponent } from "./game/dice-tray.component";

import {BonusComponent} from './game/bonus.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, DieComponent, DieCollectionComponent, OrangeAreaComponent, PurpleAreaComponent, 
  YellowAreaComponent, GreenAreaComponent,
  ExactFieldComponent, ValueFieldComponent , GameComponent, DieProviderComponent, BonusComponent, DiceTrayComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
