(function () {
    'use-strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBaseApp', 'http://davids-restaurant.herokuapp.coms/');

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        const menu = this;

        const promise = MenuCategoriesService.getMenuCategories();

        promise
            .then(function (response) {
                menu.categories = response.data;
            })
            .catch(function (error) {
                console.log('Error: ', error);
            });

        menu.logMenuItems = function (shortName) {
            const promise = MenuCategoriesService.getMenuForCategory(shortName);

            promise
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log('Error: ', error);
                })
        };
    };

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
        const service = this;

        service.getMenuCategories = function () {
            const response = $http({
                method: 'GET',
                url: (ApiBasePath + 'categories.json')
            });

            return response;
        };

        service.getMenuForCategory = function (shortName) {
            const response = $http({
                method: 'GET',
                url: (ApiBasePath + 'menu_items.json'),
                params: {
                    category: shortName
                }
            });

            return response;
        };
    };
})();