import Dropdown from "react-bootstrap/Dropdown";

const DropdownComponent = ({ list, setter }) => {
    return list.map((item, index) => {
        return (
            <Dropdown.Item
                href=""
                key={index}
                onClick={(e) => {
                    if (e.target.innerText) {
                        setter(e.target.innerText);
                    }
                }}
            >
                {item.room || item.email}
            </Dropdown.Item>
        );
    });
};

export default DropdownComponent;
