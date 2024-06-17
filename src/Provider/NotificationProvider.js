import { createContext, useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export const WebsocketContext = createContext(false, null, () => { })
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumer.
export const WebsocketProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false)
    const [val, setVal] = useState(null)

    const ws = useRef(null)

    useEffect
        (() => {
            const socket = new WebSocket("ws://127.0.0.1:8000/ws")

            socket.onopen = () => setIsReady(true)
            socket.onclose = () => setIsReady(false)
            socket.onmessage = (event) => {
                setVal(event.data)
                toast.info(`Hello`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            ws.current = socket

            return () => {
                socket.close()
            }
        }, [])

    const ret = [isReady, val, ws.current?.send.bind(ws.current)]

    return (
        <WebsocketContext.Provider value={ret}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </WebsocketContext.Provider>
    )
}