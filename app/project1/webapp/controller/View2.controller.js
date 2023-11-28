sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment,MessageToast,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.View2", {
            onInit: function () {

            },
            onAddPress: function () {

                if (!this._oCreateProductDialog) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "com.sap.project1.view.fragment.Supplier",
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
                debugger
                let oModel = this.getOwnerComponent().getModel();
                let oSupplierID = this.getView().byId("SupplierID").getValue();
                let oCompanyName = this.getView().byId("CompanyName").getValue();
                let oContactName = this.getView().byId("ContactName").getValue();
                let oContactTitle = this.getView().byId("ContactTitle").getValue();
                let oAddress = this.getView().byId("Address").getValue();
                let oCity = this.getView().byId("City").getValue();
                let oRegion = this.getView().byId("Region").getValue();
                let oPostalCode = this.getView().byId("PostalCode").getValue();
                let oCountry = this.getView().byId("Country").getValue();
                let oPhone = this.getView().byId("Phone").getValue();
                let oFax = this.getView().byId("Fax").getValue();
                let oHomePage = this.getView().byId("HomePage").getValue();

                let myData = {
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





                }

                oModel.create("/Suppliers", myData, {
                    success: function (res) {
                        MessageToast.show("Data added successfully");
                        this._oCreateProductDialog.close()
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })



            },
            onCancelOrder: function () {
                this._oCreateProductDialog.close()
            },
            onDeletePress: function () {
                // Get the selected items from the table
                var oTable = this.getView().byId("supplierTable");
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
            onSearch: function (oEvent) {
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    // Convert the search query to an integer
                    var iQuery = parseInt(sQuery);
                    if (!isNaN(iQuery)) {
                        aFilter.push(new Filter("SupplierID", FilterOperator.EQ, iQuery));
                    }
                }
           
                // filter binding
                var oTable = this.getView().byId("supplierTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            }
        });
    });