(function() {
    'use strict';

    angular.module('elf.admin.home', ['ui.router'])

    .config(function($stateProvider) {
        
        $stateProvider.state('admin.home', {
            url: '/',
            templateUrl: 'views/admin.home/admin.home.html',
            controller: 'AdminHomeCtrl',
            controllerAs: 'adminHomeCtrl'
        });
    })

    .controller('AdminHomeCtrl', ['currentAuth', function(currentAuth) {
        console.log(currentAuth.email);
    }]);
})();