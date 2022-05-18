import { LightningElement, wire } from 'lwc';

import {subscribe, MessageContext} from 'lightning/messageService';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';

import {getFieldValue} from 'lightning/uiRecordApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import PRODUCT_CODE_FIELD from '@salesforce/schema/Product2.ProductCode';
import FAMILY_FIELD from '@salesforce/schema/Product2.Family';
//import MSRP_FIELD from '@salesforce/schema/Product2.MSRP__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';

import { NavigationMixin } from 'lightning/navigation';

export default class ProductCard extends NavigationMixin(LightningElement) {

    familyField = FAMILY_FIELD;
    //msrpField = MSRP_FIELD;
    productCodeField = PRODUCT_CODE_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    
    recordId;
    productName;

    @wire(MessageContext) messageContext;
    
    handleRecordLoaded(event){
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.productName = getFieldValue(recordData, NAME_FIELD);
    }

    handleProductSelected(productId){
        this.recordId = productId;
    }

    productSelectionSubscription;

    connectedCallback(){
        this.productSelectionSubscription = subscribe(
            this.messageContext,
            PRODUCT_SELECTED_MESSAGE,
            (message) => this.handleProductSelected(message.productId)
        );
    }

    handleNavigateToRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attibutes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                action: 'view'
            }
        });
    }

}