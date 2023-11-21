import Dropdown from "react-bootstrap/Dropdown";

const UserDropdown = ({ userList, setCurrentUser }) => {
    return userList.map((user) => {
        return (
            <Dropdown.Item
                href=""
                key={user._id}
                onClick={(e) => {
                    if (e.target.innerText) {
                        setCurrentUser(e.target.innerText);
                    }
                }}
            >
                {user.email}
            </Dropdown.Item>
        );
    });
};

export default UserDropdown;
