import { createContext, useState } from 'react'
import axios from "axios";
import fs from "fs";
import path from "path";

export const Speech_IAContext = createContext();

export default function Speech_IAContextProvider(props) {

    // const { message, voice } = await request.json();

    async function all() {
        try {
            const response = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
                {
                    method: "POST",
                    headers: {
                        accept: "audio/mpeg",
                        "Content-Type": "application/json",
                        "xi-api-key": "7c49b83106313200329517715dfdfbc4",
                    },
                    body: JSON.stringify({
                        text: "texto prueba",
                        voice_settings: {
                            stability: 0,
                            similarity_boost: 0,
                        },
                    }),
                }
            );
    
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
    
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const file = Math.random().toString(36).substring(7);
    
            fs.writeFile(path.join("public", "audio", `${file}.mp3`), buffer, () => {
                console.log("File written successfully");
            });
    
            return new Response(JSON.stringify({ file: `${file}.mp3` }));
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }));
        }
    }

    return (
        <Speech_IAContext.Provider value={{
            all
        }}>
            {props.children}
        </Speech_IAContext.Provider>
    )
}
