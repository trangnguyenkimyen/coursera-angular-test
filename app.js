(function () {
    'use-strict';

    const MsgController = ($scope) => {
        $scope.name = 'Ky';
        $scope.stateOfBeing = "hungry";
        $scope.sayMsg = () => {
            return "Hello world!";
        };
        $scope.feedYaakov = () => {
            return $scope.stateOfBeing = $scope.stateOfBeing === 'fed' ? 'hungry' : 'fed';
        };
    };

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope'];
})();