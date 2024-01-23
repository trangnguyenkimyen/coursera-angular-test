(function () {
    'use-strict';

    angular.module('ShoppingListPromiseApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = ['ShoppingListService'];

    function ShoppingListController(ShoppingListService) {
        const list = this;

        list.items = ShoppingListService.getItems();

        list.itemName = '';
        list.itemQuantity = '';

        list.addItem = function () {
            try {
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.errorMsg = error.message;
            }
        };

        list.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    };

    ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];

    function ShoppingListService($q, WeightLossFilterService) {
        const service = this;

        const items = [];

        // service.addItem = function (itemName, quantity) {
        //     const promise = WeightLossFilterService.checkName(itemName);

        //     promise.then(function (response) {
        //         const nextPromise = WeightLossFilterService.checkQuantity(quantity);

        //         nextPromise.then(function (result) {
        //             const item = {
        //                 name: itemName,
        //                 quantity: quantity
        //             };

        //             items.push(item);
        //         }, function (error) {
        //             console.log(error.message);
        //         });
        //     }, function (error) {
        //         console.log(error.message);
        //     });
        // };

        // service.addItem = function (name, quantity) {
        //     const promise = WeightLossFilterService.checkName(name);

        //     promise
        //         .then(function (response) {
        //             return WeightLossFilterService.checkQuantity(quantity);
        //         })
        //         .then(function (response) {
        //             const item = {
        //                 name: name,
        //                 quantity: quantity
        //             };

        //             items.push(item);
        //         })
        //         .catch(function (error) {
        //             console.log(error.message);
        //         });
        // };

        service.addItem = function (name, quantity) {
            const namePromise = WeightLossFilterService.checkName(name);
            const quantityPromise = WeightLossFilterService.checkQuantity(quantity);

            $q.all([namePromise, quantityPromise])
                .then(function (response) {
                    const item = {
                        name: name,
                        quantity: quantity
                    };

                    items.push(item);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
    };

    WeightLossFilterService.$inject = ['$q', '$timeout'];

    function WeightLossFilterService($q, $timeout) {
        const service = this;

        service.checkName = function (name) {
            const deferred = $q.defer();

            let result = {
                message: ''
            };

            $timeout(function () {
                // Check for cookies
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result);
                } else {
                    result.message = 'Stay away from cookies, Yaakov!';
                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise;
        };

        service.checkQuantity = function (quantity) {
            const deferred = $q.defer();

            let result = {
                message: ''
            };

            $timeout(function () {
                // Check too many boxes
                if (quantity < 6) {
                    deferred.resolve(result);
                } else {
                    result.message = "That's too much, Yaakov!";
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        };
    };
})();