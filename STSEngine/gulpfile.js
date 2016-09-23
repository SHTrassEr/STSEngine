/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');

var nodeJsModuleDeclaration = '\ndeclare module \'stsEngine/server\' { export default STSEngine; }';
var useStrict = '\'use strict\';\n';

gulp.task('ts-server', function () {
    var tsResult = gulp.src(['core/**/*.ts', 'server/**/*.ts'])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'server.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest('out/stsEngine')),
        tsResult.dts.pipe(insert.append(nodeJsModuleDeclaration)).pipe(gulp.dest('out/stsEngine'))
    ])
});
