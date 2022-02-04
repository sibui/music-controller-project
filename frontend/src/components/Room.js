import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
    const {roomCode} = useParams();
    const [room, setRoom] = useState({
        votesToSkip: 6,
        guestCanPause: false,
        isHost: false,
    });

    useEffect(() => {
        fetch("/api/get-room" + "?code=" + roomCode)
        .then(res => res.json())
        .then(data=>{
            setRoom({
                room,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    },[roomCode,setRoom])

    return (
    <div>
        <h3>{roomCode}</h3>
        <p>Votes: {room.votesToSkip}</p>
        <p>Guest Can Pause: {room.guestCanPause.toString()}</p>
        <p>Host: {room.isHost.toString()}</p>
    </div>
    );

}

export default Room


