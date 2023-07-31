import RoomSelect from "../components/RoomSelect";
import { useAuthContext } from "../hooks/useAuthContext";
import { Spinner } from "@chakra-ui/react";

const Home = () => {
    const { user } = useAuthContext();

    return user ? <RoomSelect /> : <h2>Please login to start chatting :)</h2>;
};

export default Home;
