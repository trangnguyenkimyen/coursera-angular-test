(function () {
    'use-strict';

    const MsgController = ($scope, $filter, lovesFilter) => {
        $scope.name = 'Ky';
        $scope.stateOfBeing = "hungry";
        $scope.sayMsg = () => {
            const msg = 'Yaakov likes to eat healthy snacks at night!';
            return msg;
        };

        $scope.sayLovesMsg = () => {
            const msg = 'Yaakov likes to eat healthy snacks at night!';
            const output = lovesFilter(msg);
            return output;
        };

        $scope.feedYaakov = () => {
            return $scope.stateOfBeing = $scope.stateOfBeing === 'fed' ? 'hungry' : 'fed';
        };
    };

    const LovesFilter = () => {
        return (input) => {
            input = input || '';
            input = input.replace('likes', 'loves');
            return input;
        };
    };

    const TruthFilter = () => {
        return (input, target, replace) => {
            input = input || '';
            input = input.replace(target, replace);
            return input;
        };
    };

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController)
        .filter('loves', LovesFilter)
        .filter('truth', TruthFilter);

    MsgController.$inject = ['$scope', '$filter', 'lovesFilter'];
})();