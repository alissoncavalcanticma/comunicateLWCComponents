import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {

    _product;
    pictureUrl;
    name;

    @api
    get product(){
        return this._product;
    }
    set product(value){
        this._product = value;
        this.pictureUrl = value.Picture_URL__c;
        this.name = value.Name;
    }

    handleClick(){
        const selectedEvent = new CustomEvent('selected', {
            detail: this.productId
        });
        this.dispatchEvent(selectedEvent);
    }
}