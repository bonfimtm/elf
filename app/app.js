(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf', [

        // Components
        'elf.version',
        'elf.auth',

        // Views
        'elf.main',
        'elf.login',
        'elf.admin',

        // AngularJS
        'ngAnimate',
        'ngTouch',

        // Third-party
        'firebase',
        'ui.router',
        'angular-loading-bar'
    ])

    .config(function ($urlRouterProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');
    });

})();