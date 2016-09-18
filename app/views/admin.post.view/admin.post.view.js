(function() {
    'use strict';

    angular.module('elf.admin.post.view', ['elf.model', 'ui.router', 'ngAnimate', 'toastr'])

    .config(function($stateProvider) {

        $stateProvider.state('admin.post.view', {
            url: '/view/:id',
            templateUrl: 'views/admin.post.view/admin.post.view.html',
            controller: 'AdminPostViewCtrl',
            controllerAs: 'adminPostViewCtrl'
        });
    })

    .controller('AdminPostViewCtrl', ['$log', '$stateParams', 'Post', 'toastr', function($log, $stateParams, Post, toastr) {

        var adminPostViewCtrl = this;
        var postsRef = firebase.database().ref().child("posts");

        adminPostViewCtrl.init = function() {
            if ($stateParams.id) {

                adminPostViewCtrl.post = new Post($stateParams.id);

                adminPostViewCtrl.post.$loaded()
                    .then(function(data) {
                        $log.log(data);
                    })
                    .catch(function(error) {
                        $log.error("Cannot load the post:", error);
                    });
            } else {
                log.error("Invalid URL");
                toastr.erro("Invalid URL");
            }
        };

        adminPostViewCtrl.init();

    }]);
})();