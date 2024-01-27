(function () {
    'use-strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingList)

    function ShoppingList() {
        const ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                title: '@title',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink
        };

        return ddo;
    };

    function ShoppingListDirectiveLink(scope, element, attrs, controller) {
        console.log('Link scope is: ', scope);
        console.log('Controller instance is: ', controller);
        console.log('Element is: ', element);

        scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
            console.log('Old value: ', oldValue);
            console.log('New value: ', newValue);

            if (newValue === true) {
                displayCookieWaring();
            } else {
                removeCookieWarning();
            }
        });

        function displayCookieWaring() {
            // // Using Angular jqLite
            // const warningEl = element.find('div');
            // warningEl.css('display', 'block');

            // If jQuery included before Angular
            const warningEl = element.find('div.error');
            warningEl.slideDown(200);
        };

        function removeCookieWarning() {
            // const warningEl = element.find('div');
            // warningEl.css('display', 'none');

            // If jQuery included before Angular
            const warningEl = element.find('div.error');
            warningEl.slideUp(200);
        };
    };



    function ShoppingListDirectiveController() {
        const list = this;

        list.cookiesInList = function () {
            for (let i = 0; i < list.items.length; i++) {
                let name = list.items[i].name;
                if (name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
            }
            return false;
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