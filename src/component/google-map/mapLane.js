import React, { useState } from "react";
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
    DirectionsRenderer,
    DirectionsService,
} from "@react-google-maps/api";
import mapStyle from "./custom-map-style.json"
import battery from "../../assets/images/batterystation.svg";


const MapLane = React.memo(props => {
    const google = window.google

    const [response, setResponse] = useState(null);
    const [response1, setResponse1] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(null);

    const [isLoadingCordinate, setIsLoadingCordinate] = useState(true);
    const [isLoadingCordinate1, setIsLoadingCordinate1] = useState(true);


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

    const directionsCallback1 = (res) => {
        if (isLoadingCordinate1) {
            if (response === null || res.status === 'OK') {
                if (res?.request?.destination?.query) {
                    setIsLoadingCordinate1(false)
                    setResponse1(res);
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


    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw",
    });

    return (
        <div>
            {/* {console.log("isLoaded", isLoaded, props?.wayPoint)} */}
            {isLoaded ? <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={2}
                options={{
                    styles: mapStyle,
                    minZoom: 5,
                    maxZoom: 15,

                }}
            >
                {props?.wayPoint?.map((i, index) => (
                    <Marker
                        key={index}
                        position={{ lat: i?.lat, lng: i?.log }}
                        label=""
                        onClick={() => { setInfoWindowOpen(index + 1) }}
                        icon={battery}

                    >
                        {infoWindowOpen === (index + 1) && (
                            <InfoWindow onCloseClick={() => setInfoWindowOpen(null)}>
                                <div>
                                    <h5 className="text-white fs-6">Gas Station</h5>
                                    <p className="text-white mb-2 fs-14">{i?.locationName}</p>
                                    <p className="text-white mb-2 fs-14">Fuel type - RD80</p>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}


                {/* <Marker
                    position={{ lat: 32.7767, lng: -96.7970 }}
                    label=""
                    onClick={() => { setInfoWindowOpen1(true) }}
                    icon={battery}

                >
                    {infoWindowOpen1 && (
                        <InfoWindow onCloseClick={() => setInfoWindowOpen1(false)}>
                            <div>
                                <h5 className="text-white fs-6">Gas Station</h5>
                                <p className="text-white mb-2 fs-14">Dallas tx, USA</p>
                                <p className="text-white mb-2 fs-14">Fuel type - RD80</p>
                            </div>
                        </InfoWindow>
                    )}
                </Marker> */}
                <DirectionsService
                    options={{
                        origin: props.origin,
                        destination: props?.destination,
                        travelMode: 'DRIVING',
                        provideRouteAlternatives: true,
                        waypoints: props?.wayPoint?.map(i => (
                            {
                                location: i?.locationName,
                                stopover: false
                            }
                        )),

                    }}
                    callback={(res) => directionsCallback1(res)}
                >
                </DirectionsService>




                <DirectionsService
                    options={{
                        origin: props.origin,
                        destination: props?.destination,
                        travelMode: 'DRIVING',
                        provideRouteAlternatives: true
                        // waypoints: [
                        //     {
                        //         location: 'Texas, USA',
                        //         stopover: false
                        //     }],
                    }}
                    callback={(res) => directionsCallback(res)}
                >
                </DirectionsService>
                {
                    response !== null && (
                        <DirectionsRenderer
                            routeIndex={0}

                            options={{
                                routeIndex: 0,

                                directions: response,
                                polylineOptions: {
                                    strokeColor: '#d8856b',
                                    strokeOpacity: 0,
                                    strokeWeight: 0,

                                    icons: [{
                                        icon: {
                                            path: google.maps.SymbolPath.CIRCLE,
                                            fillColor: '#d8856b',
                                            fillOpacity: 1,
                                            scale: 2,
                                            strokeColor: '#d8856b',
                                            strokeOpacity: 1,
                                        },
                                        repeat: '10px'
                                    }],

                                },

                            }}
                        />
                    )
                }

                {
                    response1 !== null && (
                        <DirectionsRenderer
                            // routeIndex={1}
                            key={0}
                            options={{
                                directions: response1,
                                // routeIndex: 1,
                                polylineOptions: { strokeColor: '#d8856b' },
                            }}



                        />
                    )
                }




            </GoogleMap> : <div className="graph-loader  d-flex justify-content-center align-items-center">

                <div class="spinner-border  spinner-ui d-flex justify-content-center align-items-center" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div>
            }
        </div>
    )
    // }
}, (_, nextProps) => {
    return nextProps?.reloadData
}

)

export default MapLane