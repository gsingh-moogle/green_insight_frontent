// /* global google */

// import React, { useEffect, useState } from "react";
// import Geocode from "react-geocode";
// import GoogleMapReact from 'google-map-react';


// // import {
// //     // GoogleMap,
// //     // useJsApiLoader,
// //     // DirectionsRenderer,
// //     // DirectionsService,
// //     // Marker
// // } from "@react-google-maps/api";
// import mapStyle from "./custom-map-style.json";
// import Track from "../../assets/images/trainTruck.svg";
// import Road from "../../assets/images/road.svg";

// Geocode.setApiKey("AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// const AnyReactComponent = ({ text }) => <div>{text}</div>;


// const MapLaneTrain = React.memo(props => {
//     const directionsService = new google.maps.DirectionsService();
//     const [demoDirection, setDemoDirection] = useState(null);
//     const origin = { lat: 40.756795, lng: -73.954298 };
//     const destination = { lat: 41.756795, lng: -78.954298 };

//     directionsService.route(
//         {
//             origin: origin,
//             destination: destination,
//             travelMode: google.maps.TravelMode.DRIVING
//         },
//         (result, status) => {
//             if (status === google.maps.DirectionsStatus.OK) {
//                 setDemoDirection(
//                     result
//                 );
//             } else {
//                 console.error(`error fetching directions ${result}`);
//             }
//         }
//     );
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };

//     const google = window.google

//     const [response, setResponse] = useState(props?.list);
//     const [latLongOrigion, setlatLongOrigion] = useState(null);
//     const [latLongDestination, setlatLongDestination] = useState(null);


//     const [isLoadingCordinate, setIsLoadingCordinate] = useState(true);
//     useEffect(() => {
//         if (props?.origin) {
//             Geocode.fromAddress(props?.origin).then(
//                 (response) => {
//                     const { lat, lng } = response.results[0].geometry.location;
//                     setlatLongOrigion({ lat: lat, lng: lng })
//                 },
//                 (error) => {
//                     console.error(error);
//                 }
//             );
//         }
//     }, [props.origin]);

//     useEffect(() => {
//         if (props?.destination) {


//             Geocode.fromAddress(props?.destination).then(
//                 (response) => {
//                     const { lat, lng } = response.results[0].geometry.location;
//                     setlatLongDestination({ lat: lat, lng: lng });
//                 },
//                 (error) => {
//                     console.error(error);
//                 }
//             );

//         }
//     }, [props.destination]);

//     const directionsCallback = (origion, res) => {
//         if (isLoadingCordinate) {
//             console.log("resresresresresresresresresres", origion, res)
//             if (response === null || res.status === 'OK') {
//                 if (res?.request?.destination?.query) {
//                     setIsLoadingCordinate(false)
//                     setResponse((prevState) => ({
//                         ...prevState,
//                         [origion]: res
//                     }));
//                 }
//             }
//         }
//     };

//     const containerStyle = {
//         width: "100%",
//         height: "100vh",
//     };

//     const center = { lat: 11.174036305817275, lng: 76.3754534171875 }

//     // const { isLoaded } = useJsApiLoader({
//     //     id: "google-map-script",
//     //     googleMapsApiKey: "AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw",
//     // });
//     { console.log("responseresponseresponse", response, props?.origin, props?.destination, latLongDestination, latLongOrigion) }

//     return (
//         <div>
//             {console.log("centercentercentercenter", latLongOrigion, center)}

//             <div style={{ height: '100vh', width: '100%' }}>

//                 <GoogleMapReact
//                     bootstrapURLKeys={{ key: "AIzaSyBfdojs-7nzgqQyrhjFJDbEo_1q87ZPuzw" }}
//                     defaultCenter={defaultProps.center}
//                     defaultZoom={defaultProps.zoom}
//                     options={{
//                         styles: mapStyle,
//                     }}
//                 >
//                     {demoDirection &&
//                         <DirectionsRenderer
//                             directions={demoDirection}
//                         />}
//                     <AnyReactComponent
//                         lat={59.955413}
//                         lng={30.337844}
//                         text="My Marker"
//                     />
//                 </GoogleMapReact>
//             </div>

//             {/* {isLoaded ? <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 defaultZoom= {10}

//                 options={{
//                     styles: mapStyle,
//                     minZoom: 0,
//                     maxZoom: 15,
//                     zoomControl: true,
//                     scrollwheel: true

//                 }}
//             >
//                 {latLongOrigion && <Marker
//                     position={{ lat: latLongOrigion.lat, lng: latLongOrigion.lng }}
//                     label=""
//                     icon={Road}

//                 ></Marker>}

//                 {latLongOrigion && <Marker
//                     position={{ lat: 40.7495532, lng: -112.0214981 }}
//                     label=""
//                     icon={Road}

//                 ></Marker>}

//                 {latLongOrigion && <Marker
//                     position={{ lat: 40.7355532, lng: -112.0214981 }}
//                     label=""
//                     icon={Track}

//                 ></Marker>}
//                 {latLongOrigion && <Marker
//                     position={{ lat: 34.0788926, lng: -117.3937976 }}
//                     label=""
//                     icon={Track}

//                 ></Marker>}


//                 {latLongDestination && <Marker
//                     position={{ lat: 34.0658926, lng: -117.3937976 }}
//                     label=""
//                     icon={Road}

//                 ></Marker>}
//                 {latLongDestination && <Marker
//                     position={{ lat: latLongDestination?.lat, lng: latLongDestination?.lng }}
//                     label=""
//                     icon={Road}

//                 ></Marker>}
//                 {props?.data?.map(i => <DirectionsService
//                     key={i}
//                     options={{
//                         origin: i?.origin?.replace("UP/", "")?.replace(",UT", ""),
//                         destination: i?.destination?.replace("UP/", ""),
//                         travelMode: i?.type === 'Rail' ? "TRANSIT" : 'WALKING',

//                     }}
//                     callback={(res) => directionsCallback(i?.origin?.replace("UP/", ""), res)}
//                 >
//                 </DirectionsService>)}
         
//                 {
//                     response && Object.values(response)?.map(i => (
//                         <DirectionsRenderer
//                             key={i}
//                             options={{
                             
            
//                                 directions: i,
//                                 polylineOptions: {
//                                     suppressInfoWindows: false,

//                                     strokeColor: i?.request?.travelMode === "TRANSIT" ? '#d8856b' : '#5cb9bf',
//                                     strokeOpacity: i?.request?.travelMode === "TRANSIT" ? 0 : 1,
//                                     strokeWeight: 4,
//                                     icons: i?.request?.travelMode === "TRANSIT" ? [{
//                                         icon: {
//                                             path: i?.request?.travelMode === "TRANSIT" ? google.maps.SymbolPath.CIRCLE : google.maps.SymbolPath.FORWARD_OPEN_ARROW,
//                                             fillColor: i?.request?.travelMode === "TRANSIT" ? '#d8856b' : '#5cb9bf',
//                                             fillOpacity: 1,
//                                             scale: 2,
//                                             strokeColor: i?.request?.travelMode === "TRANSIT" ? '#d8856b' : '#5cb9bf',
//                                             strokeOpacity: 1,
//                                         },
//                                         offset: '0',
//                                         repeat: '10px'
//                                     }] : null
//                                 },

//                                 suppressMarkers: true,
//                             }}
//                         />
//                     ))
//                 }


//             </GoogleMap> : <div className="graph-loader  d-flex justify-content-center align-items-center">

//                 <div class="spinner-border  spinner-ui d-flex justify-content-center align-items-center" role="status">
//                     <span class="visually-hidden"></span>
//                 </div>
//             </div>
//             } */}
//         </div>
//     )
//     // }
// }, (_, nextProps) => {
//     return true
// }

// )

// export default MapLaneTrain