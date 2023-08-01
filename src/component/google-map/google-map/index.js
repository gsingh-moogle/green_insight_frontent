import React, { useState } from "react";
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
    Polyline,
    DirectionsRenderer,
    DirectionsService,
} from "@react-google-maps/api";
import mapStyle from "./custom-map-style.json"


const GoogleMapView = React.memo(props => {
    const [response, setResponse] = useState(null);
    const [isLoadingCordinate, setIsLoadingCordinate] = useState(true);
    const handleMarkerClick = (id, lat, lng, address) => {
        mapRef?.panTo({ lat, lng });
        setInfoWindowData({ id, address });
        setIsOpen(true);
    };
    const directionsCallback = (res) => {
        if (isLoadingCordinate) {
            if (response === null || res.status === 'OK') {

                if (res?.request?.destination?.query) {
                    setIsLoadingCordinate(false)
                    setResponse(res);
                }
            }
        }
    };

    const containerStyle = {
        width: "100%",
        height: "100vh",
    };

    const center = {
        lat: 34.5204,
        lng: -105.8567,
    };

    const customMarker = {
        path: "M10.5 0C4.70738 0 0 4.5709 0 10.1953C0 12.0984 0.542617 13.9506 1.57506 15.5479L9.78822 28.5987C9.92833 28.8196 10.1383 28.9556 10.3834 28.9896C10.7158 29.0405 11.0834 28.9046 11.2759 28.5818L19.5126 15.4119C20.4924 13.8487 21 12.0305 21 10.1953C21 4.5709 16.2926 0 10.5 0ZM10.5 15.293C7.56012 15.293 5.25 12.982 5.25 10.1953C5.25 7.39155 7.61244 5.09766 10.5 5.09766C13.3876 5.09766 15.75 7.39155 15.75 10.1953C15.75 12.965 13.4749 15.293 10.5 15.293Z",
        fillColor: "#d8856b",
        fillOpacity: 2,
        strokeWeight: 1,
        rotation: 0,
        scale: 1,
    };

    const markers = [
        { icon: customMarker, address: "Address1", lat: 33.8861886, lng: -118.2059253 },
        {
            icon: customMarker,
            address: "Address2",
            lat: 33.1890841,
            lng: -95.2214564,
        },
    ];


    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw",
    });
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();


    return (
        <div>
            {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
                options={{
                    styles: mapStyle,
                    minZoom: 5,
                    maxZoom: 15,
                    // restriction: {
                    //     strictBounds: true,
                    //     latLngBounds: {
                    //         north: 49.384358,
                    //         east: -66.885444,
                    //         south: 24.396308,
                    //         west: -124.848974,
                    //     }
                    // }
                }}          
            >
                <DirectionsService
                    options={{
                        origin: props.origin,
                        destination: props?.destination,
                        travelMode: 'DRIVING',
                        // waypoints: [
                        //     {
                        //       location: 'Kurukshetra, Haryana',
                        //       stopover: true
                        //     }],
                    }}
                    callback={(res) => directionsCallback(res)}
                >
                </DirectionsService>
                {
                    response !== null && (
                        <DirectionsRenderer
                            options={{
                                directions: response,
                                polylineOptions: {strokeColor: '#d8856b'},
                                
                            }}
                        />
                    )
                }


                {/* {[
                                                    {
                                                        address: {
                                                            origin: "Los Angeles, CA",
                                                            destination: "Seattle, WA",
                                                            travelMode: "DRIVING",
                                                            user: 2,
                                                            id: 5,
                                                        },
                                                        initialDirection: [
                                                            { lat: 33.8861886, lng: -118.2059253 },
                                                            {
                                                                lat: 33.1890841,
                                                                lng: -95.2214564,
                                                            }
                                                        ],
                                                        stokeColor: "#215154"
                                                    },
                                                ].map((ele, index) => (
                                                    <Polyline
                                                        key={index}
                                                        path={ele?.initialDirection}
                                                        geodesic={true}
                                                        options={{
                                                            strokeColor: ele?.stokeColor || "#ff2527",
                                                            strokeOpacity: 0.75,
                                                            strokeWeight: 5,
                                                        }}
                                                    />
                                                ))} */}

                {/* <>
                    {markers.map(({ lat, lng, address, icon }, ind) => (
                        <Marker
                            position={{ lat, lng, address, icon }}
                            icon={icon}
                            onClick={() => {
                                handleMarkerClick(ind, lat, lng, address, icon);
                            }}
                        >
                            {isOpen && infoWindowData?.id === ind && (
                                <InfoWindow
                                    onCloseClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <h3>{infoWindowData.address}</h3>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </> */}
            </GoogleMap>}
        </div>
    )
    // }
}, (_, nextProps) => {
    return nextProps?.reloadData
}

)

export default GoogleMapView