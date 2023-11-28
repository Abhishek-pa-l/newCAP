sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("com.sap.project1.controller.View1", {
        onInit: function () {


        },



        onIconTabBarSelect: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            var oSelectedKey = oEvent.getParameter("key");

            // Navigate to the corresponding route based on the selected key
            if (oSelectedKey === "Supplier") {
                oRouter.navTo("RouteView2", { key: oSelectedKey });
            } else if (oSelectedKey === "Invoice") {
                oRouter.navTo("RouteView3", { key: oSelectedKey });
            }
        }

    });
});