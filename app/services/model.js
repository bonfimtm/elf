(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('elf.model', [

        // Third-party
        'firebase'
    ])

    .factory("Post", ["$firebaseObject",

        function($firebaseObject) {
            return function(id) {

                var obj;
                var ref = firebase.database().ref("posts");

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

                    return obj.$save();
                };

                obj.$edit = function() {
                    
                    var now = new Date().getTime();
                    obj.updatedAt = now;

                    return obj.$save();
                };

                obj.$delete = function() {
                    return obj.$remove();
                };

                return obj;
            };
        }
    ])

    // .factory("PostArray", ["$firebaseArray", function("$firebaseArray") {
    //     return function() {
    //     };
    // }])

    .service("posts", ["$firebaseArray", function($firebaseArray) {

        var ref = firebase.database().ref("posts")

        var elements = this;

        elements.findAll = function() {
            return $firebaseArray(ref.orderByChild("updatedAt"));
        };

        elements.findLastTen = function() {
            return $firebaseArray(ref.orderByChild("updatedAt").limitToLast(10));
        };
    }]);

})();