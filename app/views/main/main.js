(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.main', [

        // Views
        'elf.main.home',

        // AngularJS
        'ngAnimate',
        'ngTouch',

        // Third-party
        'ui.bootstrap',
        'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.state('main', {
            templateUrl: 'views/main/main.html',
            abstract: true
        });
    });

})();