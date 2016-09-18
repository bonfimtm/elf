(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.admin', [
        
        // Views
        'elf.admin.home',
        'elf.admin.post.list',
        'elf.admin.post.new',
        'elf.admin.post.view',
        'elf.admin.post.edit',

        // AngularJS
        'ngAnimate',
        'ngTouch',

        // Third-party
        'ui.bootstrap',
        'ui.router',
    ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.

        state('admin', {
            url: '/admin',
            templateUrl: 'views/admin/admin.html'
        })

        .state('admin.post', {
            url: '/post',
            template: '<ui-view></ui-view>'
        });
    });

})();