import { Marker as LeafletMarker, Popup } from 'react-leaflet';

const Marker = ({id, name, position, icon, children}) => {
    return (
        <LeafletMarker key={id} position={position} icon={icon}>
            {name && <Popup>{name} ({id})</Popup>}
            {children}
        </LeafletMarker>
    )
}

export default Marker;