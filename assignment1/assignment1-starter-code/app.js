(function () {
    'use-strict';

    const LunchCheckController = ($scope, $filter) => {
        $scope.msg = '';

        $scope.check = () => {
            if (!$scope.menu) {
                return $scope.msg = 'Please enter data first';
            }

            let arr = $scope.menu.split(',');

            arr = arr.filter(item => item.trim());
            if (arr.length <= 3) {
                $scope.msg = 'Enjoy!';
            } else {
                $scope.msg = 'Too much!';
            }
        }
    };

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope', '$filter'];
})();