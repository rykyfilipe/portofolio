import useWebSocket from "react-use-websocket";
import {useEffect} from "react";
import throttle from "lodash.throttle";
import Cursors from "./components/Cursor.jsx";


const Home = ({username}) => {

    const renderCursors = (users) => {
        return Object.keys(users).map((uuid) => {
            const user = users[uuid];
            if (username !== user.username)
                return <Cursors key={uuid} point={[user.state.x, user.state.y]}/>
        })
    }

    const renderUsersLidt = (users) => {
        return Object.keys(users).map((uuid) => {
            const user = users[uuid];
            return <p key={uuid}>{user.username} : {user.state.x}, {user.state.y}</p>
        })
    }


    const WS_URL = "ws://localhost:8000";
    const {sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL, {
        queryParams: {username},
    });

    const THROTTLE = 50;
    const sendJsonMessageThrottle = throttle((message) => {
        sendJsonMessage(message);
    }, THROTTLE);

    useEffect(() => {
        sendJsonMessage({
            x: 0,
            y: 0,
        })
        const handleMouseMove = (e) => {
            sendJsonMessageThrottle({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    if (lastJsonMessage) {
        return <>
            {renderCursors(lastJsonMessage)}
            {renderUsersLidt(lastJsonMessage)}
        </>
    }

    return <h1>Hello, {username}</h1>;
};

export default Home;
