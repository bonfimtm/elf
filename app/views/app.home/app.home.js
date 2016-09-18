(function() {
    'use strict';

    angular.module('elf.app.home', ['ui.router', 'elf.model'])

    .config(function($stateProvider) {

        $stateProvider.state('app.home', {
            url: '/',
            templateUrl: 'views/app.home/app.home.html',
            controller: 'AppHomeCtrl',
            controllerAs: 'appHomeCtrl'
        });
    })

    .controller('AppHomeCtrl', ['$log', 'posts', function($log, posts) {

        var appHomeCtrl = this;

        (appHomeCtrl.init = function() {
            appHomeCtrl.loading = true;
            appHomeCtrl.posts = posts.findAll();

            appHomeCtrl.posts.$loaded()
                .then(function(data) {
                    $log.log(data);
                })
                .catch(function(error) {
                    $log.error("Error:", error);
                })
                .finally(function() {
                    appHomeCtrl.loading = false;
                });

        })();

    }]);
})();