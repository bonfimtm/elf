(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('template.theproject', ['ui.bootstrap', 'ui.router'])

    .directive('theproject', function() {
        return {
            restrict: "E",
            transclude: true,
            templateUrl: "templates/theproject/theproject.html"
        };
    });

})();