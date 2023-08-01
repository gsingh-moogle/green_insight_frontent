import moment from "moment";
import disabledArrow from "../assets/images/disabledArrow.svg"
import decArrow from "../assets/images/downactiveArrow.svg"
import incArrow from "../assets/images/topactiveArrow.svg"

export const decarbLine = {
    high_emission_intensity: [],
    low_emission_intensity: [{
        id: 3,
        emission_intensity: 48,
        number_of_lanes: 2,
        number_of_vendors: 1,
        share_of_tonnage: 5,
    }, {
        id: 4,
        emission_intensity: 50,
        number_of_lanes: 2,
        number_of_vendors: 1,
        share_of_tonnage: 35,
    }]
}

export const decarbDetailLine = [{
    id: 1,
    source: "Riverside",
    destination: "Fort Worth",
    shipments: "120,000",
    emission_intensity: 85,
    emission_intensity_percent: 11,
}]


export const yearList = [2020, 2021, 2022, 2023]

export const pageSizeList = [10, 20, 30, 40, 50]

export const getQuarterYear = (date) => {
    const quarter = Math.ceil(Number(moment.utc(date).format("MM")) / 3)
    const year = Number(moment.utc(date).format("YYYY"))

    return `Q${quarter} ${year}`
}



export const sortIcon = (key, col_name, order) => {
    if (col_name === key) {
        return order === "asc" ? incArrow : decArrow
    } else {
        return disabledArrow
    }
}

export const getQuarters = (yearlyData) => {
    const latestYear = new Date().getFullYear();
    var quarter = Math.floor((new Date().getMonth() + 3) / 3);

    let list = [{ value: "", name: quarter <= 4 ? "YTD" : "All" }, { value: 1, name: "Q1" }]
    if (Number.parseInt(yearlyData, 10) >= latestYear) {

        if (quarter >= 2) {
            list.push({ value: 2, name: "Q2" })
        }

        if (quarter >= 3) {
            list.push({ value: 3, name: "Q3" })
        }

        if (quarter >= 4) {
            list.push({ value: 4, name: "Q4" })
        }

    } else {
        list = [{ value: "", name: "All" }, { value: 1, name: "Q1" }, { value: 2, name: "Q2" }, { value: 3, name: "Q3" }, { value: 4, name: "Q4" }]
    }
    return list
}


export const getGraphDataHorizontal = (res, key) => {
    let regionPageArr = []
    let regionPageArrMerge = []
    if (res?.data?.contributor) {
        regionPageArr = res?.data?.contributor?.filter(i => i?.name !== key)?.map(i => ({
            ...i,
            name: i.name,
            y: i.value,
            color: i.color,
            yAxis: 1,

            dataLabels: [{
                inside: false,
                enabled: true,
                rotation: 0,
                x: 32,
                overflow: "none",
                allowOverlap: false,
                color: "#212121",
                align: "center",
                crop: false,

                formatter() {
                    return ``;
                },
            },
                // {
                //     inside: true,
                //     enabled: true,
                //     rotation: 0,
                //     x: -30,
                //     overflow: "none",
                //     allowOverlap: true,
                //     color: "#212121",
                //     align: "left",
                //     crop: false,

                //     formatter() {
                //         return this.key;
                //     },
                // }
            ],
            type: "column",
        }))
    }
    if (res?.data?.detractor) {
        regionPageArrMerge = res?.data?.detractor?.filter(i => i?.name !== key)?.map(i => ({
            ...i,
            name: i.name,
            y: -Number(i.value) - ((res?.data?.detractor[2]?.value || 0) - (res?.data?.detractor[0]?.value || 0)),
            yValue: -Number(i.value),
            color: i.color,
            yAxis: 0,
            type: "column",

            dataLabels: [{
                inside: false,
                enabled: true,
                rotation: 0,
                x: -30,

                overflow: "none",
                allowOverlap: false,
                color: "#212121",
                align: "center",
                crop: false,
                formatter: function () {
                    return ``;
                },
            },
                // {
                //     inside: true,
                //     enabled: true,
                //     rotation: 0,
                //     x: 30,
                //     overflow: "none",
                //     allowOverlap: true,
                //     color: "#212121",
                //     align: "right",
                //     crop: false,

                //     formatter() {
                //         return this.key;
                //     },
                // }
            ],
        }));
    }
    return [...regionPageArr, ...regionPageArrMerge]
}

export const getGraphData = (res, key) => {
    let regionPageArr = []
    let regionPageArrMerge = []
    if (res?.data?.contributor) {
        regionPageArr = res?.data?.contributor?.filter(i => i?.name !== key)?.map(i => ({
            ...i,
            name: i.name,
            y: i.value,
            color: i.color,
            yAxis: 1,

            dataLabels: [{
                inside: false,
                enabled: true,
                rotation: 0,
                x: 32,
                overflow: "none",
                allowOverlap: false,
                color: "#212121",
                align: "center",
                crop: false,

                formatter() {
                    return `+ ${Math.abs(this.y).round(1)?.toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                    })}`;
                },
            },
                // {
                //     inside: true,
                //     enabled: true,
                //     rotation: 0,
                //     x: -30,
                //     overflow: "none",
                //     allowOverlap: true,
                //     color: "#212121",
                //     align: "left",
                //     crop: false,

                //     formatter() {
                //         return this.key;
                //     },
                // }
            ],
            type: "column",
        }))
    }
    if (res?.data?.detractor) {
        regionPageArrMerge = res?.data?.detractor?.filter(i => i?.name !== key)?.map(i => ({
            ...i,
            name: i.name,
            y: -Number(i.value),
            color: i.color,
            yAxis: 0,
            type: "column",

            dataLabels: [{
                inside: false,
                enabled: true,
                rotation: 0,
                x: -30,

                overflow: "none",
                allowOverlap: false,
                color: "#212121",
                align: "center",
                crop: false,
                formatter: function () {
                    return `- ${Math.abs(this.y).round(1)?.toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                    })}`;
                },
            },
                // {
                //     inside: true,
                //     enabled: true,
                //     rotation: 0,
                //     x: 30,
                //     overflow: "none",
                //     allowOverlap: true,
                //     color: "#212121",
                //     align: "right",
                //     crop: false,

                //     formatter() {
                //         return this.key;
                //     },
                // }
            ],
        }));
    }
    return [...regionPageArr, ...regionPageArrMerge]
}


export const getQuarterName = (data, year) => {
    const latestYear = new Date().getFullYear();
    let quarterName = Number.parseInt(data)
    if (Number.parseInt(data)) {
        if (Number.parseInt(data) === 1) {
            quarterName = "Q1"
        }
        if (Number.parseInt(data) === 2) {
            quarterName = "Q2"
        }

        if (Number.parseInt(data) === 3) {
            quarterName = "Q3"
        }

        if (Number.parseInt(data) === 4) {
            quarterName = "Q4"
        }

    } else {
        if (latestYear === Number.parseInt(year)) {
            quarterName = ""
        } else {
            quarterName = "All Quarters of"
        }
    }

    return quarterName
}

export const getRegionName = (regions, regionalLevel, isList = false) => {
    if (regionalLevel) {
        if (isList) {
            return `${regions} Region`
        } else {
            return `${regions?.data?.regions.filter((e) => { return e.id === Number.parseInt(regionalLevel) })[0]?.name} Region`

        }
    } else {
        return "All Regions"
    }
}


export const getTitleDecarb = (key) => {
    if (key === "modal_shift") {
        return "Modal Shift"
    }
    if (key === "alternative_fuel") {
        return "Alternative Fuel Usage"
    }
    if (key === "carrier_shift") {
        return "Carrier Shift"
    }

}

export const getHeaderName = (key) => {
    if (key === "modal_shift") {
        return "Modal Shift"
    } else {
        return "Dashboard"
    }

}

const regionList = [{
    id: 5,
    modalShiftpercentage: 35,
    carrierShiftpercentage: 20,
    alternativeShiftpercentage: 5,
    marker: {
        lat: 39.7684, lng: -86.1581
    },
    wayPoint: [{
        locationName: "Mill street charlottesville, Usa",
        lat: 39.7684,
        log: -86.1581
    }, {
        locationName: "Charlottesville, USA",
        lat: 38.0293,
        log: -78.4767
    }]
},
{
    id: 17,
    modalShiftpercentage: 32,
    carrierShiftpercentage: 25,
    alternativeShiftpercentage: 5,
    wayPoint: [{
        locationName: "Glendon, USA ",
        lat: 40.668538,
        log: -75.227398
    }, {
        locationName: "Philipsburg Newark Expy, USA", lat: 40.64809192584201, log: -74.6456
    }]
},
{
    id: 13,
    modalShiftpercentage: 30,
    carrierShiftpercentage: 25,
    alternativeShiftpercentage: 5,
    wayPoint: [{
        locationName: "Selinsgrove, USA",
        lat: 40.7990,
        log: -76.8622
    }, {
        locationName: "Danville, PA, USA", lat: 40.99775427960836, log: -76.64073778808651
    }]
},
{
    id: 3,
    modalShiftpercentage: 40,
    carrierShiftpercentage: 20,
    alternativeShiftpercentage: 5,
    wayPoint: [{
        locationName: "Ahoskie, NC",
        lat: 36.2868,
        log: -76.9847
    }, {

        locationName: "Rocky Mount, USA", lat: 35.942133612378086, log: -77.77727250711646
    }]
},
{
    id: 9,
    modalShiftpercentage: 34,
    carrierShiftpercentage: 26,
    alternativeShiftpercentage: 5,

    wayPoint: [{
        locationName: "Amboy, CA, USA",
        lat: 34.5554498,
        log: -115.7582837
    }, {
        locationName: "Morongo Valley, CA, USA", lat: 34.0470, log: -116.5808
    }]
},
{
    id: 12,
    modalShiftpercentage: 36,
    carrierShiftpercentage: 24,
    alternativeShiftpercentage: 5,
    marker: {
        lat: 30.2752, lng: -89.7812
    },
    wayPoint: [{
        locationName: "West Memphis, Arkansas, USA",
        lat: 35.122387,
        log: -90.063253
    }, {
        locationName: "Little Rock, USA",
        lat: 34.7239177935919,
        log: -92.27024484660606
    }]
}]
export const getRegion = (regionId) => {
    return regionList?.filter(i => i?.id === Number.parseInt(regionId))[0]?.wayPoint || null
}

export const getPercentage = (regionId, type) => {
    let percentageDto = regionList?.filter(i => i?.id === Number.parseInt(regionId))[0]
    let percentage = 0
    switch (type) {
        case "carrier_shift":
            percentage = percentageDto?.carrierShiftpercentage || 0
            break;
        case "alternative_fuel":
            percentage = percentageDto?.alternativeShiftpercentage || 0

            break;
        case "modal_shift":
            percentage = percentageDto?.modalShiftpercentage || 0

            break;

    }
    return percentage
}

export const getModalShiftEmissions = (value, regionsLevel, key, index) => {
    let percentage = getPercentage(regionsLevel, key)
    let emmision = 0
    console.log("value, percentage, index", value, regionsLevel, key, index, percentage)
    switch (index) {
        case 0:
            emmision = ((value * ((100 - percentage) / 100)) * 0.4).round(1)?.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 1,
                }
            )
            break;
        case 1:
            emmision = 'N/A'

            break;
        case 2:
            emmision = ((value * ((100 - percentage) / 100)) * 0.6).round(1)?.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 1,
                }
            )

            break;

    }
    return emmision
}

export const getMarkerR = (regionId) => {
    return regionList?.filter(i => i?.id === Number.parseInt(regionId))[0]?.marker || null
}



// 45.6