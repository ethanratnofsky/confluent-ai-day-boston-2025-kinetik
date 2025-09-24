import { useEffect, useState } from 'react'
import { NavbarContainer, CenterStatusContainer, ClockText, LiveBadge, LiveDot } from './Navbar.styles';
import confluentLogo from '/confluent-horizontal-dark.svg'
import kinetikLogo from '/kinetik-horizontal-dark.svg'

const Navbar = () => {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    const dateStr = now.toLocaleDateString(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })
    const timeStr = now.toLocaleTimeString(undefined, { hour12: false })

    return (
        <NavbarContainer>
            <h2 style={{ margin: 0 }}>Surge AI</h2>

            <CenterStatusContainer>
                <ClockText>{dateStr} · {timeStr}</ClockText>
                <LiveBadge><LiveDot /> LIVE</LiveBadge>
            </CenterStatusContainer>

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