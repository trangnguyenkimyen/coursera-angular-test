(function () {
    'use-strict';

    const MsgController = ($scope, $filter) => {
        $scope.name = 'Ky';
        $scope.stateOfBeing = "hungry";
        $scope.cookieCost = .5;
        $scope.sayMsg = () => {
            const msg = 'Hello world!';
            const output = $filter('uppercase')(msg);
            return output;
        };
        $scope.feedYaakov = () => {
            return $scope.stateOfBeing = $scope.stateOfBeing === 'fed' ? 'hungry' : 'fed';
        };
    };

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope', '$filter'];
})();