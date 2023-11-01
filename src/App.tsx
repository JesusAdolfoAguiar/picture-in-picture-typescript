import React, { useEffect, useRef } from 'react';
import './App.css'

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    const button = buttonRef.current as HTMLButtonElement;

    // Prompt to select media stream, pass to video element, then play
    const selectMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
        };
      } catch (error) {
        // Catch Error Here
      }
    };

    button.addEventListener('click', async () => {
      // Disable Button
      button.disabled = true;
      // Start Picture in Picture
      await videoElement.requestPictureInPicture();
      // Reset Button
      button.disabled = false;
    });

    // On Load
    selectMediaStream();

    return () => {
      // Clean up event listener
      button.removeEventListener('click', selectMediaStream);
    };
  }, []);

  return (
    <div>
      <video id="video" controls height="360" width="640" hidden ref={videoRef}></video>
      <div className="button-container">
        <button id="button" ref={buttonRef}>Start</button>
      </div>
    </div>
  );
};

export default VideoComponent;