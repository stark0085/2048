let tile = Array.from(document.getElementsByClassName("tile"))
let score = document.getElementsByClassName('score')[0]
let points = 0
score.innerHTML = 'Score = ' + points
let highscore = document.getElementsByClassName('highscore')[0]

if (!(localStorage.getItem('HighScore'))) {
    localStorage.setItem('HighScore', '0')
}

highscore.innerHTML = 'Highest Score = ' + localStorage.getItem('HighScore')

//Randomly generate 2 in one of the empty box 
const populate = () => {
    let check = 0;
    let arrlen = 0;
    for (let i = 0; i < 16; i++) {
        if (tile[i].innerHTML === '') {
            arrlen++;
        }
    }
    let storeIndex = new Array(arrlen)
    let j = 0;
    for (let i = 0; i < 16; i++) {
        if (tile[i].innerHTML === '') {
            storeIndex[j++] = i;
        }
    }
    let randInt = Math.floor(Math.random() * arrlen)
    tile[storeIndex[randInt]].innerHTML = 2;
}
setTimeout(() => {
    populate()
}, 100);

//Check the color of the box 
const color = () => {
    let classes = ['red', 'cyan', 'orange', 'darkgoldenrod', 'coral', 'cornflowerblue', 'crimson', 'lightgreen', 'cornsilk', 'darkgreen', 'magenta', 'grey']
    Array.from(document.getElementsByClassName('tile')).forEach(element => {
        classes.forEach(e => {
            element.classList.remove(e)
        });
        if (element.innerHTML === '2') {
            element.classList.add('red')
        }
        if (element.innerHTML === '4') {
            element.classList.add('cyan')
        }
        if (element.innerHTML === '8') {
            element.classList.add('orange')
        }
        if (element.innerHTML === '16') {
            element.classList.add('darkgoldenrod')
        }
        if (element.innerHTML === '32') {
            element.classList.add('coral')
        }
        if (element.innerHTML === '64') {
            element.classList.add('cornflowerblue')
        }
        if (element.innerHTML === '128') {
            element.classList.add('crimson')
        }
        if (element.innerHTML === '256') {
            element.classList.add('lightgreen')
        }
        if (element.innerHTML === '512') {
            element.classList.add('cornsilk')
        }
        if (element.innerHTML === '1024') {
            element.classList.add('darkgreen')
        }
        if (element.innerHTML === '2048') {
            element.classList.add('magenta')
        }
        if (element.innerHTML === '') {
            element.classList.add('grey')
        }
    });
}
setTimeout(() => {
    color()
}, 101);

//Checking highscore 
const checkHighscore = () => {
    let prevHighscore = parseInt(localStorage.getItem('HighScore'))
    console.log(prevHighscore)
    if (points > prevHighscore) {
        alert('Congrats!! You have created a new, HIGH SCORE = ' + points)
        localStorage.setItem('HighScore', `${points}`)
        highscore.innerHTML = 'Highest Score = ' + points
    }
}

//Checking if the game has ended 
const gameover = () => {
    let lindex, rindex, uindex, dindex
    let backcheck = false;
    let checkAlert = true;
    for (let i = 0; i < 16; i++) {
        lindex = i - 1;
        rindex = i + 1;
        uindex = i - 4;
        dindex = i + 4;
        if ((lindex >= 0 && tile[i].innerHTML === tile[lindex].innerHTML) || (rindex < 16 && tile[i].innerHTML === tile[rindex].innerHTML) || (uindex >= 0 && tile[i].innerHTML === tile[uindex].innerHTML) || (dindex < 16 && tile[i].innerHTML === tile[dindex].innerHTML)) {
            backcheck = true;
        }
        if (backcheck) {
            checkAlert = false;
            break;
        }
    }
    for (let i = 0; i < 16; i++) {
        if (tile[i].innerHTML === '') {
            checkAlert = false;
        }
    }
    if (checkAlert) {
        checkHighscore()
        setTimeout(() => {
            alert("The Game has ENDED!! Your Total Score is " + points)
        }, 500);
        let buttons = document.getElementsByClassName('btn')
        Array.from(buttons).forEach(e => {
            e.disabled = true;
        });
    }
}

//Movement
const move = () => {
    let up = document.getElementById('up')
    let down = document.getElementById('down')
    let left = document.getElementById('left')
    let right = document.getElementById('right')
    let lindex, rindex, uindex, dindex
    up.addEventListener("click", () => {
        for (let i = 0; i < 16; i++) {
            uindex = i - 4;
            if (tile[i].innerHTML !== '' && uindex >= 0) {
                if (tile[i].innerHTML === tile[uindex].innerHTML) {
                    tile[uindex].innerHTML = parseInt(tile[uindex].innerHTML) + parseInt(tile[i].innerHTML)
                    points = points + parseInt(tile[uindex].innerHTML)
                    tile[i].innerHTML = ''
                    color()
                }
            }
        }
        let nextind, m;
        for (let i = 0; i < 16; i++) {
            if (tile[i].innerHTML === '') {
                m = 0;
                nextind = m + 1;
                let indarr = [i, i + 4, i + 8, i + 12]
                while (1) {
                    if (tile[indarr[nextind]] === undefined || m === 3) {
                        break;
                    }
                    if (tile[indarr[nextind]].innerHTML !== '') {
                        tile[indarr[m]].innerHTML = tile[indarr[nextind]].innerHTML
                        tile[indarr[nextind]].innerHTML = ''
                        m++;
                    }
                    else {
                        nextind++;
                    }
                    color()
                }
            }
        }
        for (let i = 0; i < 16; i++) {
            uindex = i - 4;
            if (tile[i].innerHTML !== '' && uindex >= 0) {
                if (tile[i].innerHTML === tile[uindex].innerHTML) {
                    tile[uindex].innerHTML = parseInt(tile[uindex].innerHTML) + parseInt(tile[i].innerHTML)
                    points = points + parseInt(tile[uindex].innerHTML)
                    tile[i].innerHTML = ''
                    color()
                }
            }
        }
        score.innerHTML = 'Score = ' + points
        setTimeout(() => {
            populate()
            color()
        }, 200);
        color()
        gameover()
    })
    down.addEventListener("click", () => {
        for (let i = 15; i >= 0; i--) {
            dindex = i - 4;
            if (tile[i].innerHTML !== '' && dindex > -1) {
                if (tile[i].innerHTML === tile[dindex].innerHTML) {
                    tile[i].innerHTML = parseInt(tile[dindex].innerHTML) + parseInt(tile[i].innerHTML)
                    points = points + parseInt(tile[i].innerHTML)
                    tile[dindex].innerHTML = ''
                    color()
                }
            }
        }
        let nextind, m;
        for (let i = 15; i >= 0; i--) {
            color()
            if (tile[i].innerHTML === '') {
                m = 0;
                nextind = m + 1;
                let indarr = [i, i - 4, i - 8, i - 12]
                while (1) {
                    if (tile[indarr[nextind]] === undefined || m === 3) {
                        break;
                    }
                    if (tile[indarr[nextind]].innerHTML !== '') {
                        tile[indarr[m]].innerHTML = tile[indarr[nextind]].innerHTML
                        tile[indarr[nextind]].innerHTML = ''
                        m++;
                    }
                    else {
                        nextind++;
                    }
                }
            }
        }
        for (let i = 15; i >= 0; i--) {
            dindex = i - 4;
            if (tile[i].innerHTML !== '' && dindex > -1) {
                if (tile[i].innerHTML === tile[dindex].innerHTML) {
                    tile[i].innerHTML = parseInt(tile[dindex].innerHTML) + parseInt(tile[i].innerHTML)
                    points = points + parseInt(tile[i].innerHTML)
                    tile[dindex].innerHTML = ''
                    color()
                }
            }
        }
        score.innerHTML = 'Score = ' + points
        setTimeout(() => {
            populate()
            color()
        }, 200);
        color()
        gameover()
    })
    left.addEventListener("click", () => {
        for (let i = 0; i < 16; i++) {
            lindex = i - 1;
            if (tile[i].innerHTML !== '' && lindex >= 0 && i % 4 !== 0) {
                if (tile[i].innerHTML === tile[lindex].innerHTML) {
                    tile[lindex].innerHTML = (parseInt(tile[lindex].innerHTML) + parseInt(tile[i].innerHTML)).toString()
                    points = points + parseInt(tile[lindex].innerHTML)
                    tile[i].innerHTML = ''
                }
                color()
            }
        }
        for (let i = 0; i < 16; i = i + 4) {
            m = 0;
            nextind = 1;
            let indarr = [i, i + 1, i + 2, i + 3]
            while (1) {
                if (nextind === 4) {
                    break;
                }
                if (tile[indarr[m]].innerHTML === '') {
                    if (tile[indarr[nextind]].innerHTML !== '') {
                        tile[indarr[m]].innerHTML = tile[indarr[nextind]].innerHTML
                        tile[indarr[nextind]].innerHTML = ''
                        m++;
                        nextind++;
                        color()
                    }
                    else {
                        nextind++;
                    }
                }
                else {
                    m++;
                    nextind++;
                }
            }
            color()
        }
        for (let i = 0; i < 16; i++) {
            lindex = i - 1;
            if (tile[i].innerHTML !== '' && lindex >= 0 && i % 4 !== 0) {
                if (tile[i].innerHTML === tile[lindex].innerHTML) {
                    tile[lindex].innerHTML = (parseInt(tile[lindex].innerHTML) + parseInt(tile[i].innerHTML)).toString()
                    points = points + parseInt(tile[lindex].innerHTML)
                    tile[i].innerHTML = ''
                }
                color()
            }
        }
        score.innerHTML = 'Score = ' + points
        setTimeout(() => {
            populate()
            color()
        }, 200);
        color()
        gameover()
    })
    right.addEventListener("click", () => {
        for (let i = 0; i < 16; i++) {
            rindex = i + 1;
            if (tile[i].innerHTML !== '' && rindex < 16 && i % 4 !== 3) {
                if (tile[i].innerHTML === tile[rindex].innerHTML) {
                    tile[rindex].innerHTML = parseInt(tile[rindex].innerHTML) + parseInt(tile[i].innerHTML)
                    points = points + parseInt(tile[rindex].innerHTML)
                    tile[i].innerHTML = ''
                    color()
                }
            }
        }
        let nextind, m;
        for (let i = 15; i >= 0; i = i - 4) {
            m = 0;
            nextind = 1;
            let indarr = [i, i - 1, i - 2, i - 3]
            while (1) {
                if (nextind === 4) {
                    break;
                }
                if (tile[indarr[m]].innerHTML === '') {
                    if (tile[indarr[nextind]].innerHTML !== '') {
                        tile[indarr[m]].innerHTML = tile[indarr[nextind]].innerHTML
                        tile[indarr[nextind]].innerHTML = ''
                        m++;
                        nextind++;
                        color()
                    }
                    else {
                        nextind++;
                    }
                }
                else {
                    m++;
                    nextind++;
                }
            }
            color()
        }
        for (let i = 0; i < 16; i++) {
            rindex = i + 1;
            if (tile[i].innerHTML !== '' && rindex < 16 && i % 4 !== 3) {
                if (tile[i].innerHTML === tile[rindex].innerHTML) {
                    tile[rindex].innerHTML = parseInt(tile[rindex].innerHTML) + parseInt(tile[i].innerHTML)
                    points = points + parseInt(tile[rindex].innerHTML)
                    tile[i].innerHTML = ''
                    color()
                }
            }
        }
        score.innerHTML = 'Score = ' + points
        setTimeout(() => {
            populate()
            color()
        }, 200);
        color()
        gameover()
    })
}
move()

let restart = document.getElementById('restart')
restart.addEventListener("click", () => {
    checkHighscore()
    tile.forEach(element => {
        element.innerHTML = ''
        points = 0;
        score.innerHTML = 'Score = ' + points;
    });
    color()
    setTimeout(() => {
        populate()
        color()
    }, 500);
})
