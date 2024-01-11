// app.js
(function () {
    'use-strict';

    angular.module('DIApp', [])
        .controller('DIController', DIController);

    function DIController($scope, $filter) {
        $scope.name = 'Ky';
        $scope.upper = function () {
            const upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        }
    }

})();