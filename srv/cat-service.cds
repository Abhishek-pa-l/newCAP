using northwind as my from '../db/data-model';

service CatalogService {
    entity Suppliers as projection on my.Supplier;
    entity Invoices as projection on my.Invoice;

}
