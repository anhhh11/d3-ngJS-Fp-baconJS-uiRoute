var app = angular.module("testUIRouter", ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");
    $stateProvider
        //.state('general-layout', {
            //'abstract': true,
            //views: {
                //header: { templateUrl: "templates/header.html" },
                //footer: { templateUrl: "templates/footer.html" }
            //}
        //})
        .state('menu-main-layout', {
            "abstract": true,
            views: {
                "@": { templateUrl: "common/templates/menu-main-layout.html" }
            }
        })
        .state('main-config-layout', {
            "abstract": true,
            views: {
                "@": { templateUrl: "common/templates/menu-config-layout.html" }
            }
        })
        .state('home', {
            resolve: {
                wiki : function($http){
                    return $http.get("//en.wikipedia.org/w/api.php?action=opensearch&format=json&search=limit");
                }
            },
            url: "/home",
            parent: 'menu-main-layout',
            views: {
                "menu": { templateUrl: "home/menu.html" },
                "main": { templateUrl: "home/content.html" }
            },
            controller: 'HomeCtrl'
        })
});
app.controller("HomeCtrl", function ($scope,wiki) {
    console.log(wiki);
})