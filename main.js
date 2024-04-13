song="";
leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modeloaded);
    posenet.on('pose', gotposes);
}
function modeloaded(){
    console.log("model is loaded")
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw(){
    image(video,0,0,600,500);
    stroke("red");
    fill("red");
    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy,30);
        numleftwristy = Number(leftwristy);
        foor = floor(numleftwristy);
        volume = foor/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "volume: "+volume;
    }
    fill("red");
    stroke("red");
    if(scorerightwrist > 0.2){
        circle(rightwristx,rightwristy,30);
    if(rightwristy >= 0 && rightwristy < 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightwristy > 100 && rightwrsity <= 200){
        song.rate(1);
        document.getElementById("speed").innerHTML = "speed = 1x";
    }
    else if(rightwristy > 200 && rightwristy <= 300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "speed = 1.5x";
    }
    else if(rightwristy > 300 && rightwristy <= 400){
        song.rate(2);
        document.getElementById("speed").innerHTML = "speed = 2x";
    }
    else if(rightwristy > 400 && rightwristy <= 500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "speed = 2.5x";
    }
}
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("the x of the left wrist is "+leftwristx+" the y of the left wrist is "+leftwristy);
        console.log("the x of the right wrist is "+ rightwristx+ " the y of the right wrist is "+rightwristy);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist: "+scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("score of the right wrsit is "+scorerightwrist);
    }
}