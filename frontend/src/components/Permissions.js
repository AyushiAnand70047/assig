// src/components/PermissionsCheck.js
import React, { useEffect, useState } from 'react';

const PermissionsCheck = ({ onPermissionsGranted, onPermissionsDenied }) => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStatus('granted');
        onPermissionsGranted();
      } catch (error) {
        setStatus('denied');
        onPermissionsDenied();
      }
    };

    checkPermissions();
  }, [onPermissionsGranted, onPermissionsDenied]);

  if (status === 'checking') return <div>Checking permissions...</div>;
  if (status === 'denied') return <div>Permissions denied. Please enable camera and mic.</div>;
  return <div>Permissions granted.</div>;
};

export default PermissionsCheck;
