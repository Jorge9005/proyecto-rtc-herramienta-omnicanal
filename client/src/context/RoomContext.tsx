import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

const WS = "http://localhost:5000";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [me, setMe] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();

    const enterRoom = ({roomId}:{roomId: "string"}) => {
        console.log({roomId});
        navigate(`/room/${roomId}`);
    }

    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log({ participants });
    };

    useEffect(() => {
        const meId = uuidV4();
        const peer = new Peer(meId);
        setMe(peer);

        try {
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
                setStream(stream);
            });
        } catch (error) {
            console.log(error);
        }

        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers);

        return() => {
            ws.off("room-created", enterRoom);
            ws.off("get-users", getUsers);
        };
    }, []);

    return (
        <RoomContext.Provider value={{ ws, me, stream }}>
            {children}
        </RoomContext.Provider>
    );
};
