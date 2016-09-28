(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf', [

        // Components
        'elf.version',

        // Views
        'elf.main',
        'elf.admin',
        'elf.view1',
        'elf.view2',

        // AngularJS
        'ngAnimate',
        'ngTouch',

        // Third-party
        'firebase',
        'ui.router',
        'angular-loading-bar'
    ])

    .config(function($urlRouterProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');
    });

})();