(function () {
    'use-strict';

    function ParentController1($scope) {
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 1;
    }

    function ChildController1($scope) {
        console.log('$scope.parentValue: ', $scope.parentValue);
        console.log('CHILD $scope: ', $scope);

        $scope.parentValue = 5;
        console.log('*** CHANGED: $scope.parentValue = 5 ***');
        console.log('$scope.parentValue: ', $scope.parentValue);
        console.log('CHILD $scope: ', $scope);

        console.log('$scope.pc.parentValue: ', $scope.pc.parentValue);
        $scope.pc.parentValue = 5;
        console.log('*** CHANGED: $scope.pc.parentValue = 5 ***');
        console.log('$scope.pc.parentValue: ', $scope.pc.parentValue);
        console.log('CHILD $scope: ', $scope);

        console.log('$scope.$parent.parentValue: ', $scope.$parent.parentValue);
    };

    function ParentController2() {
        const parent = this;
        parent.value = 1;
    };

    function ChildController2($scope) {
        const child = this;
        child.value = 5;
        console.log('ChildController2 $scope: ', $scope);
    };

    angular.module('ControllerAsApp', [])
        .controller('ParentController1', ParentController1)
        .controller('ChildController1', ChildController1)
        .controller('ParentController2', ParentController2)
        .controller('ChildController2', ChildController2);

    ParentController1.$inject = ['$scope'];
    ChildController1.$inject = ['$scope'];
    ChildController2.$inject = ['$scope'];
})();