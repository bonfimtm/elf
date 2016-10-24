(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.model', [

        // Third-party
        'firebase'
    ])

    .factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])

    .factory("Post", ["$firebaseObject",

        function($firebaseObject) {
            return function(id) {

                var obj;
                var ref = firebase.database().ref("posts");
                var findPublished = firebase.database().ref("queries/posts/findPublished");

                if (id) {
                    obj = $firebaseObject(ref.child(id));
                } else {
                    obj = $firebaseObject(ref.push());
                    obj.publish = true;
                }

                obj.$create = function() {

                    obj.url = slug(obj.title);

                    var now = new Date().getTime();
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.$priority = -now;

                    return obj.$save().then(function(data) {
                        updateQueries(data.key, obj);
                    });
                };

                obj.$edit = function() {

                    var now = new Date().getTime();
                    obj.updatedAt = now;
                    obj.$priority = -now;

                    return obj.$save().then(function(data) {
                        updateQueries(data.key, obj);
                    });
                };

                obj.$delete = function() {
                    return obj.$remove().then(function(data) {
                        updateQueries(data.key);
                    });;
                };

                function updateQueries(key, item) {
                    updateFindPublished(key, item);
                }

                function updateFindPublished(key, item) {
                    if (item && item.publish) {
                        findPublished.child(key).set(true);
                    } else {
                        findPublished.child(key).remove();
                    }
                }

                return obj;
            };
        }
    ])

    .service("posts", ["$firebaseArray", function($firebaseArray) {

        var ref = firebase.database().ref("posts");
        var findPublished = firebase.database().ref("queries/posts/findPublished");

        var posts = this;

        posts.findAll = function() {
            return $firebaseArray(ref.orderByPriority());
        };

        posts.findLastTen = function() {
            return $firebaseArray(ref.orderByChild("updatedAt").limitToLast(10));
        };

        posts.findByURL = function(url) {
            return $firebaseArray(ref.orderByChild("url").equalTo(url));
        };

        posts.findPublished = function() {
            findPublished.once('value').then(function(snapshot) {
                var val = snapshot.val();
                console.log(val);
            });
            return $firebaseArray(ref.orderByPriority());
        };

    }]);

})();