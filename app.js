(function () {
    'use-strict';

    const CounterController = ($scope) => {
        $scope.onceCounter = 0;
        $scope.counter = 0;

        $scope.showNumberOfWatchers = () => {
            console.log('# of watchers: ', $scope.$$watchersCount);
        };

        $scope.countOnce = () => {
            $scope.onceCounter = 1;
        };

        $scope.upCounter = () => {
            $scope.counter++;
        };

        $scope.$watch = () => {
            console.log('Digest loop fired!');
        };

        // $scope.$watch('onceCounter', (newValue, oldValue) => {
        //     console.log('onceCounter old value: ', oldValue);
        //     console.log('onceCounter new value: ', newValue);
        // })

        // $scope.$watch('counter', (newValue, oldValue) => {
        //     console.log('counter old value: ', oldValue);
        //     console.log('counter new value: ', newValue);
        // })
    };

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];
})();