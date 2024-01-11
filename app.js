!function () {
    function e(e, n) {
        e.name = "Ky",
            e.upper = () => {
                let o = n("uppercase");
                e.name = o(e.name)
            }
    }
    angular.module("DIApp", [])
        .controller("DIController", e),
        e.$inject = ["$scope", "$filter"]
}();