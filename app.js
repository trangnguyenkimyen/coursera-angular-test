// app.js
(function () {
    'use-strict';

    angular.module('NameCalculator', [])

        .controller('NameCalculatorController', function ($scope) {
            $scope.name = '';
            $scope.totalValue = 0;
            $scope.displayNumeric = () => {
                const count = calculateNumericforString($scope.name);
                $scope.totalValue = count;
            };

            const calculateNumericforString = (string) => {
                let totalStringValue = 0;
                for (let i = 0; i < string.length; i++) {
                    totalStringValue += string.charCodeAt(i);
                }

                return totalStringValue;
            };
        })
})();