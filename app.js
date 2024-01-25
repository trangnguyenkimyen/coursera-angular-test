(function () {
    'use-strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingList)

    function ShoppingList() {
        const ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                list: '=myList',
                title: '@title'
            }
        };

        return ddo;
    };

    // LIST #1 - controller
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {
        const list1 = this;

        // Use factory to create new shopping list service
        const shoppingList = ShoppingListFactory();

        list1.items = shoppingList.getItems();

        list1.itemName = '';
        list1.itemQuantity = '';

        const origTitle = 'Shopping List #1';
        list1.title = `${origTitle} (${list1.items.length} items)`;

        list1.addItem = function () {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
            list1.title = `${origTitle} (${list1.items.length} items)`;
        };

        list1.removeItem = function (itemIndex) {
            shoppingList.removeItem(itemIndex);
            list1.title = `${origTitle} (${list1.items.length} items)`;
        };
    };

    // LIST #2 - controller
    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2(ShoppingListFactory) {
        const list2 = this;

        // Use factory to create new shopping list service
        const shoppingList = ShoppingListFactory(3);

        list2.items = shoppingList.getItems();

        list2.itemName = '';
        list2.itemQuantity = '';

        list2.addItem = function () {
            try {
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
            } catch (error) {
                list2.errorMsg = error.message;
            }

        };

        list2.removeItem = function (itemIndex) {
            shoppingList.removeItem(itemIndex);
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

    function ShoppingListFactory() {
        const factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        };

        return factory;
    };
})();