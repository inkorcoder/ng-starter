/*--------------------------- variables --------------------------*/

var PATH = '',
		OPTIONS = {
			serverHost: 'localhost',
			serverPort: 1111,
			serverLivereload: true,
			coffeeWraping: true,
			notices: true
		};

/*---------------------------- modules ----------------------------*/

var fs 						= require('fs'),
		gulp 					= require('gulp'),
		connect 			= require('gulp-connect'),
		coffee 				= require('gulp-coffee'),
		sass 					= require('gulp-sass'),
		clean 				= require('gulp-clean'),
		colors 				= require('colors'),
		fileinclude 	= require('gulp-include'),
		cssmin 				= require('gulp-cssmin'),
		rename 				= require('gulp-rename'),
		plumber 			= require('gulp-plumber'),
		autoprefixer 	= require('gulp-autoprefixer'),
		jsmin 				= require('gulp-minify'),
		concat 				= require('gulp-concat'),
		zip 					= require('gulp-zip'),

		// notifications
		exec = require("child_process").exec;

/*---------------------------- helpers ----------------------------*/

// notifications function
var execute = function(command, callback){
	exec(command, function(error, stdout, stderr){
		if (callback){
			callback(stdout);
		}
	});
};

// console log for SASS task
var logSASS = function(err) {
	var mess = err.message.replace(/(\n|\r|Current dir:)/gim, '');
	if (OPTIONS.notices === true) {
		execute("notify-send 'SASS' '" + mess + "' -i dialog-no", function() {});
	}
	return console.log("\n\r"+
		colors.grey("[ ")+(colors.red('ERROR!'))+colors.grey(" ]")+" SASS\r\n"+
		(colors.red(mess))+"\r\n"
	);
};

// console log for CoffeeScript task
var logCoffeeScript = function(err) {
	var mess = err.message.replace(/(\n|\r|Current dir:)/gim, '');
	if (OPTIONS.notices === true) {
		execute("notify-send 'Coffeescript' '" + err.message + "\r\n → " + (err.stack.substr(0, err.stack.indexOf('error:'))) + "'  -i dialog-no", function() {});
	}
	return console.log("\n\r"+
		colors.grey("[ ")+(colors.red('ERROR!'))+colors.grey(" ]")+" CoffeeScript\r\n"+
		colors.red(mess)+colors.red(err.stack)+"\n\r"
	);
};

/*----------------------------- tasks ----------------------------*/

// console log for SASS task
gulp.task('connect', function(){
	connect.server({
		host: OPTIONS.serverHost,
		port: OPTIONS.serverPort,
		livereload: {
			port: 2233
		},
		root: [PATH+'dist',PATH+'dev-tools',PATH+'scss',PATH+'server']
	});
});

// SASS compilation
gulp.task('SASS', function(){
	return gulp.src([
			PATH+'src/app/variables.scss',
			PATH+'src/app/components/*.scss'
		])
		.pipe(plumber({
			errorHandler: function(err){
				logSASS(err);
			}
		}))
		.pipe(concat('dist/bundle.scss'))
		.pipe(gulp.dest(PATH))
});

gulp.task('CSS', ['SASS'], function(){
	gulp.src(PATH+'dist/bundle.scss')
		.pipe(plumber({
			errorHandler: function(err){
				logSASS(err);
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
			browsers: [
				'Chrome > 30', 'Firefox > 20', 'iOS > 5', 'Opera > 12',
				'Explorer > 8', 'Edge > 10']
		}))
		.pipe(cssmin())
		.pipe(gulp.dest(PATH+'dist'))
		.pipe(connect.reload())
});

gulp.task('Js', function(){
	gulp.src(PATH+'dist/**/*.js').pipe(connect.reload())
});

gulp.task('HTML', function(){
	gulp.src(PATH+'dist/**/*.html').pipe(connect.reload())
});

// watch task
gulp.task('Watch-dev', function(){
	gulp.watch(PATH+'src/**/*.scss', 					['CSS']);
	gulp.watch(PATH+'dist/**/*.js', 					['Js']);
	gulp.watch(PATH+'dist/**/*.html', 				['HTML']);
});


gulp.task('default', [
	'SASS',
	'CSS',
	'connect',
	'Watch-dev'
], function(){
	execute("notify-send 'Gulp.js' 'Production mode' -i dialog-apply");
});