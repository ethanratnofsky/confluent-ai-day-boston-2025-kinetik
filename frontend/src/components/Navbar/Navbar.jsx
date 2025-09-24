import { NavbarContainer } from './Navbar.styles';
import confluentLogo from '/confluent-horizontal-dark.svg'
import kinetikLogo from '/kinetik-horizontal-dark.svg'

const Navbar = () => {
    return (
        <NavbarContainer>
            <a href="https://kinetik.care" target="_blank">
                <img src={kinetikLogo} className="logo" alt="Kinetik logo" />
            </a>
            <h2 style={{ margin: 0 }}>@</h2>
                <a href="https://confluent.io" target="_blank">
            <img src={confluentLogo} className="logo confluent" alt="Confluent logo" />
            </a>
        </NavbarContainer>
    )
}

export default Navbar;