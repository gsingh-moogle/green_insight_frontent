import React, { useState } from "react";
import {
    DirectionsRenderer,
    DirectionsService,
} from "@react-google-maps/api";

const MapLaneDirection = React.memo(props => {
    const [response, setResponse] = useState(null);

    const [isLoadingCordinate, setIsLoadingCordinate] = useState(true);

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



    return (
        <div>
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
                            polylineOptions: { strokeColor: '#d8856b' },

                        }}
                    />
                )
            }


        </div>
    )
    // }
}, (_, nextProps) => {
    return nextProps?.reloadData
}

)

export default MapLaneDirection