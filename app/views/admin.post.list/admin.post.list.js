(function () {
    'use strict';

    angular.module('elf.admin.post.list', ['elf.model', 'ui.router', 'ngAnimate', 'toastr', 'ngTable', 'oitozero.ngSweetAlert'])

        .config(function ($stateProvider) {

            $stateProvider.state('admin.post.list', {
                url: '/list',
                templateUrl: 'views/admin.post.list/admin.post.list.html',
                controller: 'AdminPostListCtrl',
                controllerAs: 'adminPostListCtrl'
            });
        })

        .controller('AdminPostListCtrl', ['$log', 'Post', 'posts', 'toastr', 'SweetAlert', function ($log, Post, posts, toastr, SweetAlert) {

            var adminPostListCtrl = this;

            adminPostListCtrl.loading = true;
            adminPostListCtrl.posts = posts.findAll();

            adminPostListCtrl.posts.$loaded()
                .then(function (data) {
                    $log.log(data);
                    // adminPostListCtrl.tableParams = new NgTableParams({}, {
                    //   dataset: data
                    // });
                })
                .catch(function (error) {
                    $log.error("Error:", error);
                })
                .finally(function () {
                    adminPostListCtrl.loading = false;
                });

            adminPostListCtrl.prepareDelete = function (item) {

                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this post!",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#d9534f",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        deletePost(item);
                    }
                });
            };

            function deletePost(item) {
                new Post(item.$id).$delete()
                    .then(function () {
                        $log.info("Post deleted");
                        SweetAlert.swal("Deleted!", "Your post has been deleted.", "success");
                    })
                    .catch(function (error) {
                        $log.error("Cannot delete post", error);
                        SweetAlert.swal("Deleted!", "Cannot delete post.", "error");
                    });
            }

        }]);
})();