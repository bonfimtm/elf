(function() {
    'use strict';

    angular.module('elf.main.home', ['ui.router', 'elf.model'])

    .config(function($stateProvider) {

        $stateProvider.state('main.home', {
            url: '/',
            templateUrl: 'views/main.home/main.home.html',
            controller: 'MainHomeCtrl',
            controllerAs: 'mainHomeCtrl'
        });
    })

    .controller('MainHomeCtrl', ['$log', 'posts', function($log, posts) {

        var mainHomeCtrl = this;

        mainHomeCtrl.init = function() {
            mainHomeCtrl.loading = true;
            mainHomeCtrl.posts = posts.findPublished();

            mainHomeCtrl.posts.$loaded()
                .then(function(data) {
                    $log.log(data);
                })
                .catch(function(error) {
                    $log.error("Error:", error);
                })
                .finally(function() {
                    mainHomeCtrl.loading = false;
                });

        };

        mainHomeCtrl.init();
    }]);
})();