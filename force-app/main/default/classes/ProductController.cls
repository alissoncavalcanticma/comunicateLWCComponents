public with sharing class ProductController{

    @AuraEnabled
    public String searchKey {get; set;}

    @AuraEnabled(Cacheable=true)
    public static List<Product2> getProducts(String searchkey){
        String key = '';
        String whereClause = '';
        if(searchkey != null){
            if(!String.isEmpty(searchkey)){
                key = '%' + searchKey + '%';
                whereClause = 'WHERE name LIKE :key';
            }
        }
        return Database.query(
            'Select id, ProductCode, Family, Name, ' +
            'Picture_URL__c, Description From Product2 ' +
            whereClause +
            ' WITH SECURITY_ENFORCED ORDER BY Name'
        );
    }
}
