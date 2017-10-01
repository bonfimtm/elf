/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    /*
     * Reads package.json metadata
     */
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      '*/\n',
    src: 'app',
    build: 'dist',
    bower_dir: 'bower_components',

    // Task configuration.
    /*
     * Cleans output directory
     */
    clean: {
      pre: {
        src: ['<%= build %>/**']
      },
      post: {
        src: [
          '<%= build %>/lib.js',
          '<%= build %>/assets/css/lib.css',
          '<%= build %>/app.js',
          '<%= build %>/assets/css/app.css'
        ]
      }
    },

    /*
     * Copies files that are not HTML, JS or CSS.
     */
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: '<%= src %>',
          src: ['WEB-INF/**',
            'assets/favicon/**',
            'assets/fonts/**',
            'assets/img/**',
            'components/**/img/**',
            'components/**/*.html',
            'views/**/img/**',
            'views/**/*.html',
            'views/**/*.json',
            '404.html',
            '500.html',
            'index.html'
          ],
          dest: '<%= build %>/',
          filter: 'isFile'
        }, {
          expand: true,
          cwd: '<%= src %>/<%= bower_dir %>/font-awesome/fonts/',
          src: ['**'],
          dest: '<%= build %>/assets/fonts',
          filter: 'isFile'
        }]
      }
    },

    /*
     * Concatenates JS and CSS files.
     */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: '\n\n'
      },
      dist: {
        files: {
          '<%= build %>/modernizr.min.js': [
            '<%= src %>/<%= bower_dir %>/html5-boilerplate/src/js/vendor/modernizr-2.8.3.min.js'
          ],
          '<%= build %>/lib.js': [
            '<%= src %>/<%= bower_dir %>/angular/angular.min.js',
            '<%= src %>/<%= bower_dir %>/angular-touch/angular-touch.min.js',
            '<%= src %>/<%= bower_dir %>/angular-animate/angular-animate.min.js',
            '<%= src %>/<%= bower_dir %>/angular-loader/angular-loader.min.js',
            '<%= src %>/<%= bower_dir %>/angular-mocks/angular-mocks.min.js',
            '<%= src %>/<%= bower_dir %>/angular-bootstrap/ui-bootstrap.min.js',
            '<%= src %>/<%= bower_dir %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
            '<%= src %>/<%= bower_dir %>/angular-messages/angular-messages.min.js',
            '<%= src %>/<%= bower_dir %>/angular-ui-mask/dist/mask.js',
            '<%= src %>/<%= bower_dir %>/angular-i18n/angular-locale_pt-br.js',
            '<%= src %>/<%= bower_dir %>/angular-translate/angular-translate.min.js',
            '<%= src %>/<%= bower_dir %>/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
            '<%= src %>/<%= bower_dir %>/angular-resource/angular-resource.min.js',
            '<%= src %>/<%= bower_dir %>/angular-loading-bar/build/loading-bar.min.js',
            '<%= src %>/<%= bower_dir %>/firebase/firebase.js',
            '<%= src %>/<%= bower_dir %>/angularfire/dist/angularfire.min.js',
            '<%= src %>/<%= bower_dir %>/ng-table/dist/ng-table.min.js',
            '<%= src %>/<%= bower_dir %>/ng-file-upload/ng-file-upload-all.min.js',
            '<%= src %>/<%= bower_dir %>/angular-toastr/dist/angular-toastr.tpls.min.js',
            '<%= src %>/<%= bower_dir %>/ngSweetAlert/SweetAlert.min.js',
            '<%= src %>/<%= bower_dir %>/sweetalert/dist/sweetalert.min.js',
            '<%= src %>/<%= bower_dir %>/angular-ui-router/release/angular-ui-router.min.js',
            '<%= src %>/<%= bower_dir %>/slug/slug.js'
          ],
          '<%= build %>/app.js': [
            '<%= src %>/components/**/*.js',
            '<%= src %>/services/**/*.js',
            '<%= src %>/views/**/*.js',
            '<%= src %>/app.js'
          ],
          '<%= build %>/assets/css/lib.css': [
            '<%= src %>/<%= bower_dir %>/bootstrap/dist/css/bootstrap.min.css',
            '<%= src %>/<%= bower_dir %>/angular-bootstrap/ui-bootstrap-csp.css',
            '<%= src %>/<%= bower_dir %>/angular-loading-bar/build/loading-bar.min.css',
            '<%= src %>/<%= bower_dir %>/font-awesome/css/font-awesome.min.css',
            '<%= src %>/<%= bower_dir %>/ng-table/dist/ng-table.min.css',
            '<%= src %>/<%= bower_dir %>/angular-toastr/dist/angular-toastr.min.css',
            '<%= src %>/<%= bower_dir %>/sweetalert/dist/sweetalert.css'
          ],
          '<%= build %>/assets/css/app.css': [
            '<%= src %>/components/**/*.css',
            '<%= src %>/assets/css/*.css',
            '<%= src %>/fonts.css',
            '<%= src %>/app.css',
            '<%= src %>/views/**/*.css'
          ]
        }
      }
    },

    /*
     * Uglifies JS files.
     */
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: false
      },
      dist: {
        src: '<%= build %>/app.js',
        dest: '<%= build %>/app.min.js'
      },
      lib: {
        src: '<%= build %>/lib.js',
        dest: '<%= build %>/lib.min.js'
      }
    },

    /*
     * Minifies CSS files.
     */
    cssmin: {
      options: {
        shorthandCompacting: true,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= build %>/assets/css/app.min.css': ['<%= build %>/assets/css/app.css'],
          '<%= build %>/assets/css/lib.min.css': ['<%= build %>/assets/css/lib.css']
        }
      }
    },

    /*
     * Changes JS and CSS imports
     * on minified files
     */
    processhtml: {
      processhtml: {
        files: {
          '<%= build %>/index.html': ['<%= build %>/index.html']
        }
      }
    },

    /*
     * Minifies HTML files.
     */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '<%= build %>',
          src: '**/*.html',
          dest: '<%= build %>'
        }]
      }
    },


    /*
     * Checks JS best practices
     */
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          module: true,
          angular: true,
          firebase: true,
          slug: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: [
          '<%= src %>/app.js',
          '<%= src %>/services/**/*.js',
          '<%= src %>/views/**/*.js',
          '<%= src %>/components/**/*.js'
        ]
      }
    },

    /*
     * Perform tasks when file
     * system changes.
     */
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app']
      }
    }
  });

  /*
   * Loads tasks
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /*
   * Register default task
   */
  grunt.registerTask('default', [
    'clean:pre',
    'copy',
    'concat',
    'uglify',
    'cssmin',
    'processhtml',
    'htmlmin',
    'clean:post'
  ]);
};
