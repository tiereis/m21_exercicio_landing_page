const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const paths = {
    html: './src/html/**/*.html',
    scss: './src/scss/**/*.scss',
    cssDest: './dist/css',
    js: './src/js/**/*.js',
    jsDest: './dist/js',
    images: './src/images/**/*',
    imagesDest: './dist/images'
};

// Task para compilar SASS
function compileSass() {
    return gulp.src(paths.scss)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.cssDest));
}

// Task para comprimir JavaScript
function compressJs() {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.jsDest));
}


// Task para copiar HTML (já que não há processamento, apenas copia)
function copyHtml() {
    return gulp.src(paths.html)
        .pipe(gulp.dest('./dist'));
}

// Watcher para observar mudanças
function watchFiles() {
    gulp.watch(paths.scss, compileSass);
    gulp.watch(paths.js, compressJs);
    gulp.watch(paths.html, copyHtml); // Observa e copia HTML
    gulp.watch(paths.images, optimizeImages); // Observa e otimiza imagens (se houver)
}

exports.default = gulp.series(
    gulp.parallel(copyHtml, compileSass, compressJs), // Garante que tudo seja processado no início
    watchFiles
);

exports.build = gulp.series(
    gulp.parallel(copyHtml, compileSass, compressJs)
);