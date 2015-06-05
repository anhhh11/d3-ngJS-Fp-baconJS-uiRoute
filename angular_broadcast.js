app.controller('parent', function ($scope, $timeout, $rootScope) {
    $timeout(function () {
        //$scope.$broadcast("parent", "world from parent");
    }, 3000);
    var sub = $rootScope.$on("child", function (e, d) {
        console.log("rootScope:", e, d);
    })
    sub() //unsubscribe
    $scope.$on("child", console.log.bind(console));
})
app.controller('child', function ($scope, $timeout, $rootScope) {
    $timeout(function () {
        $rootScope.$broadcast("child", "child1234");
    }, 3000);
    $scope.$on("parent", function (e, d) {
        console.log(e, d);
    });
    $scope.$emit("child", "world from child");
})