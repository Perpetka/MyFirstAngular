import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DieComponent } from './die.component';
import { DieCollectionComponent } from './die-collection.component';

import { OrangeAreaComponent } from './game/orange-area.component';
import { ValueFieldComponent } from './game/value-field.component';
import { GameComponent } from "./game/game.component";
import { DieProviderComponent } from "./die-provider.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, DieComponent, DieCollectionComponent, OrangeAreaComponent, ValueFieldComponent , GameComponent, DieProviderComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
