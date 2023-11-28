sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
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
            confirmOrder : function(){
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

                let myData={
                    SupplierID : oSupplierID,
                    CompanyName : oCompanyName,
                    ContactName : oContactName,
                    ContactTitle : oContactTitle,
                    Address :oAddress,
                    City : oCity,
                    Region : oRegion,
                    PostalCode : oPostalCode,
                    Country : oCountry,
                    Phone : oPhone,
                    Fax : oFax,
                    HomePage : oHomePage

                    



                }

                oModel.create("/Suppliers",myData,{
                    success : function(res){
                        console.log("done")
                    },
                    error : function(err){
                        console.log(err)
                    }
                })


                
            },
            onCancelOrder : function(){
                this._oCreateProductDialog.close()
            },
            onDeletePress : function(){
                debugger
                let oModel = this.getOwnerComponent().getModel();
               oModel.remove("/Suppliers(5)",{
                success : function(res){
                    console.log("done")
                },
                error : function(err){
                    console.log(err)
                }
               })
            }
        });
    });