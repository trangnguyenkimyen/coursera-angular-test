(function () {
    'use-strict';

    angular.module('ShoppingListComponentApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .component('shoppingList', {
            templateUrl: 'shoppingList.html',
            controller: ShoppingListComponentController,
            bindings: {
                items: '<',
                title: '@',
                onRemove: '&'
            }
        })

    ShoppingListComponentController.$inject = ['$scope', '$element']
    function ShoppingListComponentController($scope, $element) {
        const $ctrl = this;

        $ctrl.cookiesInList = function () {
            for (let i = 0; i < $ctrl.items.length; i++) {
                let name = $ctrl.items[i].name;
                if (name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
            }
            return false;
        };

        $ctrl.remove = function (myIndex) {
            $ctrl.onRemove({ index: myIndex });
        };

        $ctrl.$onInit = function () {

        };

        $ctrl.$onChanges = function (changeObj) {

        };

        $ctrl.$postLink = function () {
            $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
                const warningEl = $element.find('div.error');
                if (newValue === true) {
                    // Show warning
                    warningEl.slideDown(500);
                } else {
                    // Hid warning
                    warningEl.slideUp(500);
                }
            });
        };
    };

    // LIST #1 - controller
    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
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
            console.log(this);
            this.lastRemoved = `Last item removed was ${this.items[itemIndex].name}`
            shoppingList.removeItem(itemIndex);
            this.title = `${origTitle} (${list1.items.length} items)`;
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