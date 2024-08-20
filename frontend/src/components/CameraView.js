import React, { useEffect, useRef, useState } from 'react';

const CameraView = () => {
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setError(null); // Clear any existing errors
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Error accessing camera. Please check your permissions and try again.');
      }
    };

    startCamera();

    return () => {
      // Stop the video stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-view">
      {error ? (
        <p>{error}</p>
      ) : (
        <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%' }} />
      )}
    </div>
  );
};

export default CameraView;
