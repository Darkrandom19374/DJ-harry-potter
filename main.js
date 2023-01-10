var song = ""

var leftWrist = 0
var leftWristX = 0
var leftWristY = 0
var scoreleftWrist = 0


var rightWrist = 0
var rightWristX = 0
var rightWristY = 0
var scorerRightWrist = 0

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600,500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on("pose", gotposes)
}

function gotposes(result) {
    if (result.length>0) {
       console.log(result)
       scoreleftWrist = result[0].pose.keypoints[9].score
       scorerRightWrist = result[0].pose.keypoints[10].score
       console.log("score L = " + scoreleftWrist)
       console.log("score R = " + scorerRightWrist)

       leftWristX = result[0].pose.leftWrist.x
       leftWristY = result[0].pose.leftWrist.y
       console.log(leftWristX)
       console.log(leftWristY)

       rightWristX = result[0].pose.rightWrist.x
       rightWristY = result[0].pose.rightWrist.y
       console.log(rightWristX)
       console.log(rightWristY)
    }
}

function modelLoaded() {
    console.log("El modelo esta functionando")
}

function draw() {
    image(video,0,0,600,500) 

    fill("#ff0000")
    stroke("#000000")

    if(scorerRightWrist>0.2) {
    circle(rightWristX,rightWristY,50)
     
    if(rightWristY>0 && rightWristY <= 100)  {
    document.getElementById("speed").innerHTML = "velocidad = 0.5";
    song.rate(0.5)
    }
    else if(rightWristY>100 && rightWristY<= 200) {
    document.getElementById("speed").innerHTML = "velocidad = 1";
    song.rate(1)
    }
    else if(rightWristY>200 && rightWristY<= 300) {
    document.getElementById("speed").innerHTML = "velocidad = 1.5";
    song.rate(1.5)
    }
    else if(rightWristY>300 && rightWristY<= 400) {
    document.getElementById("speed").innerHTML = "velocidad = 2";
    song.rate(2)
    }
    else if(rightWristY>400 && rightWristY<= 500) {
    document.getElementById("speed").innerHTML = "velocidad = 2.5";
    song.rate(2.5)
    }
    }

    if(scoreleftWrist>0.2) {

    circle(leftWristX,leftWristY,50)
    InNumberleftWristY = Number(leftWristY)
    remove_decimal = floor(InNumberleftWristY*2)
    volumen = remove_decimal/1000
    document.getElementById("volumen").innerHTML = "volumen = " + volumen
    song.setVolume(volumen)
     }
}

function Play() {
    song.play();
    song.setVolume(1)
    song.rate(1)
}

