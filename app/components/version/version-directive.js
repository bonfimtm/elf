(function() {
    'use strict';

    angular.module('elf.version.version-directive', [])

    .directive('appVersion', ['version', function(version) {
        return function(scope, elm) {
            elm.text(version);
        };
    }]);
})();