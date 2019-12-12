
var gulp = require("gulp")
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var javascriptObfuscator = require("gulp-javascript-obfuscator");

// gulp.src(["../build/web-mobile/**/*.png"])
// .pipe(imagemin([
//     //imagemin.gifsicle({interlaced: true}),
//     imagemin.jpegtran({progressive: true}),
//     imagemin.optipng({optimizationLevel: 5})
// ]))
// .pipe(gulp.dest("../build/web-mobile/"))
// .on("end", ()=>{
//     console.log('图片处理结束')
// });



var dealImage = async function(){
    return new Promise((resolve,reject)=>{
        try {
            var step1 = gulp.src(["../build/web-mobile/**/*.png"])
            var step2 = step1.pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}) 
            ]))
            var step3 = step2.pipe(gulp.dest("../build/web-mobile/"))
            step3.on("end", ()=>{
                console.log("处理图片结束")
                resolve(true)
            });
        } catch (error) {
            console.log("处理图片错误:",error)
            resolve(false)
        }
    })
}

var dealHtml = async function(){
    return new Promise( function(resolve,reject){
        try{
            gulp.src("../build/web-mobile/*.html")
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true
            }))
            .pipe(gulp.dest("../build/web-mobile/")
            .on("end", ()=>{
                console.log('处理网页结束')
                resolve(true)
            }));
        }catch(e){
            console.log(e)
            resolve(false)
        }
    }) 
}




var dealJsc = async function(){
    return new Promise((resolve,reject)=>{
        try {
            gulp.src(["../build/web-mobile/src/*.js"])
            .pipe(javascriptObfuscator({
                compact: true,
                domainLock: [".zz-game.com"],
                mangle: true,
                rotateStringArray: true,
                selfDefending: true,
                stringArray: true,
                target: "browser"
            }))
            .pipe(gulp.dest("../build/web-mobile/src")
            .on("end", ()=>{
                console.log('处理代码结束')
                resolve(true)
            }));
        } catch (error) {
            resolve(false)
        }
    })
}

let deal = async function(){
    //let dealImageOk = await dealImage()
    let dealHtmlOk = await dealHtml()
    let dealJscOk = await dealJsc()
}

deal()