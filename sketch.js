let video;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose;
let skeleton;
let brain;
let actor_img;
let specs,smoke;
let state = 'waiting';
let targetLabel;
let poseLabel = "Y";

function keyPressed() {
    if (key == 's') {
        brain.saveData();
    } else {
        targetLabel = key;
        console.log(targetLabel);
        setTimeout(function() {
            console.log('collecting');
            state = 'collecting';
            setTimeout(function() {
                console.log('not collecting');
                state = 'waiting';
            }, 10000);     
        }, 10000);
    }
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO)
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', receivedPoses)
    
    select('canvas').style('position', 'absolute');
  select('canvas').style('top', '65%');
  select('canvas').style('left', '50%');
  select('canvas').style('transform', 'translate(-50%, -50%)');
    
    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
    };
    brain.load(modelInfo, brainLoaded);
    // brain.loadData('ycma.json', dataReady);

    // actor_image = loadImage('images/monkey.png');
    // specs = loadImage('images/specs.png');
    // smoke = loadImage('images/cigar.png');

}

function brainLoaded() {
    console.log('pose classification ready!');
    classifyPose();
}

function classifyPose() {
    if(singlePose) {
    let input = [];
            for (let i =0; i< singlePose.keypoints.length; i++) {
                let x = singlePose.keypoints[i].position.x;
                let y = singlePose.keypoints[i].position.y;
                input.push(x);
                input.push(y);
        }
        brain.classify(input, gotResult);
    } else {
      setTimeout(classifyPose, 100);  
    }
}

function gotResult(error, results) {
    if (results[0].confidence > 0.75) {
        poseLabel = results[0].label.toUpperCase();
    }
    // console.log(results[0].confidence);
    classifyPose();
}

function dataReady() {
    brain.normalizeData();
    brain.train({epochs: 50}, finished);
}

function finished() {
    console.log('model trained');
    brain.save();
}

function receivedPoses(poses){
    console.log(poses);
    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        if(state == 'collecting'){
        let target = [targetLabel];
        brain.addData(input, target);
        }
    }
    console.log(noseX + " " + noseY);
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    push();
    //images and videos(webcam)
    image(video, 0, 0);

    if(singlePose){
        
        reye = singlePose.rightEye;
        leye = singlePose.leftEye; 
        let d = dist(reye.x, reye.y, leye.x-40, leye.y-10)

        fill(255,0,0);
        ellipse(singlePose.nose.x, singlePose.nose.y, d);
        fill(0,0,255);
        ellipse(singlePose.rightWrist.x, singlePose.rightWrist.y, d);
        ellipse(singlePose.leftWrist.x, singlePose.leftWrist.y, d);

        for (let i=0; i<singlePose.keypoints.length; i++) {
            fill(0,255,0)
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 16, 16);
        }
       
        for(let j=0; j<skeleton.length; j++){
            stroke(255,255,255);
            strokeWeight(5);
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }
        pop();
    
        fill(255,255,255);
        noStroke();
        textSize(150);
        textAlign(LEFT);
        text(poseLabel, width-120, height/4);
    
    
        // image(specs, singlePose.nose.x-100, singlePose.nose.y-140, 200, 200);
        // image(smoke, singlePose.nose.x-110, singlePose.nose.y-40, 150, 150);
    }
    
}

// function getRandomArbitary(min, max) {
//     return Math.random() * (min, max) + min;
// }
// function draw() {   
//     r = getRandomArbitary(0,255);
//     g = getRandomArbitary(0,255);
//     b = getRandomArbitary(0,255);
//     fill(r, g, b);
//     ellipse(mouseX, mouseY, 50, 50);
// }