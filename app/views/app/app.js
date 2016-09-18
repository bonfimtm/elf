(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.app', [

        // Views
        'elf.app.home',

        'template.theproject',

        // AngularJS
        'ngAnimate',
        'ngTouch',

        // Third-party
        'ui.bootstrap',
        'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.state('app', {
            templateUrl: 'views/app/app.html'
        });
    });

})();