(function () {
    'use-strict';

    const CounterController = ($scope, $timeout) => {
        $scope.counter = 0;

        $scope.upCounter = () => {
            $timeout(() => {
                $scope.counter++;
                console.log('Counter icremented!');
            }, 2000);
        };

        // $scope.upCounter = () => {
        //     setTimeout(() => {
        //         $scope.$apply(() => {
        //             $scope.counter++;
        //             console.log('Counter icremented!');
        //         });
        //     }, 2000);
        // };

        // $scope.upCounter = () => {
        //     setTimeout(() => {
        //         $scope.counter++;
        //         console.log('Counter icremented!');
        //         $scope.$digest();
        //     }, 2000);
        // };
    };

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];
})();