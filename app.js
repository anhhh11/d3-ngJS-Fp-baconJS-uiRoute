var app = angular.module("demo", ['ui.router']);
app.controller("MainController", ['$scope', 'EntityService', function ($scope, EntityService) {
    EntityService.getEntities().then(function (res) {
        $scope.entities = res.data;
    })
}]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('index', {
        })
});

app.service('EntityService', ['$q', function ($q) {
    return {
        getEntities: function () {
            var contactEntity = {
                name: 'Contact',
                primaryKey: ['accountName'],
                columns: {
                    accountName: { type: 'fk', foreignKey: 'accountName', belongsTo: 'Account' },
                    assistant: { type: 'text', length: 40 },
                    asstPhone: { type: 'phone' },
                    birthDate: { type: 'date' },
                    contactOwner: { type: 'fk', foreignKey: 'accountName', required: true, belongsTo: 'Account' },
                    contactBy: { type: 'fk', foreignKey: 'accountName', required: true, belongsTo: 'Account' }
                }
            };
            var accountEntity = {
                name: 'Account',
                primaryKey: ['accountNumber'],
                columns: {
                    accountName: { type: "name" },
                    accountNumber: { type: 'text' },
                    active: { type: 'picklist' },
                    parentAccount: { type: 'fk', foreignKey: 'accountNumber', belongsTo: 'Account' }
                }
            };
            var deferred = $q.defer();
            deferred.resolve({ data: [contactEntity, accountEntity] });
            return deferred.promise;
        }
    }
}]);
app.directive('droppable', function () {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs, ctrl) {
            //dragenter
            elem.on("dragover", function (e) {
                e.dataTransfer.dropEffect = 'move';
                if (e.preventDefault) e.preventDefault(); // allow drop
                return false;
            });
            elem.on("drop", function (e) {
                e.preventDefault(); //must prevent default or firefox will load this element as page
                console.log(e.dataTransfer.getData('text'));
                var data = JSON.parse(e.dataTransfer.getData('text'));
                var dragged = $('#' + data.draggedId);
                console.log(data);
                dragged.css({ left: e.clientX - data.deltaX, top: e.clientY - data.deltaY});
                return false;
            });
        }
    }
});
app.directive('draggable', function ($window) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs, ctrl) {
            var elemComputedStyle = $window.getComputedStyle(elem[0],null);
            elem.prop("draggable", true);
            elem.on("dragstart", function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text', JSON.stringify({
                    draggedId: elem.attr("id"),
                    deltaY: e.clientY - parseInt(elemComputedStyle.getPropertyValue("top"),10),
                    deltaX: e.clientX - parseInt(elemComputedStyle.getPropertyValue("left"),10)
                }));
                return false;
            });
            //drag
            //dragend
            elem.on("dragend", function (e) {
                e.preventDefault();
            })
        }
    }
})
app.directive('entityDirective', function () {
    return {
        restrict: 'EA',
        templateUrl: './entityTemplate.html',
        scope: {
            entity: '='
        },
        replace: true,
        link: function (scope, elem, attrs, ctrl) {
        }
    }
})