(function() {
    'use strict';

    angular.module('elf.version.interpolate-filter', [])

    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);
})();