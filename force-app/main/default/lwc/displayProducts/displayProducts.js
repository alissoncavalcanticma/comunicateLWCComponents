import { LightningElement, wire } from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';

import { publish, messageContext, MessageContext } from 'lightning/messageService';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';

export default class DisplayProducts extends LightningElement {
    
    searchKey = '';

    @wire(getProducts, {searchKey: '$searchKey'})
    products;

    handleSearchKeyChange(event){
        this.searchKey = event.target.value.toLowerCase();
    }

    @wire(MessageContext) messageContext;

    handleProductSelected(event){
        publish(this.messageContext, PRODUCT_SELECTED_MESSAGE, {
            productId: event.detail
        });
    }

}