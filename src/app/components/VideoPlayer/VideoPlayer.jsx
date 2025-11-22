import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayer(props) {
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
        // Find the video-container parent element
        if (playerRef.current) {
            const videoContainer = playerRef.current.closest('.video-container');
            if (videoContainer) {
                if (playing) {
                    videoContainer.classList.add('video-playing');
                } else {
                    videoContainer.classList.remove('video-playing');
                }
            }
        }
    }, [playing]);

    const handlePlay = () => {
        setPlaying(true);
    };

    const handleStart = () => {
        setPlaying(true);
    };

    const handlePause = () => {
        setPlaying(false);
    };

    const handleEnded = () => {
        setPlaying(false);
    };

    return (
        <div ref={playerRef}>
            <ReactPlayer 
                url={props.url} 
                {...props.options}
                onPlay={handlePlay}
                onStart={handleStart}
                onPause={handlePause}
                onEnded={handleEnded}
            />
        </div>
    );
}
