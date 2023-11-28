namespace northwind;

entity Supplier {
  key SupplierID   : Integer;
      CompanyName  : String;
      ContactName  : String;
      ContactTitle : String;
      Address      : String;
      City         : String;
      Region       : String;
      PostalCode   : String;
      Country      : String;
      Phone        : String;
      Fax          : String;
      HomePage     : String;


}

entity Invoice {
  ShipName       : String;
  ShipAddress    : String;
  ShipCity       : String;
  ShipRegion     : String;
  ShipPostalCode : String;
  ShipCountry    : String;
  CustomerID     : String;
  CustomerName   : String;
  Address        : String;
  City           : String;
  Region         : String;
  PostalCode     : String;
  Country        : String;
  Salesperson    : String;
  OrderID        : Integer;
  OrderDate      : Date;
  RequiredDate   : Date;
  ShippedDate    : Date;
  ShipperName    : String;
  ProductID      : Integer;
  ProductName    : String;
  UnitPrice      : Decimal;
  Quantity       : Integer;
  Discount       : String;
  ExtendedPrice  : Decimal;
  Freight        : Decimal;


}
