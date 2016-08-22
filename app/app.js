(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf', [

        // Components
        'elf.version',

        // Views
        'elf.view1',
        'elf.view2',

        // AngularJS
        'ngAnimate',
        'ngTouch',

        // Third-party
        'ui.bootstrap',
        'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/view1');

        $stateProvider.state('app', {
            templateUrl: 'app.html'
        });
    });

})();