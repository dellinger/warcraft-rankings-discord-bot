var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var nodemon = require("gulp-nodemon");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var exec = require('child_process').exec;

gulp.task('default', ['build']);
gulp.task('build', ['compile']);
gulp.task('start', ['nodestart']);

gulp.task('clean', ['clean_js_files','clean_map_files'], function () {
  return del('dist/**/*');
});

gulp.task('clean_js_files', function() {
  return del('src/**/*.js')
});

gulp.task('clean_map_files', function() {
  return del('src/**/*.map');
});

// TypeScript compile / transpile
gulp.task('compile', ['clean'], function (cb) {
  return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject)).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist"));
});

gulp.task('nodestart',["build"], function (cb) {
  exec('node dist/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})


gulp.task('develop',['compile'], function () {
  nodemon({
    script: 'dist/index.js',
    ext: 'ts',
    env: { 'NODE_ENV': 'development',
    tasks: ['compile']}
  }).on('restart',['compile'], function () {
      console.log('restarted!')
    })
})


