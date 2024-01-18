(function () {
    'use-strict';

    const shoppingList = [
        "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
    ];

    const ShoppingListController = ($scope) => {
        $scope.shoppingList = shoppingList;
    };


    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];
})();