import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.scss";

const Mapa: React.FC = () => {
    return (
        <div>
            <MapContainer
                center={[6.2442, -75.5812]}
                zoom={13}
                scrollWheelZoom={false}
                className="mapa"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[6.2442, -75.5812]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Mapa;
