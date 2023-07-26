import RoomSelect from "../components/RoomSelect";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const { user } = useAuthContext();

    return user ? <RoomSelect /> : <h2>Please login to start chatting :)</h2>;
};

export default Home;
