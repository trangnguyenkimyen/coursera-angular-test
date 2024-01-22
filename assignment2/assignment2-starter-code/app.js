(function () {
    'use-strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        const toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.removeItem = function (indexItem) {
            ShoppingListCheckOffService.bought(indexItem);
        };
    };

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        const bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtItems();
    };

    function ShoppingListCheckOffService() {
        const service = this;

        let toBuyItems = [
            { name: 'cookies', quantity: 10 },
            { name: 'fish sauce', quantity: 2 },
            { name: 'salt', quantity: 1 },
            { name: 'sugar', quantity: 5 },
            { name: 'chili sauce', quantity: 5 },
        ];

        let boughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

        service.bought = function (indexItem) {
            const item = toBuyItems[indexItem];
            boughtItems.push(item);
            toBuyItems.splice(indexItem, 1);
        };
    };
})();