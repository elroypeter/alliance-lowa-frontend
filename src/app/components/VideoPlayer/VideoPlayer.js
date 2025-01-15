import React from 'react';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayer(props) {
    return <ReactPlayer url={props.url} {...props.options} />;
}
