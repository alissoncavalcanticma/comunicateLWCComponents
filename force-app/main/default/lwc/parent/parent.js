import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';
import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {

    eventName;
    eventName2;

    eventAge;

    handleButtonClicked2(event){
        this.eventName2 = 'Child Button Clicked: ' + event.detail;
    }

    handleButtonClicked(event){
        this.eventName = event.detail.nome;
        this.eventAge = event.detail.idade;
    }
}