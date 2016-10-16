(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.admin', [

        'elf.model',
        'elf.auth',

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
        'ui.router'
    ])

    .config(function($stateProvider) {

        $stateProvider.

        state('admin', {
            url: '/admin',
            templateUrl: 'views/admin/admin.html',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireSignIn();
                }]
            }
        })

        .state('admin.post', {
            url: '/post',
            template: '<ui-view></ui-view>'
        });
    })

    .controller('AdminNavbarCtrl', ['Auth', '$state', function(Auth, $state) {
        var adminNavbarCtrl = this;

        adminNavbarCtrl.currentUserEmail = Auth.$getAuth().email;
        
        adminNavbarCtrl.logout = function() {
            Auth.$signOut();
            //$state.go("main.home");
        };
    }]);

})();