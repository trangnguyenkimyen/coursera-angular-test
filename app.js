(function () {
    'use-strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListAddController', ShoppingListAddController)
        .controller('ShoppingListShowController', ShoppingListShowController)
        .service('ShoppingListService', ShoppingListService);

    ShoppingListAddController.$inject = ['ShoppingListService'];
    ShoppingListShowController.$inject = ['ShoppingListService'];

    function ShoppingListService() {
        let service = this;

        let items = [];

        service.addItem = function (itemName, itemQuantity) {
            const item = {
                name: itemName,
                quantity: itemQuantity
            };

            items.push(item);
        };

        service.getItem = function () {
            return items;
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        }
    };

    function ShoppingListAddController(ShoppingListService) {
        const itemAdder = this;

        itemAdder.itemName = '';
        itemAdder.itemQuantity = '';

        itemAdder.addItem = function () {
            ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        };
    };

    function ShoppingListShowController(ShoppingListService) {
        const showList = this;

        showList.items = ShoppingListService.getItem();

        showList.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        }
    };
})();