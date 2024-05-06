# PoseMaster

Welcome to PoseMaster, a project that uses machine learning to detect the pose of a person in real-time using a webcam. This project utilizes the PoseNet library, which is a part of the ML5.js library. PoseNet is a pre-trained model that can estimate the pose of a person in an image or video stream.

## How it Works

The project uses the PoseNet library to detect the pose of a person in real-time using a webcam. The pose is represented by key points and visualized through a dynamic stick figure overlay on the video stream. The model has been trained to recognize four alphabet poses: Y, A, M, and C. When you strike one of these poses, the corresponding letter is displayed on the screen, demonstrating the accuracy and responsiveness of the machine learning model.

## Screenshot!

![Screensot](./images/poses.jpg)

## Built With

- [PoseNet](https://github.com/ml5js/ml5-library/tree/master/src/poseNet) - A pre-trained model for pose estimation.
- [ML5.js](https://github.com/ml5js/ml5-library) - A JavaScript library for machine learning.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the project by running `npm start`.
4. Open the project in your web browser.

## Contributing

We welcome contributions to the project. Please submit a pull request with your changes.

## Authors

- Nakul Jain - Initial work

## Acknowledgments

- [PoseNet](https://github.com/ml5js/ml5-library/tree/master/src/poseNet)
- [ML5.js](https://github.com/ml5js/ml5-library)
