/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  
    /*
     * Lê os metadados a partir do arquivo package.json
     */
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      '*/\n',
    src: 'app',
    build: 'dist',
    
    // Task configuration.
    /*
     * Limpa diretório de saída
     */
    clean: {
	  pre: {
	    src: ['<%= build %>/**']
	  },
	  post: {
		src: ['<%= build %>/app.js', '<%= build %>/assets/css/app.css']
	  }
	},
    
    /*
     * Copia arquivos que não sejam HTML, JS ou CSS.
     */
    copy: {
      main: {
        files: [
            {
              expand: true,
              cwd: '<%= src %>',
              src: ['WEB-INF/**',
                    'assets/fonts/**',
                    'assets/images/**',
                    '**/*.html'],
              dest: '<%= build %>/',
              filter: 'isFile'
            },
          ],
        },
    },
    
    /* 
     * Concatena arquivos JS e CSS.
     */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: '\n\n'
      },
      dist: {
        files: {
        	'<%= build %>/app.js': ['<%= src %>/app.js',
                                    '<%= src %>/components/**/*.js',
                                    '<%= src %>/views/**/*.js',
                                    '<%= src %>/services/**/*.js',],
            '<%= build %>/assets/css/app.css': ['<%= src %>/assets/css/*.css',
                                                 '<%= src %>/components/**/*.css',
                                                 '<%= src %>/views/**/*.css']
        }
      }
    },
    
    /* 
     * Minifica arquivos JS.
     */
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: false
      },
      dist: {
        src: '<%= build %>/app.js',
        dest: '<%= build %>/app.min.js'
      }
    },
    
    /* 
     * Minifica arquivos CSS.
     */
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
        	'<%= build %>/assets/css/app.min.css': ['<%= build %>/assets/css/app.css']
        }
      }
    },
    
    /* 
     * Altera os imports JS e CSS para
     * os arquivos minificados.
     */
	processhtml: {
		processhtml: {
	      files: {
	    	  '<%= build %>/index.html': ['<%= build %>/index.html']
	      }
		}
	},
    
    /* 
     * Minifica arquivos HTML.
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
              src: '**/*.html', // FIXME _thiago.bonfim Ignorar bower_components
              dest: '<%= build %>'
		  }]
		}
	},
    
    
    /* 
     * Verifica boas práticas de codificação
     * nos arquivos JS.
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
        	module:true,
        	angular: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['<%= src %>/app.js',
              '<%= src %>/components/**/*.js',
              '<%= src %>/views/**/*.js',
              '<%= src %>/services/**/*.js',]
      }
    },
    
    /* 
     * Executa tarefas ao verificar
     * mudanças no sistema de arquivos.
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
   * Registra tarefas.
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
   * Registra tarefa padrão
   */
  grunt.registerTask('default', ['jshint',
                                 'clean:pre',
                                 'copy',
                                 'concat',
                                 'uglify',
                                 'cssmin',
                                 'processhtml',
                                 'htmlmin',
                                 'clean:post']);
};