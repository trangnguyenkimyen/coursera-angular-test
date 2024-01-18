(function () {
    'use-strict';

    const shoppingList1 = [
        "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
    ];

    const shoppingList2 = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];


    const ShoppingListController = ($scope) => {
        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;

        $scope.addToList = () => {
            const newItem = {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity,
            };

            $scope.shoppingList2.push(newItem);
            $scope.newItemName = '';
            $scope.newItemQuantity = '';
        };
    };


    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];
})();