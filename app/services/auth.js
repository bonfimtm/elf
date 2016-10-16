(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.auth', [

        // Third-party
        'firebase'
    ])

    .factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])

    .run(["$rootScope", "$state", function ($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $state.go("login");
            }
        });
    }])
    
    .run(["Auth", "$state", function(Auth, $state) {
        // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
            if (!firebaseUser) {
                $state.go("main.home");
            }
        });
    }]);

})();