const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const spawn = require('child_process').spawn;
let node = null;

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');


gulp.task('server', ['scripts'], function() {
  if (node){ 
    node.kill();
  }
  node = spawn('node', ['dist/index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('scripts', function() {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], function() {
  gulp.watch('src/**/*.ts', ['server']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['server', 'watch', 'assets']);

process.on('exit', function() {
  if (node) {
      node.kill();
  }
});