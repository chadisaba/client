var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('min-common-data', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/data/*.js')
   .pipe(concat('data.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});

gulp.task('min-common-direct', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/direct/*.js')
   .pipe(concat('direct.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-ext-ux-filterWidget', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/ext/ux/filterWidget/*.js')
   .pipe(concat('filterWidget.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-ext-ux-inputs', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/ext/ux/inputs/*.js')
   .pipe(concat('inputs.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});

gulp.task('min-common-func', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/func/*.js')
   .pipe(concat('func.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});

gulp.task('min-common-localization', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/localization/*.js')
   .pipe(concat('localization.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-plugins', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/plugins/*.js')
   .pipe(concat('plugins.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-plugins-combobox', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/plugins/combobox/*.js')
   .pipe(concat('combobox.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-plugins-form', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/plugins/form/*.js')
   .pipe(concat('form.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-plugins-grid', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/plugins/grid/*.js')
   .pipe(concat('grid.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-plugins-tree', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/plugins/tree/*.js')
   .pipe(concat('tree.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-uiHelper', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/uiHelper/*.js')
   .pipe(concat('uiHelper.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-utility', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/utility/*.js')
   .pipe(concat('utility.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-ux-window', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/ux/window/*.js')
   .pipe(concat('ux.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});
gulp.task('min-common-vtype', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/vtype/*.js')
   .pipe(concat('vtype.js'))
   .pipe(uglify())
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/'));
});

gulp.task('concat-common', function(){
   gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/prebuild/*.js')
   .pipe(concat('common.js'))
   .pipe(gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/commonBuild/'));
});


gulp.task('default', ['min-common-data', 'min-common-direct','min-common-ext-ux-filterWidget','min-common-ext-ux-inputs','min-common-func','min-common-localization','min-common-plugins','min-common-plugins-combobox',
'min-common-plugins-form',
'min-common-plugins-grid',
'min-common-plugins-tree',
'min-common-uiHelper','min-common-utility','min-common-ux-window','min-common-vtype','concat-common']);

/*var gulp = require('gulp');,
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', function (cb) {
  pump([
        gulp.src('C:/wamp5.5/www/nodejs_extjs_project/client_ch/Common/*.js'),
        uglify(),
        gulp.dest('C:/wamp5.5/www/nodejs_extjs_project/client_ch/dist/foo.min.js')
      ],
      cb
  );
});*/