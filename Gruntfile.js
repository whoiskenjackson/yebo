module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	grunt.initConfig({
		// Project settings
        config: {
            // Configurable paths
            dev: 'dev',
            built: 'built'
        },

		watch: {
		    hbs: {
				files: ['<%= config.dev %>/hbs/**/{,*/}*.hbs', '<%= config.dev %>/js/helpers/**/{,*/}*.js', '<%= config.dev %>/js/content/*.json'],
				tasks: ['compile-handlebars'],
				options: {
					reload: true,
					nospawn: true
				}
			},
		    
		    css: {
				files: ['<%= config.dev %>/css/**/{,*/}*.scss'],
				tasks: ['sass','newer:autoprefixer:dist'],
				options: {
					reload: true,
					nospawn: true
				}
			},
			
			js: {
				files: ['<%= config.dev %>/js/**/{,*/}*.js'],
				tasks: ['browserify'],
				options: {
					reload: true,
					nospawn: true
				}
			}
		},

		sass: {
			options: {
				style: 'expanded',
				sourcemap: 'none',
				precision: 7,
				lineNumbers: true,
				loadPath: '<%= config.dev %>/css/',
				trace: true,
				update: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.dev %>/css/',
					src: ['**/{,*/}*.scss'],
					dest: '<%= config.built %>/css/',
					ext: '.css'
				}]
			}
		},
		
        'compile-handlebars': {
            globbedTemplateAndOutput: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dev %>/hbs/',
                    src: '*.hbs',
                    dest: '<%= config.built %>/',
                    ext: '.html'
                }],
                templateData: '<%= config.dev %>/js/content/content.json',
                helpers: '<%= config.dev %>/js/helpers/**/{,*/}*.js',
                partials: '<%= config.dev %>/hbs/partials/**/{,*/}*.hbs'
            },
        },
        
        browserify: {
            dist: {
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '<%= config.dev %>/js/',
                    src: ['*.js'], // Actual pattern(s) to match.
                    dest: '<%= config.built %>/js/',
                    ext: '.js',   // Dest filepaths will have this extension.
                    extDot: 'first'   // Extensions in filenames begin after the first dot
                }]
            }
        },

		autoprefixer: {
            dist: {
            	files: [{
	            	expand: true,
					cwd: '<%= config.built %>/css/',
					src: '**/{,*/}*.css',
					dest: '<%= config.built %>/css/'
				}]
            }
        },

        cssmin: {
        	options: {
        		report: 'gzip'
        	},
			dist: {
				files: [{
				expand: true,
					cwd: '<%= config.built %>/css/',
					src: ['**/{,*/}.css'],
					dest: '<%= config.built %>/css'
				}]
			}
		},

        uglify: {
			options: {
				compress: {
					drop_console: true
				},
				report: 'gzip'
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.built %>/js/',
					src: '**/{,*/}*.js',
					dest: '<%= config.built %>/js',
					ext: '.min.js'
				}]
			}
        },

		imagemin: {
			dist: {
				options: {
					optimizationLevel: 4
				},
				files: [{
					expand: true,
					cwd: '<%= config.built %>/images/',
					src: ['*.{png,jpg,gif}'],
					dest: '<%= config.built %>/images'
				}]
			}
		},
		
        sass_imagemapper: {
            all: {
                files:[{
                    cwd: '<%= config.built %>/images/',
					src: ['**/{,*/}*.{png,jpg,gif}'],
                    dest: '<%= config.dev %>/css/_imagemap.scss'
                }],
                options:{
                    prefix: ""
                }
            }
        },

	});

	grunt.registerTask('default');
	grunt.registerTask('build', ['autoprefixer', 'cssmin', 'uglify', 'imagemin']);
	grunt.registerTask('map', ['sass_imagemapper']);

};