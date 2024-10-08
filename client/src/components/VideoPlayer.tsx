import { useRef, useEffect } from "react";

export const VideoPlayer: React.FC<{stream: MediaStream}> = ({stream}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);
    return (
        <video ref={videoRef} autoPlay></video>
    );
}