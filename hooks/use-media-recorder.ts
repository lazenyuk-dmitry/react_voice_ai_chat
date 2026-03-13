"use client";

import { useRef, useState } from "react";

export const useMediaRecorder = () => {
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const allowed = await checkPermissions();
    if (!allowed) {
      stopRecording();
      await askPermissions();
      return
    }

    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream.current);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Доступ к микрофону запрещен", err);
      throw err
    }
  };

  const stopRecording = async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorder.current || !stream.current) return null;
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/m4a" });
        resolve(blob)
        setAudioFile(blob);
        cleanup()
      };
      mediaRecorder.current?.stop();
      setIsRecording(false);
    })
  };

  const checkPermissions = async () => {
    if (navigator.permissions && navigator.permissions.query) {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      return permission.state === 'granted';
    }

    return true;
  }

  const askPermissions = async () => {
    stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    cleanup();
  }

  const cleanup = () => {
    if (stream.current) {
      stream.current.getTracks().forEach(track => track.stop());
      stream.current = null;
    }

    if (mediaRecorder.current) {
      mediaRecorder.current.ondataavailable = null;
      mediaRecorder.current.onstop = null;

      if (mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      mediaRecorder.current = null;
    }

    chunks.current = [];
  };

  return {
    audioFile,
    isRecording,
    startRecording,
    stopRecording,
  }
}
