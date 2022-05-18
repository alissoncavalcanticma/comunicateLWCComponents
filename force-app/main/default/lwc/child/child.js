import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';
import { LightningElement } from 'lwc';

export default class Child extends LightningElement {

    handleClick(){

        let evt = new CustomEvent("clicked", {
            detail: {
                nome: "Alisson C.",
                idade: "3200"
            }
        })

        this.dispatchEvent(evt);
    }
}