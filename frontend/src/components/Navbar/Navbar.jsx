import { NavbarContainer } from './Navbar.styles';
import confluentLogo from '/confluent-horizontal-dark.svg'
import kinetikLogo from '/kinetik-horizontal-dark.svg'

const Navbar = () => {
    return (
        <NavbarContainer>
            <h2 style={{ margin: 0 }}>Surge AI</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href="https://kinetik.care" target="_blank">
                    <img src={kinetikLogo} className="logo" alt="Kinetik logo" />
                </a>
                <h3 style={{ margin: 0 }}>@</h3>
                    <a href="https://confluent.io" target="_blank">
                <img src={confluentLogo} className="logo confluent" alt="Confluent logo" />
                </a>
            </div>
        </NavbarContainer>
    )
}

export default Navbar;