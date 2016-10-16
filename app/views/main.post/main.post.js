(function() {
    'use strict';

    angular.module('elf.main.post', ['ui.router', 'elf.model'])

    .config(function($stateProvider) {

        $stateProvider.state('main.post', {
            url: '/:url',
            templateUrl: 'views/main.post/main.post.html',
            controller: 'MainPostCtrl',
            controllerAs: 'mainPostCtrl'
        });
    })

    .controller('MainPostCtrl', ['$log', 'posts', '$stateParams', 'toastr', function($log, posts, $stateParams, toastr) {

        var mainPostCtrl = this;

        mainPostCtrl.init = function() {
            mainPostCtrl.loading = true;
            
            if ($stateParams.url) {
                mainPostCtrl.posts = posts.findByURL($stateParams.url);

                mainPostCtrl.posts.$loaded()
                    .then(function(data) {
                        $log.log(data);
                    })
                    .catch(function(error) {
                        $log.error("Error:", error);
                    })
                    .finally(function() {
                        mainPostCtrl.loading = false;
                    });
            } else {
                toastr.error("Invalid URL");
            }
        };

        mainPostCtrl.init();
    }]);
})();