import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";


export const Room = () => {
    const { id } = useParams();
    const roomContext = useContext(RoomContext);

    const { ws, me, stream } = roomContext;

    useEffect(() => {
        if (me) {
            ws.emit("join-room", { roomId: id, peerId: me.id });
        }
    }, [me, ws, id]);

    return (
        <>
            Room id {id}
            <div>
                <VideoPlayer stream={stream}/>
            </div>
        </>
    );
};