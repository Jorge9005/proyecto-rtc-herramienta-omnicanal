import React,{ useContext } from "react";
import { RoomContext } from "../context/RoomContext";

export const Join: React.FC = () => {
    const context = useContext(RoomContext);

    const createRoom = () => {
        if(context.ws){
            context.ws.emit("create-room");
        } else {
            console.log("WebSocket no está disponible");
        }
    };

    return (
        <button onClick={createRoom} className='bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white'>
            Start new meeting
        </button>
    );
};