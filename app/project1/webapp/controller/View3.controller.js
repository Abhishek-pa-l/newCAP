sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment,MessageToast) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.View3", {
            onInit: function () {

            },
            onAddPress: function () {

                if (!this._oCreateProductDialog) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "com.sap.project1.view.fragment.Invoice",
                        controller: this
                    }).then(oDialog => {
                        this._oCreateProductDialog = oDialog
                        this.getView().addDependent(oDialog)
                        oDialog.open()
                    })
                } else {
                    this._oCreateProductDialog.open()
                }


            },
            confirmOrder: function () {
                debugger;
                let oModel = this.getOwnerComponent().getModel();
            
                // Shipping Information
                let oShipName = this.getView().byId("ShipName").getValue();
                let oShipAddress = this.getView().byId("ShipAddress").getValue();
                let oShipCity = this.getView().byId("ShipCity").getValue();
                let oShipRegion = this.getView().byId("ShipRegion").getValue();
                let oShipPostalCode = this.getView().byId("ShipPostalCode").getValue();
                let oShipCountry = this.getView().byId("ShipCountry").getValue();
            
                // Customer Information
                let oCustomerID = this.getView().byId("CustomerID").getValue();
                let oCustomerName = this.getView().byId("CustomerName").getValue();
                let oAddress = this.getView().byId("Address").getValue();
                let oCity = this.getView().byId("City").getValue();
                let oRegion = this.getView().byId("Region").getValue();
                let oPostalCode = this.getView().byId("PostalCode").getValue();
                let oCountry = this.getView().byId("Country").getValue();
                let oSalesperson = this.getView().byId("Salesperson").getValue();
            
                // Order Information
                let oOrderID = this.getView().byId("OrderID").getValue();
                let oOrderDate = this.getView().byId("OrderDate").getValue();
                let oRequiredDate = this.getView().byId("RequiredDate").getValue();
                let oShippedDate = this.getView().byId("ShippedDate").getValue();
                let oShipperName = this.getView().byId("ShipperName").getValue();
            
                // Product Information
                let oProductID = this.getView().byId("ProductID").getValue();
                let oProductName = this.getView().byId("ProductName").getValue();
                let oUnitPrice = this.getView().byId("UnitPrice").getValue();
                let oQuantity = this.getView().byId("Quantity").getValue();
                let oDiscount = this.getView().byId("Discount").getValue();
                let oExtendedPrice = this.getView().byId("ExtendedPrice").getValue();
                let oFreight = this.getView().byId("Freight").getValue();
            
                let myData = {
                    ShipName: oShipName,
                    ShipAddress: oShipAddress,
                    ShipCity: oShipCity,
                    ShipRegion: oShipRegion,
                    ShipPostalCode: oShipPostalCode,
                    ShipCountry: oShipCountry,
                    CustomerID: oCustomerID,
                    CustomerName: oCustomerName,
                    Address: oAddress,
                    City: oCity,
                    Region: oRegion,
                    PostalCode: oPostalCode,
                    Country: oCountry,
                    Salesperson: oSalesperson,
                    OrderID: parseInt(oOrderID), // Assuming OrderID is an integer
                    OrderDate: new Date(oOrderDate),
                    RequiredDate: new Date(oRequiredDate),
                    ShippedDate: new Date(oShippedDate),
                    ShipperName: oShipperName,
                    ProductID: parseInt(oProductID), // Assuming ProductID is an integer
                    ProductName: oProductName,
                    UnitPrice: parseFloat(oUnitPrice), // Assuming UnitPrice is a decimal
                    Quantity: parseInt(oQuantity), // Assuming Quantity is an integer
                    Discount: oDiscount,
                    ExtendedPrice: parseFloat(oExtendedPrice), // Assuming ExtendedPrice is a decimal
                    Freight: parseFloat(oFreight) // Assuming Freight is a decimal
                };
            
                oModel.create("/Invoices", myData, {
                    success: function (res) {
                        MessageToast.show("Data added successfully");
                        this._oCreateProductDialog.close();
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            onCancelOrder: function () {
                this._oCreateProductDialog.close()
            },
            onDeletePress: function () {
                // Get the selected items from the table
                var oTable = this.getView().byId("invoiceTable");
                var aSelectedItems = oTable.getSelectedItems();

                // Check if any items are selected
                if (aSelectedItems.length === 0) {
                    MessageToast.show("No items selected for deletion");
                    return;
                }

                // Confirmation dialog
                var that = this;
                sap.m.MessageBox.confirm("Are you sure you want to delete the selected items?", {
                    title: "Confirm Deletion",
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                            // User confirmed deletion
                            that.performDelete(aSelectedItems);
                        }
                        // else: User canceled deletion
                    }
                });
            },

            performDelete: function (aSelectedItems) {
                // Get the model and remove each selected item
                var oModel = this.getOwnerComponent().getModel();
                aSelectedItems.forEach(function (oSelectedItem) {
                    var sPath = oSelectedItem.getBindingContext().getPath();
                    oModel.remove(sPath, {
                        success: function (res) {
                            console.log("Item deleted successfully");
                            MessageToast.show("Item Deleted Successfully")
                        },
                        error: function (err) {
                            console.error("Error deleting item:", err);
                        }
                    });
                });


            },
            onUpdatePress: function () {
                var oTable = this.getView().byId("invoiceTable");
                var oSelectedItem = oTable.getSelectedItem();


                if (!oSelectedItem) {
                    MessageToast.show("No item selected for update");
                    return;
                }


                var oContext = oSelectedItem.getBindingContext();
                var oSelectedData = oContext.getObject();


                if (!this._oUpdateCustomerDialog) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "com.sap.project1.view.fragment.Updateinvoice",
                        controller: this
                    }).then(oDialog => {
                        this._oUpdateCustomerDialog = oDialog;
                        this.getView().addDependent(oDialog);

                        this.getView().byId("uSupplierID").setValue(oSelectedData.SupplierID);
                        this.getView().byId("uCompanyName").setValue(oSelectedData.CompanyName);
                        this.getView().byId("uContactName").setValue(oSelectedData.ContactName);
                        this.getView().byId("uContactTitle").setValue(oSelectedData.ContactTitle);
                        this.getView().byId("uAddress").setValue(oSelectedData.Addres);
                        this.getView().byId("uCity").setValue(oSelectedData.City);
                        this.getView().byId("uRegion").setValue(oSelectedData.Region);
                        this.getView().byId("uPostalCode").setValue(oSelectedData.PostalCode);
                        this.getView().byId("uCountry").setValue(oSelectedData.Country);
                        this.getView().byId("uPhone").setValue(oSelectedData.Phone);
                        this.getView().byId("uFax").setValue(oSelectedData.Fax);
                        this.getView().byId("uHomePage").setValue(oSelectedData.HomePage);



                        oDialog.open();
                    });
                } else {
                    this.getView().byId("uSupplierID").setValue(oSelectedData.SupplierID);
                    this.getView().byId("uCompanyName").setValue(oSelectedData.CompanyName);
                    this.getView().byId("uContactName").setValue(oSelectedData.ContactName);
                    this.getView().byId("uContactTitle").setValue(oSelectedData.ContactTitle);
                    this.getView().byId("uAddress").setValue(oSelectedData.Addres);
                    this.getView().byId("uCity").setValue(oSelectedData.City);
                    this.getView().byId("uRegion").setValue(oSelectedData.Regio);
                    this.getView().byId("uPostalCode").setValue(oSelectedData.PostalCode);
                    this.getView().byId("uCountry").setValue(oSelectedData.Country);
                    this.getView().byId("uPhone").setValue(oSelectedData.Phone);
                    this.getView().byId("uFax").setValue(oSelectedData.Fax);
                    this.getView().byId("uHomePage").setValue(oSelectedData.HomePage);

                    this._oUpdateCustomerDialog.open();
                }
            },

            confirmUpdate: function () {

                let oSupplierID = this.getView().byId("uSupplierID").getValue();
                let oCompanyName = this.getView().byId("uCompanyName").getValue();
                let oContactName = this.getView().byId("uContactName").getValue();
                let oContactTitle = this.getView().byId("uContactTitle").getValue();
                let oAddress = this.getView().byId("uAddress").getValue();
                let oCity = this.getView().byId("uCity").getValue();
                let oRegion = this.getView().byId("uRegion").getValue();
                let oPostalCode = this.getView().byId("uPostalCode").getValue();
                let oCountry = this.getView().byId("uCountry").getValue();
                let oPhone = this.getView().byId("uPhone").getValue();
                let oFax = this.getView().byId("uFax").getValue();
                let oHomePage = this.getView().byId("uHomePage").getValue();

                var oTable = this.getView().byId("supplierTable");
                var oSelectedItem = oTable.getSelectedItem();

                if (!oSelectedItem) {
                    MessageToast.show("No item selected for update");
                    return;
                }

                var oContext = oSelectedItem.getBindingContext();


                oContext.getModel().update(oContext.getPath(), {
                    SupplierID: oSupplierID,
                    CompanyName: oCompanyName,
                    ContactName: oContactName,
                    ContactTitle: oContactTitle,
                    Address: oAddress,
                    City: oCity,
                    Region: oRegion,
                    PostalCode: oPostalCode,
                    Country: oCountry,
                    Phone: oPhone,
                    Fax: oFax,
                    HomePage: oHomePage
                }, {
                    success: function () {
                        MessageToast.show("Data updated successfully");
                    },
                    error: function (err) {
                        console.error("Error updating data:", err);
                    }
                });
                this._oUpdateCustomerDialog.close();
            },

            onCancelUpdate: function () {
                this._oUpdateCustomerDialog.close();
            }
        });
    });