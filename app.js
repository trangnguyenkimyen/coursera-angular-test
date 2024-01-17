(function () {
    'use-strict';

    const BindingController = ($scope) => {
        $scope.firstName = 'Ky';
        // $scope.fullName = '';

        $scope.showNumberOfWatchers = () => {
            console.log('# of Watchers: ', $scope.$$watchersCount);
        };

        $scope.setFullName = () => {
            $scope.fullName = $scope.firstName + ' ' + 'Trang Nguyen';
        };

        $scope.logFirstName = () => {
            console.log('First name is: ', $scope.firstName);
        };

        $scope.logFullName = () => {
            console.log('Full name is:', $scope.fullName);
        };
    };

    angular.module('BindingApp', [])
        .controller('BindingController', BindingController);

    BindingController.$inject = ['$scope'];
})();