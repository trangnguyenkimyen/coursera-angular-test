(function () {
    'use-strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json')
        .directive('foundItems', FoundItems);

    function FoundItems() {
        const ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    };

    function NarrowItDownDirectiveController() {
        const menu = this;
    };

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        const menu = this;

        menu.searchTerm = '';
        menu.found = [];
        menu.message = null;

        menu.search = function (searchTerm) {
            if (!searchTerm) {
                menu.message = 'Nothing found';
                menu.found = [];
                return;
            }

            const promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise
                .then(function (result) {
                    menu.found = result;
                    if (!menu.found) {
                        return menu.message = 'Nothing found';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        menu.removeItem = function (indexItem) {
            MenuSearchService.removeItem(indexItem);
        };
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        const service = this;

        let foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: (ApiBasePath)
            })
                .then(function (result) {
                    const data = result.data;
                    foundItems = [];
                    for (const key in data) {
                        data[key].menu_items.forEach(item => {
                            if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                                foundItems.push({
                                    name: data[key].category.name,
                                    short_name: data[key].category.short_name,
                                    description: item.description
                                });
                            }
                        })
                    };

                    return foundItems;
                })
                .catch(function (error) {
                    throw new Error(error.message);
                });
        };

        service.removeItem = function (indexItem) {
            foundItems.splice(indexItem, 1);
        };
    };
})();