import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button variant="outline-light" onClick={onSignUpClicked}>Sign Up</Button>
            <Button variant="outline-light" onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;