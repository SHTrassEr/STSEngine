/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');

var nodeJsModuleDeclaration = '\ndeclare module \'stsEngine.example/server\' { export default STSEngine.Example; }';
var useStrict = '\'use strict\';\n';

var importJsModule = 'var STSEngine = require(\'stsEngine/server\');';


var srcCorePath = 'src/Core/**/*.ts';
var srcServerPath = 'src/Server/**/*.ts';
var srcClientPath = 'src/Client/**/*.ts';
var srcTestPath = 'src/Test/**/*.ts';
var libPath = 'lib/**/*.d.ts';

gulp.task('build-server', function () {
    var tsResult = gulp.src([libPath, srcCorePath, srcServerPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'server.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict + importJsModule)).pipe(gulp.dest('out')),
        tsResult.dts.pipe(insert.append(nodeJsModuleDeclaration)).pipe(gulp.dest('out'))
    ]);
});

gulp.task('copy-server', ['build-server'], function () {
    return merge([
        gulp.src('out/server.*').pipe(gulp.dest('../STSEngine.Server/node_modules/stsEngine.example/'))
    ]);
});

gulp.task('copy-client', ['build-client'], function () {
    return merge([
        gulp.src('out/client.*').pipe(gulp.dest('../STSEngine.Site/wwwroot/js/stsEngineExample/'))
    ]);
});


gulp.task('build-client', function () {
    var tsResult = gulp.src([libPath, srcCorePath, srcClientPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'client.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest('out')),
        tsResult.dts.pipe(gulp.dest('out'))
    ]);
});


gulp.task('build-test', function () {
    var tsResult = gulp.src([srcTestPath])
        .pipe(ts({
            declaration: false,
            removeComments: true,
            target: 'es6',
            outFile: 'test.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest('out/test'))
    ]);
});

gulp.task('build-all', ['build-server', 'build-client', 'build-test', 'copy-server', 'copy-client']);

