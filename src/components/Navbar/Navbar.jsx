import confluentLogo from '/confluent-dark.svg'
import kinetikLogo from '/kinetik.svg'

const Navbar = () => {
    return (
        <nav>
            <a href="https://kinetik.care" target="_blank">
                <img src={kinetikLogo} className="logo" alt="Kinetik logo" />
            </a>
            <h1>@</h1>
                <a href="https://confluent.io" target="_blank">
            <img src={confluentLogo} className="logo confluent" alt="Confluent logo" />
            </a>
        </nav>
    )
}

export default Navbar;