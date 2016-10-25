(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.login', [

        'elf.model',
        'elf.auth',

        // Third-party
        'ui.bootstrap',
        'ui.router',
        'toastr'
    ])

    .config(function($stateProvider) {

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        });
    })

    .controller('LoginCtrl', ['$log', 'Auth', 'toastr', '$state',
                                function($log, Auth, toastr, $state) {
        var loginCtrl = this;
        
        console.log("loginCtrl");

        loginCtrl.submit = function() {
            loginCtrl.loading = true;

            Auth.$signInWithEmailAndPassword(loginCtrl.email, loginCtrl.password)
                .then(function(firebaseUser) {
                    loginCtrl.email = undefined;
                    $log.log("Signed in as:", firebaseUser.uid);
                    toastr.info("Logged in");
                    $state.go("admin.home");
                }).catch(function(error) {
                    $log.error("Authentication failed:", error);
                    toastr.error("Not logged in :(");
                }).finally(function() {
                    loginCtrl.form.$setPristine();
                    loginCtrl.form.$setUntouched();
                    loginCtrl.password = undefined;
                    loginCtrl.loading = false;
                });
        };
    }]);

})();