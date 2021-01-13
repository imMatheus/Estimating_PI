// Just for visual effect, Not needed
const colorPallets = [
    ["#8390FA", "#FAC748", "#1D2F6F", "#F9E9EC"], //Light Blue/ Light Yellows
    ["#EF233C", "#EDF2F4", "#2B2D42", "#3E7CB1"], //Red/White
    ["#2E2E3A", "#F34213", "#D2FDFF", "#BEEE62"], //Orange/Light dark
    ["#EB9486", "#272838", "#F3DE8A", "#7E7F9A"], //Light Pink/Light Dark
    ["#010101", "#69C9D0", "#FFFFFF", "#EE1D52"],
    ["#2B2D42", "#F8F32B", "#DA4167", "#FFFFFF"], //tiktok
]

//gets a random number, used fro the color pallets, (not needed)
const getRandomArbitrary = (min, max) => {
    //in case min or max isn't a integer
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var num = document.getElementById("numberRange").value,
    radius = 100 / num,
    canvas = document.getElementById("canv"),
    context = canvas.getContext("2d"),
    max = canvas.clientWidth

let dots = [],
    colorP = getRandomArbitrary(0, 5)

//sets the color by using 'colorPalltes'
for (let i = 0; i <= 5; i++) {
    document.documentElement.style.setProperty("--color-" + (i + 1), colorPallets[colorP][i])
}

const makeCircle = () => {
    //makes circle centered in the middle of the canvas
    context.beginPath()
    context.lineWidth = 0
    context.arc(max / 2, max / 2, max / 2 - 0, 0, 2 * Math.PI)
    context.fillStyle = colorPallets[colorP][0]
    context.fill()
    context.stroke()
}

function createRandomNodes(num, radius, max) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    makeCircle()
    dots = []
    for (var i = 0; i < num; i++) {
        //creates a dot by giving it a random x and y value, does  numbers gets saved
        //in the "dots" array as a object
        context.beginPath()
        var rand_x = Math.random(i) * max
        var rand_y = Math.random(i) * max
        dots[i] = { xValue: rand_x, yValue: rand_y }
        context.arc(rand_x, rand_y, radius, 0, 2 * Math.PI)
        context.fillStyle = colorPallets[colorP][1]
        context.fill()
        context.closePath()
    }
    return dots
}

const estimatePi = (dotsA) => {
    //where the magic happens
    num_ofDots_inCircle = 0
    for (let i = 0; i < num; i++) {
        distance = Math.sqrt(dotsA[i].xValue ** 2 + dotsA[i].yValue ** 2)
        //we calc the distance by using pythagoras theorem
        //then we check if its less then radius of the circle
        if (distance < 450) {
            num_ofDots_inCircle += 1
        }
    }
    return (4 * num_ofDots_inCircle) / num
}

var estimatePi_Btn = document.getElementById("estimatePi-Btn")
estimatePi_Btn.addEventListener("click", function () {
    numChanged()
    document.getElementById("pi").innerText = estimatePi(dots)
})

const numChanged = () => {
    num = document.getElementById("numberRange").value
    radius = 88 / num + 1
    createRandomNodes(num, radius, max)
    document.getElementById("pi").innerText = estimatePi(dots)
    document.getElementById("numberRangeLabel").innerText = num
}

//we use x to make the frame rate decent. As we we are going to call the numChanged function
//everytime "numberRange" gets moved it will be hard for the computer to manage
//so we only call the function every other time
let x = 0
document.getElementById("numberRange").addEventListener("input", (event) => {
    if (x % 2 === 0) {
        numChanged()
    }
    document.getElementById("numberRangeLabel").innerText = document.getElementById("numberRange").value
    x++
})

numChanged()
