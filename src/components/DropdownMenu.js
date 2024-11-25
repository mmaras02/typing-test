import "../pages/home.css"

const DropdownMenu = ({options, selectedOption, setSelectedOption}) => {
    return ( 
        <div className="dropdown-menu">
            <select value={selectedOption} onClick={(e) => setSelectedOption(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))} 
            </select>
        </div>
     );
}
 
export default DropdownMenu;