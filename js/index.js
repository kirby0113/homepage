const result = document.querySelectorAll('.content');
let body = document.querySelector("body");
let actionWaitFrame = 3000; //アニメーション終了後に待機する時間

let cubeAnime;//背景で四角を動かす用のアニメ－ション用
let cubenum = 100;
let cubeAnimeNow = false;


for (let j = result.length - 1; j >= 0; j--) {
    let textWrapper = document.querySelector(`.c${j}`);
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, `<div class='letter letter-${j}'>$&</div>`);
    texts = document.querySelectorAll(`.letter-${j}`);
    for (let k = 0; k < texts.length; k++) {
        texts[k].classList.add(`unit-${k}`);
    }
    result[j].addEventListener("mouseover", function () { //該当のテキストにマウスが触れた時に文字を動かすアニメーションを行う
        if (!textWrapper.classList.contains("wait")) {
            textWrapper.classList.add("wait");
            con = document.querySelectorAll(`.letter-${j}`);
            let animation = anime.timeline({
            });
            for (let k = 0; k < con.length; k++) {
                let el = document.querySelector(`.letter-${j}.unit-${k}`);
                console.log(el);
                animation.add({
                    targets: el,
                    translateY: "-1.1em",
                    translateZ: 0,
                    //direction: "alternate",
                    duration: 300,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        anime({
                            targets: el,
                            translateY: 0,
                            translateZ: 0,
                            //direction: "alternate",
                            duration: 300,
                            easing: 'easeInOutQuad'
                        });
                    }
                }, k === 0 ? "-=10" : "-=180")
            }
            animation.add({
                complete: () => { //アニメーションが終わった後は連続でアニメーションしないように一定時間をとる
                    let time = 0;
                    while (time < actionWaitFrame) {
                        time++;
                    }
                    textWrapper.classList.remove("wait");
                }
            });
            animation.play();
        }
    });

    result[j].addEventListener("mouseout", function () {
    })
}

$(function () { //メニューボタンを押したときにメニューバーを表示する処理
    $('.menu').click(function () {
        if ($('.menu-bar').hasClass('off')) {
            $('.menu-bar').removeClass('off');
            $('.menu-bar').animate({ 'right': '-20vw' }, 1000);
            anime({
                targets: '.menu',
                translateX: 0,
                rotate: '0turn',
                duration: 8000
            });

        } else {
            $('.menu-bar').addClass('off');
            $('.menu-bar').animate({ 'right': '1vw' }, 1000);
            anime({
                targets: '.menu',
                translateX: '-21vw',
                rotate: '-2turn',
                duration: 8000
            });

        }

    });

});


function createCube(n) { //アニメーション用図形の表示 
    let div = document.createElement("div");
    let size = Math.trunc(Math.random() * 20) + 10;
    let borderColorT = [Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255)];
    let borderColorB = [Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255)];
    let radius = Math.trunc(Math.random() * 15);
    div.classList.add("cube");
    div.classList.add(`cube-${n}`);
    div.style.width = `${size}vh`;
    div.style.height = `${size}vh`;
    // div.style.borderLeftRadius = `${radius}px`;
    // div.style.borderRightRadius = `${radius}px`;
    div.style.bottom = `${70 + Math.trunc(Math.random() * 100)}vh`;
    div.style.left = `${Math.trunc(Math.random() * 100) - 10}vw`;
    div.style.borderLeftColor = `rgb(${borderColorT[0]}, ${borderColorT[1]}, ${borderColorT[2]},1)`;
    div.style.borderRightColor = `rgb(${borderColorB[0]}, ${borderColorB[1]}, ${borderColorB[2]},1)`;
    div.style.setProperty('--cube-gradient', `rgb(${borderColorT[0]},${borderColorT[1]},${borderColorT[2]}),rgb(${borderColorB[0]},${borderColorB[1]},${borderColorB[2]})`);
    div.style.setProperty('--radius', `${radius}px`);
    div.style.setProperty('--size', `${size}vh`);
    div.style.scale = `${0.5 + Math.trunc(Math.random())}`;
    body.appendChild(div);
    return div;  //アニメーション付与のためにオブジェクトを返しておく 

}

function createCubeAnimation() {
    cubeAnimeNow = true;
    let cubes = [];
    let animes = anime.timeline({});
    let number = cubenum + Math.trunc(Math.random() * 100); //生成数

    for (let i = 0; i < number; i++) {
        //  animes.push(anime.timeline({}));
        cubes.push(createCube(i));
        animes.add({
            targets: cubes[i],

            translateX: Math.trunc(Math.random() * 2000) - 1000,
            translateY: Math.trunc(Math.random() * 1000) + 300,
            translateZ: 0,
            easing: 'easeInOutQuad',
            rotate: "3turn", //`${Math.trunc(Math.random() * 5) + 1}`,
            opacity: [0, 0.8, 0],// - Math.random() * 0.3,
            duration: 8000 + Math.trunc(Math.random() * 20000),
            complete: () => {
                removec = document.querySelector(`.cube-${i}`);
                body.removeChild(removec);

                if (i == number - 1) {
                    cubes = [];
                    cubeAnimeNow = false;
                }
            }
        }, i === 0 ? "-=10" : `-=${10000 + Math.trunc(Math.random() * 10000)}`);
    }
    animes.play;

}

setInterval(function () {
    if (cubeAnimeNow === false) createCubeAnimation();
}, 100);

window.scroll(-100, 0);
