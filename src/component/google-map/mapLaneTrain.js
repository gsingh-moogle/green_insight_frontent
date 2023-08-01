/* global google */

import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";

import {
    GoogleMap,
    useJsApiLoader,
    DirectionsRenderer,
    DirectionsService,
    Marker
} from "@react-google-maps/api";
import mapStyle from "./custom-map-style.json";
import WernerBg from "../../assets/images/wernerBg1.png";
import Csx from "../../assets/images/csxImg1.png";
import "./map.scss"
import logo from "../../assets/images/JB_Hunt_Enterprise.png";

Geocode.setApiKey("AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw");

// set response language. Defaults to english.
Geocode.setLanguage("en");

const MapLaneTrain = React.memo(props => {
    const google = window.google

    const [response, setResponse] = useState(props?.list);
    const [latLongOrigion, setlatLongOrigion] = useState(null);
    const [latLongDestination, setlatLongDestination] = useState(null);


    const [isLoadingCordinate, setIsLoadingCordinate] = useState(true);
    useEffect(() => {
        if (props?.data) {
            props?.data?.map((i, index) => {
                if (index === 0) {
                    Geocode.fromAddress(props?.destination).then(
                        (response) => {
                            const { lat, lng } = response.results[0].geometry.location;
                            setlatLongOrigion({ lat: lat, lng: lng })
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                }

                if (index === 2) {
                    Geocode.fromAddress(props?.origin).then(
                        (response) => {
                            const { lat, lng } = response.results[0].geometry.location;
                            setlatLongDestination({ lat: lat, lng: lng })
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                }

            })

        }
    }, [props.origin]);

    // useEffect(() => {
    //     if (props?.destination) {


    //         Geocode.fromAddress(props?.destination).then(
    //             (response) => {
    //                 const { lat, lng } = response.results[0].geometry.location;
    //                 setlatLongDestination({ lat: lat, lng: lng });
    //             },
    //             (error) => {
    //                 console.error(error);
    //             }
    //         );

    //     }
    // }, [props.destination]);

    const directionsCallback = (origion, res) => {
        if (isLoadingCordinate) {
            if (response === null || res.status === 'OK') {
                if (res?.request?.destination?.query) {
                    setIsLoadingCordinate(false)
                    setResponse((prevState) => ({
                        ...prevState,
                        [origion]: res
                    }));
                }
            }
        }
    };

    const containerStyle = {
        width: "100%",
        height: "100vh",
    };

    const center = { lat: 11.174036305817275, lng: 76.3754534171875 }

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw",
    });

    return (
        <div className="googlemap">
            {isLoaded ? <GoogleMap
                mapContainerStyle={containerStyle}
                className="demo-t"

                options={{
                    styles: mapStyle,
                    minZoom: 2,
                    maxZoom: 10,
                    zoomControl: true,
                    scrollwheel: true,

                }}
            >
                {latLongOrigion && <Marker
                    position={{ lat: latLongOrigion?.lat, lng: latLongOrigion?.lng }}
                    label=""
                    icon={logo}

                ></Marker>}

              
                {latLongOrigion && <Marker
                    position={{ lat: props?.markerList?.lat, lng: props?.markerList?.lng }}
                    label=""
                    icon={Csx}

                ></Marker>}
               

                {latLongDestination && <Marker
                    position={{ lat: latLongDestination?.lat, lng: latLongDestination?.lng }}
                    label=""
                    icon={WernerBg}

                ></Marker>}

                {props?.data?.map(i => <DirectionsService
                    key={i}
                    options={{
                        origin: i?.origin?.replace("UP/", "")?.replace(",UT", ""),
                        destination: i?.destination?.replace("UP/", ""),
                        travelMode: i?.type === 'Rail' ? "TRANSIT" : 'WALKING',

                    }}
                    callback={(res) => directionsCallback(i?.origin?.replace("UP/", ""), res)}
                >
                </DirectionsService>)}

                {
                    response && Object.values(response)?.map(i => (
                        <DirectionsRenderer
                            key={i}
                            options={{
                                hideRouteList: false,

                                directions: i,
                                polylineOptions: {
                                    suppressInfoWindows: false,

                                    strokeColor: i?.request?.travelMode === "TRANSIT" ? '#d8856b' : '#ffcb77',
                                    strokeOpacity: i?.request?.travelMode === "TRANSIT" ? 0 : 1,
                                    strokeWeight: 4,
                                    icons: i?.request?.travelMode === "TRANSIT" ? [{
                                        icon: {
                                            path: i?.request?.travelMode === "TRANSIT" ? google.maps.SymbolPath.CIRCLE : google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                                            fillColor: i?.request?.travelMode === "TRANSIT" ? '#d8856b' : '#ffcb77',
                                            fillOpacity: 1,
                                            scale: 2,
                                            strokeColor: i?.request?.travelMode === "TRANSIT" ? '#d8856b' : '#ffcb77',
                                            strokeOpacity: 1,
                                        },
                                        offset: '0',
                                        repeat: '10px'
                                    }] : null
                                },

                                suppressMarkers: true,
                            }}
                        />
                    ))
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

export default MapLaneTrain