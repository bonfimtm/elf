(function() {
    'use strict';

    angular.module('elf.admin.post.new', ['elf.model', 'ui.router', 'firebase', 'ngAnimate', 'toastr'])

    .config(function($stateProvider) {

        $stateProvider.state('admin.post.new', {
            url: '/new',
            templateUrl: 'views/admin.post.new/admin.post.new.html',
            controller: 'AdminPostNewCtrl',
            controllerAs: 'adminPostNewCtrl'
        });
    })

    .controller('AdminPostNewCtrl', ['$log', 'Post', 'toastr', function($log, Post, toastr) {

        var adminPostNewCtrl = this;

        adminPostNewCtrl.submit = function() {

            adminPostNewCtrl.loading = true;

            adminPostNewCtrl.post.$create()
                .then(function(ref) {
                    $log.log("Post added:", ref);
                    toastr.success('Post added!');
                    adminPostNewCtrl.init();
                })
                .catch(function(error) {
                    $log.error("Cannot add post:", error);
                    toastr.error('Cannot add post');
                })
                .finally(function() {
                    adminPostNewCtrl.loading = false;
                });
        };

        adminPostNewCtrl.init = function() {
            adminPostNewCtrl.post = new Post();
        };

        adminPostNewCtrl.init();

    }]);
})();