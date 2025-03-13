import './Navbar.css';

interface PropsType {
    clasName: string;
}

const ShowHideSidebar = () => {
    document.querySelector('.sidebar')?.classList.toggle('show');
};



const Navbar = ({ clasName }: PropsType) => {
    return (
        <nav className={clasName}>
            <ul>
                {clasName === 'sidebar' &&
                    (
                        <button onClick={ShowHideSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </button>
                    )
                }
                {clasName === 'headbar' && <li className="exclude"><a href="#">Portofolio</a></li>}
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                {clasName === 'headbar' && (
                    <button onClick={ShowHideSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                        </svg>
                    </button>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
