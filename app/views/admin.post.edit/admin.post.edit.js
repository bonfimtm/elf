(function() {
    'use strict';

    angular.module('elf.admin.post.edit', ['elf.model', 'ui.router', 'firebase', 'ngAnimate', 'toastr'])

    .config(function($stateProvider) {

        $stateProvider.state('admin.post.edit', {
            url: '/edit/:id',
            templateUrl: 'views/admin.post.edit/admin.post.edit.html',
            controller: 'AdminPostEditCtrl',
            controllerAs: 'adminPostEditCtrl'
        });
    })

    .controller('AdminPostEditCtrl', ['$log', '$stateParams', 'Post', 'toastr', function($log, $stateParams, Post, toastr) {

        var adminPostEditCtrl = this;

        adminPostEditCtrl.submit = function() {

            adminPostEditCtrl.loading = true;

            adminPostEditCtrl.post.$edit()
                .then(function(ref) {
                    $log.log("Post edited:", ref);
                    toastr.success('Post edited');
                    adminPostEditCtrl.init();
                })
                .catch(function(error) {
                    $log.error("Cannot edit post:", error);
                    toastr.error('Cannot edit post');
                })
                .finally(function() {
                    adminPostEditCtrl.loading = false;
                });
        };

        adminPostEditCtrl.init = function() {
            if ($stateParams.id) {
                adminPostEditCtrl.post = Post($stateParams.id);

                adminPostEditCtrl.post.$loaded()
                    .then(function(data) {
                        $log.log(data);
                    })
                    .catch(function(error) {
                        $log.error("Cannot load the post:", error);
                    })
                    .finally(function() {
                        adminPostViewCtrl.loading = false;
                    });

            } else {
                $log.error("Invalid URL");
                toastr.error('Invalid URL');
            }
        };

        adminPostEditCtrl.init();

    }]);
})();