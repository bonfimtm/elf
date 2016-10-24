(function() {
    'use strict';

    angular.module('elf.admin.post.list', ['elf.model', 'ui.router', 'ngAnimate', 'toastr', 'ngTable'])

    .config(function($stateProvider) {

        $stateProvider.state('admin.post.list', {
            url: '/list',
            templateUrl: 'views/admin.post.list/admin.post.list.html',
            controller: 'AdminPostListCtrl',
            controllerAs: 'adminPostListCtrl'
        });
    })

    .controller('AdminPostListCtrl', ['$log', 'Post', 'posts', 'toastr', 'NgTableParams', function($log, Post, posts, toastr, NgTableParams) {

        var adminPostListCtrl = this;

        adminPostListCtrl.loading = true;
        adminPostListCtrl.posts = posts.findAll();

        adminPostListCtrl.posts.$loaded()
            .then(function(data) {
                $log.log(data);
                // adminPostListCtrl.tableParams = new NgTableParams({}, {
                //   dataset: data
                // });
            })
            .catch(function(error) {
                $log.error("Error:", error);
            })
            .finally(function() {
                adminPostListCtrl.loading = false;
            });

        adminPostListCtrl.prepareDelete = function(item) {
            new Post(item.$id).$delete()
                .then(function(ref) {
                    $log.info("Item deleted");
                    toastr.info("Item deleted");
                })
                .catch(function(error) {
                   $log.error("Cannot delete item", error);
                    toastr.error("Cannot delete item"); 
                });
        };

    }]);
})();