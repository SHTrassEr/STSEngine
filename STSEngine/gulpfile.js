/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');

var nodeJsModuleDeclaration = '\ndeclare module \'stsEngine/server\' { export default STSEngine; }';
var useStrict = '\'use strict\';\n';


var srcCorePath = 'src/Core/**/*.ts';
var srcServerPath = 'src/Server/**/*.ts';
var srcClientPath = 'src/Client/**/*.ts';
var srcTestPath = 'src/Test/**/*.ts';

gulp.task('build-server', function () {
    var tsResult = gulp.src([srcCorePath, srcServerPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'server.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest('out')),
        tsResult.dts.pipe(insert.append(nodeJsModuleDeclaration)).pipe(gulp.dest('out'))
    ]);
});

gulp.task('copy-example', function () {
    return merge([
        gulp.src('out/full.d.ts').pipe(gulp.dest('../STSEngine.Example/lib/stsEngine/'))
    ]);
});

gulp.task('copy-server', function () {
    return merge([
        gulp.src('out/server.*').pipe(gulp.dest('../STSEngine.Server/node_modules/stsEngine/')),
        gulp.src('out/server.*').pipe(gulp.dest('../STSEngine.Server/node_modules/stsEngine.example/node_modules/stsEngine/'))
    ]);
});

gulp.task('copy-client', function () {
    return merge([
        gulp.src('out/client.*').pipe(gulp.dest('../STSEngine.Site/wwwroot/js/stsEngineClient'))
    ]);
});

gulp.task('build-full', function () {
    var tsResult = gulp.src([srcCorePath, srcServerPath, srcClientPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'full.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest('out')),
        tsResult.dts.pipe(gulp.dest('out'))
    ]);
});


gulp.task('build-client', function () {
    var tsResult = gulp.src([srcCorePath, srcClientPath])
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

gulp.task('build-all', ['build-server', 'build-client', 'build-full', 'build-test', 'copy-example', 'copy-server', 'copy-client']);

