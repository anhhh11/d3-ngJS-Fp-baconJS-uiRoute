var app = angular.module('testAngularUI', ['ui.router']);
app.controller('HomeCtrl', function ($state,$stateParams) {
    console.log($stateParams);
});
app.config(function ($stateProvider, $urlRouterProvider) {
    var templateUrl = function (viewFilename) {
        return "partials/" + viewFilename + ".html";
    }
    var mainLayoutViews = {
        "header": {
            templateUrl: templateUrl("header")
        },
        "footer": {
            templateUrl: templateUrl("footer")
        },
        "left": {
            templateUrl: templateUrl("left")
        },

        "content": {
            templateUrl: templateUrl("index")
        }
    };
    $urlRouterProvider.when('/', '');

    //<tenView>  : { } // khai báo cho view của `state cha` (template của parent state phải chứa ui-view='<tenView>'
    //"" : {} // ghi đè unnamed view của parent stat


    //<tenView>@<tenState>.<tenStateCon> : {
    //}
    //tương đương <tên view>@<ở state nào> : {}
    // với cú pháp nảy <tenView> ở đây trỏ tới ui-view=<tenView>
    //<tenState>.<tenStateCon> là state chứa ui-view=<tenView> trên

    $stateProvider
        .state('root', {
            "abstract": true,
            templateUrl: templateUrl('layout')
        })
        .state('layout', {
            parent: 'root',
            "abstract": true,
            views: mainLayoutViews
        })
        .state("home", {
            parent: 'layout',
            url: '',
            controller: 'HomeCtrl'
        })
        .state("home.about", {
            url: '/about',
            views: {
                'content@root': {
                    templateUrl: templateUrl("about")
                }
            }
        })
        .state("home.tasks", {
            url: '/tasks',
            views: {
                'content@root': {
                    templateUrl: templateUrl("tasks")
                }
            }
        })
        .state("home.tasks.detail",{
            url: '/detail/:id',
            template: "detail",
            controller: "HomeCtrl"
        });
});