(function () {
    'use-strict';

    angular.module('ControllerAsApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 2;
    };

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        const list = this;


        list.items = ShoppingListService.getItems();

        list.itemName = '';
        list.quantity = '';

        list.addItem = function () {
            try {
                ShoppingListService.addItem(list.itemName, list.quantity);
            } catch (error) {
                list.errorMsg = error.message;
            }
        };

        list.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    };

    function ShoppingListService(maxItems) {
        const service = this;

        const items = [];

        service.addItem = function (itemName, quantity) {
            if (!maxItems || (maxItems && items.length < maxItems)) {
                const item = {
                    name: itemName,
                    quantity
                };

                items.push(item);
            } else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
    };

    function ShoppingListServiceProvider() {
        const provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function () {
            const shoppingList = new ShoppingListService(provider.defaults.maxItems);

            return shoppingList;
        };
    };
})();