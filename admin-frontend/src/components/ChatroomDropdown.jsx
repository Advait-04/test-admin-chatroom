import Dropdown from "react-bootstrap/Dropdown";

const ChatroomDropdown = ({ chatroomList, setCurrentChatroom }) => {
    return chatroomList.map((chatroom, index) => {
        return (
            <Dropdown.Item
                href=""
                key={index}
                onClick={(e) => {
                    if (e.target.innerText) {
                        setCurrentChatroom(e.target.innerText);
                    }
                }}
            >
                {chatroom.room}
            </Dropdown.Item>
        );
    });
};

export default ChatroomDropdown;
