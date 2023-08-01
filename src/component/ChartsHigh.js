import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Boost from "highcharts/modules/boost";
import highcharts3d from "highcharts/highcharts-3d";
import borderRadius from "highcharts-border-radius"

Boost(Highcharts);
highcharts3d(Highcharts);
borderRadius(Highcharts);


const ChartsHigh = React.memo(props => {
    let arrNew1 = []
    let emissionRegionYear = []
    let arrNew = []
    let regionMaxValue = ""
    let regionUnitValue = ""
    let emissionYear1 = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"]
    let arrNew2 = []
    let ProjectDetails1 = []

    props?.options?.length > 0 && props.options?.map((x, index) => {

        switch (x.name) {
            case "lables":
                emissionRegionYear.push(x.data)
                break;
            case "Max":
                regionMaxValue = x.data
                break;
            case "Unit":
                regionUnitValue = x.data
                break;
            default:
                arrNew.push({
                    name: x.name, data: x.data, color: "#215154", type: (x.name === "company_level") || (x.name === "target_level") ? "spline" : "column", dashStyle: (index === 11) || (index === 12) ? "dot" : "none", showInLegend: (x.name === "company_level") || (x.name === "target_level") || (x.name === "base_level") ? false : true, dataLabels: {
                        enabled: true,
                        inside: false,
                        y: -10,
                        align: 'center',
                        verticalAlign: "bottom",
                        formatter: function () {
                            return `<div align='center'  style='color:#215154;font-size:13px'>${this.y} </br></div>`
                        },
                        useHTML: true,
                        style: {
                            color: 'white',
                            textOutline: false,
                        }
                    }
                })
        }
        return true

    })

    if (props.chart === 2) {
        props?.options?.[0]?.dataset?.length > 0 && props.options?.[0]?.dataset.map((x, index) => {
            arrNew1.push({
                events: {
                    legendItemClick: function () {
                        return false;
                    }
                },
                name: x.year, data: [Number(x.intensity)], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50
            })

        })
    }

    if (props.chart === "facilityComparison") {
        props?.options?.data?.length > 0 && props?.options?.data.map((x, index) => {
            arrNew1.push({
                events: {
                    legendItemClick: function () {
                        return false;
                    }
                },
                name: x.year, data: [Number(x.intensity)], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50
            })
            return true

        })
    }


    if (props.chart === "carrierOverview") {
        props?.options.map((x, index) => {
            arrNew1.push({
                events: {
                    legendItemClick: function () {
                        return false;
                    }
                },
                name: x.year, data: [Number(x.intensity)], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50
            })
            return true

        })
    }



    if (props.chart === "optionCarrierComparison") {
        props?.options?.dataset.map((x, index) => {
            arrNew1.push({ name: x?.carrier_name, obj: x, data: [Number(x[props?.dataytpe].toFixed(2))], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50 })
            return true

        })
    }


    if (props.chart === 1) {

        Object.entries(props.options ? props.options : {})?.map((x) => {

            if (x[0] !== "base_level" && x[0] !== "max" && x[0] !== "year") {
                arrNew2.push({
                    name: x[0] === "targer_level" ? "Target/Q" : "Company level", data: x[1], color: x[0] === "targer_level" ? "#427c90" : x[0] === "company_level" && "#285254", marker: {
                        symbol: 'circle',
                        radius: 10,
                    }, zoneAxis: 'x', zones: [{
                        value: 4 + (0.33 * (new Date().getMonth() + 1)),
                    }, {
                        dashStyle: props.options?.year?.[1] === new Date().getFullYear() ? "dot" : ""
                    }],
                    dataLabels: {
                        enabled: true,
                        y: -5,
                        x: -38,
                        color: "#215154",
                        crop: false,
                        overflow: 'none',
                        allowOverlap: false,
                        useHTML: true,
                        formatter: function () {

                            if (this.point === this.series.data[0]) {
                                return x[0] === "targer_level" ? "" : x[0] === "company_level" && "";
                            }
                        }
                    }
                })
            }
            // else if (x[0] === "year") {
            //     emissionReductionYear.push(x[1])
            // }
            return true;

        })
    }

    if (props.chart === "project") {

        Object.entries(props.options ? props.options : {}).forEach((x) => {
            if (x[0] !== "total_project") {
                ProjectDetails1.push(x[0] === "Ongoing_Project" ? ["Ongoing", x[1]] : ["Done", x[1]])
            }
            return true;
        })

    }
    const projectOption = {
        credits: {
            enabled: false
        },
        title: {
            style: {
                fontWeight: "bold",
                fontSize: '15px'
            },
            text: `<div class="h-1">${props?.options?.total_project ? props?.options?.total_project?.toLocaleString("en-US") : 0}</div></br>Lanes Shifted</br> to Intermodal`,
            align: 'center',
            verticalAlign: 'middle',

        },
        chart: {
            height: 230,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        tooltip: {
            // pointFormat: '<b>{point.percentage:.1f}%</b>'
            formatter: function () {
                return `${this.point.name} <b>` + this.y?.toLocaleString("en-US") + ""
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        colors: ["#5f9a80", "#F86D2A", "#c1d3c0"],
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },

            }
        },
        series: [{

            type: 'pie',
            name: 'All Projects',
            innerSize: '70%',
            data: ProjectDetails1
        }]
    }

    const options1 = {
        credits: {
            enabled: false
        },
        chart: {

            zoomType: 'xy',
        },
        title: {
            text: ''
        },
        legend: {
            enabled: true,
            itemMarginBottom: 5,
            floating: false,

            symbolWidth: 16,
            symbolRadius: 0,
            squareSymbol: true,

        },
        yAxis: {
            max: props.options?.max,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',
            labels: {
                formatter: function () {
                    return this.value.toLocaleString("en-US")
                }
            },
            plotLines: [{
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props.options?.base_level,

                label: {
                    y: -15,
                    x: 0,
                    align: 'left',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return `<div>COMPANY LEVEL BASELINE</div>`;

                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            }, {

                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: 1060000,

                label: {
                    y: -5,
                    x: 10,
                    text: 'Baseline',
                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: false,
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }

            }]
        },
        tooltip: {
            formatter: function () {
                return this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })
            }

        },
        dataLabels: {
            enabled: false,
            rotation: 0,
            color: '#FFFFFF',
            align: 'center',
            crop: false,
            format: '{point.y:.2f}', // one decimal

        },

        xAxis: {
            min: -1,
            labels: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    if (this.pos === 1) {
                        return this.value + "<br/>" + `<div style='font-weight:bold;padding-top:12px;'>${props.options?.year[0]}</div>`;
                    }

                    else if (this.pos === 5) {
                        return this.value + "<br/>" + `<div style='font-weight:bold;padding-top:12px;'>${props.options?.year[1]}</div>`;
                    }

                    return this.value
                }

            },
            categories: emissionYear1,
            plotLines: [{

                color: "#285254",
                width: 1,
                enabled: false,
                value: props.options?.year?.[1] === new Date().getFullYear() ? 4 + (0.33 * (new Date().getMonth() + 1)) : 14.10,
                label: {
                    text: 'Now',
                    rotation: 0,
                    x: 5,
                    y: 20,
                    useHTML: true,
                    style: {
                        color: "#285254",
                        fontSize: "12px",
                    }

                }

            }]
        },


        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },

            }
        },

        series: arrNew2,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },

            }]
        },


    }

    const optionFacilityComparison = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        chart: {
            type: 'column'
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 20,
            itemMarginTop: 10,
            labelFormatter: function () {
                let textData = "<div class='pointer-cursor' align:'center'  style='color:#215154' class='text-center'><div>All Facilities</div>"
                return this.index === 1 ? "<div  class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>" + props?.facilityName + "</div></div>" : textData;
            }

        },
        yAxis: {
            max: props.options?.[0]?.graphMax,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',

            plotLines: [
                //     {
                //     dashStyle: 'dot',
                //     color: '#215154',
                //     width: 2,
                //     value: props?.options?.[0]?.baseLine,
                //     label: {
                //         text: 'Baseline',
                //         align: 'left',
                //         x: 0,
                //         y: -10,

                //         useHTML: true,
                //         style: {
                //             color: '#215154',
                //             fontSize: "12px",
                //         }

                //     }
                // },
                {
                    dashStyle: 'dot',
                    color: '#D8856B',
                    width: 2,
                    value: props?.options?.max,

                    label: {
                        y: Math.round(((props?.options?.intensity - props?.options?.industrialAverage) / props?.options?.intensity) * 100) > 0 ? -20 : 20,
                        text: `${Math.round(((props?.options?.intensity - props?.options?.industrialAverage) / props?.options?.intensity) * 100) > 0 ? '+' : ''} ${Math.round(((props?.options?.intensity - props?.options?.industrialAverage) / props?.options?.intensity) * 100)}%`,
                        x: -30,

                        align: 'right',
                        paddingBottom: 10,
                        verticalAlign: "bottom",
                        color: '#D8856B',
                        useHTML: true,
                        style: {
                            color: '#D8856B',
                            fontSize: "20px",
                        }
                    }
                }, {
                    // dashStyle: 'dot',
                    color: '#215154',
                    width: 2,
                    value: props?.options?.industrialAverage,
                    zIndex: 10,

                    label: {
                        text: 'Industry average',
                        align: 'left',
                        x: 0,
                        y: Math.round(((props?.options?.max - props?.options?.industrialAverage) / props?.options?.max) * 100) > 0 ? 20 : -20,
                        useHTML: true,
                        style: {

                            fontSize: "12px",
                            color: '#215154'
                        }
                    }
                }]
        },
        xAxis: {
            categories: [""
            ],
            crosshair: true
        },

        tooltip: {
            enabled: false,
        },
        plotOptions: {

            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",

                dataLabels: {
                    enabled: true,
                    inside: false,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function () {

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y + "</br></div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y + "</br></div></div>"
                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: arrNew1
    }

    const option2 = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        chart: {
            type: 'column',
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 20,
            itemMarginTop: 10,
            labelFormatter: function () {
                // color: rgb(204, 204, 204); cursor: pointer; font-size: 12px; font-weight: bold; fill: rgb(204, 204, 204);

                let textData = "<div  class='pointer-cursor' align:'center'  style='color:#215154' class='text-center'><div>Last Year</div><br>( " + this.name + " )</div>"
                return this.index === 1 ? "<div  class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>This Year</div><br>( " + this.name + " )</div>" : textData;
            }

        },
        yAxis: {
            max: props.options?.[0]?.graphMax,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',

            plotLines: [
                //     {
                //     dashStyle: 'dot',
                //     color: '#215154',
                //     width: 2,
                //     value: props?.options?.[0]?.baseLine,
                //     label: {
                //         text: 'Baseline',
                //         align: 'left',
                //         x: 0,
                //         y: -10,

                //         useHTML: true,
                //         style: {
                //             color: '#215154',
                //             fontSize: "12px",
                //         }

                //     }
                // },
                {
                    dashStyle: 'dot',
                    color: '#D8856B',
                    width: 2,
                    value: props?.options?.[0]?.max,

                    label: {
                        y: Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100) > 0 ? -20 : 20,
                        text: `${Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100) > 0 ? '+' : ''} ${Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100)}` + "%",
                        x: -70,

                        align: 'right',
                        paddingBottom: 10,
                        verticalAlign: "bottom",
                        color: '#D8856B',
                        useHTML: true,
                        style: {
                            color: '#D8856B',
                            fontSize: "20px",
                        }
                    }
                }, {
                    // dashStyle: 'dot',
                    color: '#215154',
                    width: 2,
                    value: props?.options?.[0]?.industrialAverage,
                    zIndex: 10,

                    label: {
                        text: 'Industry average',
                        align: 'left',
                        x: 0,
                        y: Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100) > 0 ? 20 : -20,
                        useHTML: true,
                        style: {

                            fontSize: "12px",
                            color: '#215154'
                        }
                    }
                }]
        },
        xAxis: {
            categories: [""
            ],
            crosshair: true
        },
        tooltip: {
            enabled: false,
        },

        plotOptions: {

            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",

                dataLabels: {
                    enabled: true,
                    inside: false,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function () {

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y + "</br></div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y + "</br></div></div>"
                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: arrNew1
    }
    const option3 = {
        credits: {
            enabled: false
        },
        title: {
            style: {
                fontWeight: "bold",
                fontSize: '25px'
            },
            text: `<div className="h-1">${props?.pieChartCount}</div><br>Projects`,
            align: 'center',
            verticalAlign: 'middle',

        },
        chart: {
            height: 230,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        colors: ["#C1D3C0", "#D8856B", "#5F9A80"],
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },

            }
        },
        series: [{

            type: 'pie',
            name: 'Project Overview',
            innerSize: '70%',
            data: [
                ['', 0],
                ['', 0],
                ['', 100],

            ]
        }]
    }
    const option4 = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'column',
            zoomType: 'xy',
        },

        title: {
            text: ''
        },
        // accessibility: {
        //     announceNewData: {
        //         enabled: true
        //     }
        // },
        xAxis: {
            labels: {
                color: "#285254",
            },
            categories: emissionRegionYear[0],
        },

        yAxis: [{

            max: regionMaxValue,

            plotLines: [{
                dashStyle: 'dot',
                color: '#5F9A80',
                width: 2,
                value: props.options?.[13]?.data,
                label: {

                    align: 'left',
                    x: 0,
                    y: -15,

                    useHTML: true,
                    formatter: function () {

                        return "<div align='center'  style='color:#215154;font-size:12px'> Company Level </br> <div style='color:#215154;font-size:12px'>BaseLine</br></div></div><div style='color:#215154;font-size:12px; padding-top:0.3025rem'>Company level</div></div>"
                    },
                    style: {
                        color: '#5F9A80',
                        fontSize: "12px",
                    }

                }

            }],
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: "#212121"
                },
                formatter: function () {

                    return this.value + " " + regionUnitValue


                }
            }
        }, {
            labels: {
                format: '{value} ' + regionUnitValue,

                style: {
                    color: "#FFF"
                }
            },
            title: {
                text: '',
                style: {
                    color: "#212121"
                }
            }
        }],
        tooltip: {
            // formatter: function () {
            //     return this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + ""
            // }
            enabled: false,

            // useHTML: true,
            formatter: function () {
                return `${this.x}<br/> ${arrNew[0].name}: ${this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })} `;
            },
        },
        legend: {
            enabled: false,

            itemMarginBottom: 5,
            floating: false,

            symbolWidth: 16,
            symbolRadius: 0,
            squareSymbol: true,

        },

        plotOptions: {
            column: {
                stacking: 'normal'
            },
            enableMouseTracking: true,
            dataLabels: {
                enabled: true
            },
            tooltip: {
                enabled: false,
            },
            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",
                pointWidth: 40,
                tooltip: {
                    enabled: true,
                    style: {
                        zIndex: 99999
                    },
                    useHTML: true,
                    formatter: function () {
                        return '{series.name}: {point.y}<br/>Total: {point.stackTotal} ' + regionUnitValue;
                    },

                },
                dataLabels: {
                    enabled: true,
                    inside: true,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function () {

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div><div class='text-center' style='color:#215154;'>" + props?.unitValue + "</div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div><div class='text-center' style='color:#215154;'>" + props?.unitValue + "</div></div>"

                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                },

            }

        },
        colors: [


        ],


        series: arrNew,
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },

        }

    }
    const option5 = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'column',
            inverted: true,
            height: props?.regionPageArr?.length * 30,
            // marginLeft: 90,
            // marginRight: 90,
            // height: props?.regionPageArr?.length * 35,
            // events: {
            //     load() {
            //         const firstSeries = this.series[0];
            //         console.log(firstSeries, "thisthis")
            //     }
            // }
        },
        xAxis: {
            categories: props.regionPageArr?.map(i => `${i?.name} (${i?.y > 0 ? `+ ${i?.y}` : `- ${Math.abs(i?.yValue)}`})`)

        },
        plotOptions: {

            // series: {
            //     borderRadiusTopLeft: "20%",
            //     borderRadiusTopRight: "20%",
            // },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                // borderRadius: '10px'

            },
            series: {
                //     borderRadiusTopLeft: props.regionPageArr > 10 ? 0: 8,
                //     borderRadiusTopRight: props.regionPageArr > 10 ? 0: 8,
                //     borderRadiusBottomLeft: 8,
                //     borderRadiusBottomRight: 8
            }

        },
        yAxis: {
            gridLineColor: 'transparent',
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 0.5,
                color: 'black',
                zIndex: 10
            }],
        },

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,

            formatter() {
                return this.y > 0 ? `<b>${this.key} </br> ${this.y} ${props?.unitDto || 'g'}</b>` : `<b>${this.key} </br> ${Math.abs(this.series.options?.data[this.point?.index]?.yValue)} ${props?.unitDto || 'g'}</b>`
            }

        },
        series: [{
            name: '',
            pointWidth: 15,
            data: props.regionPageArr ? props.regionPageArr : [['Shanghai', 24]],
        }]

    }


    const facilityOption = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'bar',
            marginLeft: 90,
            marginRight: 90,
            height: props?.regionPageArr?.length * 45,
        },
        plotOptions: {
            bar: {
                enabled: false,

            },
            series: {

                enabled: false,

            }
        },
        colors: [
            '#4572A7',
            '#AA4643',
            '#89A54E',
            '#80699B',
            '#3D96AE',
            '#DB843D',
            '#92A8CD',
            '#A47D7C',
            '#B5CA92'
        ],

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [

            {
                // tickPositions: props.regionPagecontributor,

                color: "#215154",

                labels: {
                    enabled: false,
                    align: "left",
                    x: 40,
                    verticalAlign: 'left',
                    formatter() {

                        return this?.chart?.userOptions?.series?.[0]?.data[this.value].y > 0 ? this?.chart?.userOptions?.series?.[0]?.data[this.value].name : ``
                    }
                },

            }, {

                // tickPositions: props.regionPagedetractor,
                linkedTo: 0,
                labels: {
                    enabled: false,

                    align: "left",
                    x: -120,
                    verticalAlign: 'right',
                    formatter() {

                        return this?.chart?.userOptions?.series?.[0]?.data[this.value]?.y < 0 ? this?.chart?.userOptions?.series?.[0]?.data[this.value]?.name : ``
                    }
                },
                opposite: true
            }],

        yAxis: [{
            tickPositioner: function () {

                let maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
                let halfMaxDeviation = Math.ceil(maxDeviation / 2);

                return [-maxDeviation - 1, -halfMaxDeviation - 1, 0, halfMaxDeviation + 4, maxDeviation + 4];
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            plotLines: [{
                value: 0,
                width: 0.5,
                color: 'black',
                zIndex: 10
            }],
            title: {
                text: ''
            }
        }],
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,

            formatter() {
                return this.y > 0 ? `<b>${this.key} </br> ${this.y} ${props?.unitDto || 'g'}</b>` : `<b>${this.key} </br> ${Math.abs(this.series.options?.data[this.point?.index]?.y)} ${props?.unitDto || 'g'}</b>`
            }

        },
        series: [{

            name: '',
            data: props.regionPageArr ? props.regionPageArr : [['Shanghai', 24]],
            pointWidth: 24,
            dataLabels: {
                enabled: true,
            }
        }]
    }
    const laneOption = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'bar',
            marginLeft: 90,
            marginRight: 90,
            height: props?.lanePageArr?.length > 3 ? props?.lanePageArr?.length * 30 : props?.lanePageArr?.length * 70,
        },
        plotOptions: {
            bar: {
            },
            series: {
                dataLabels: {
                    enabled: false,
                    inside: false
                }
            }
        },
        colors: [
            '#4572A7',
            '#AA4643',
            '#89A54E',
            '#80699B',
            '#3D96AE',
            '#DB843D',
            '#92A8CD',
            '#A47D7C',
            '#B5CA92'
        ],

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [

            {
                tickPositions: props.lanePagecontributor,

                color: "#215154",

                labels: {
                    align: "left",
                    x: 40,
                    enabled: false,
                    verticalAlign: 'left',
                    formatter() {

                        return this?.chart?.userOptions?.series?.[0]?.data[this.value].y > 0 ? this?.chart?.userOptions?.series?.[0]?.data[this.value].name : ``
                    }
                },

            }, {

                tickPositions: props.lanePagedetractor,
                linkedTo: 0,
                labels: {

                    enabled: false,
                    align: "left",
                    x: -120,
                    verticalAlign: 'right',
                    formatter() {

                        return this?.chart?.userOptions?.series?.[0]?.data[this.value]?.y < 0 ? this?.chart?.userOptions?.series?.[0]?.data[this.value]?.name : ``
                    }
                },
                opposite: true
            }],

        yAxis: [{
            tickPositioner: function () {

                let maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
                let halfMaxDeviation = Math.ceil(maxDeviation / 2);

                return [-maxDeviation - 1, -halfMaxDeviation - 1, 0, halfMaxDeviation + 4, maxDeviation + 4];
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,

            plotLines: [{
                value: 0,
                width: 0.5,
                color: 'black',
                zIndex: 10
            }],
            title: {
                text: ''
            }
        }],
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,

            formatter() {
                return this.y > 0 ? `<b ><span class='text-capitalize'>${this.key} </span> </br> ${this.y?.round(1).toLocaleString("en-US", { minimumFractionDigits: 1 })} ${props?.unitDto || 'g'}</b>` : `<b > <span class='text-capitalize'>${this.key} </span> </br> ${Math.abs(this.series.options?.data[this.point?.index]?.y.round(1))?.toLocaleString("en-US", { minimumFractionDigits: 1 })} ${props?.unitDto || 'g'}</b>`
            }
        },
        series: [{

            name: '',
            data: props.lanePageArr ? props.lanePageArr : [['Shanghai', 24]], pointWidth: 17
            ,
            dataLabels: {
                enabled: false,
                rotation: 0,
                color: '#FFFFFF',
                align: 'center',
                crop: false,
                formatter() {
                    return this.y > 0 ? this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + " g" : Math.abs(this.y)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + " g"
                }

            }
        }]
    }


    const stackedGraph = {

        title: {
            text: ''
        },
        chart: {
            type: 'column'
        },

        yAxis: {
            // max: props.options?.[0]?.graphMax,
            stackLabels: {
                enabled: false
            },
            min: 0,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',


        },
        // xAxis: {
        //     categories: ["Truck", "Intermodal"],
        // },

        xAxis: {

            labels: {
                enabled: false,
                useHTML: true,
                color: "#285254",

                // formatter: function () {
                //     console.log("sssssssssssssssssss", this, this?.chart?.userOptions?.series[this.index]?.key , this?.chart?.userOptions?.series, this.index)
                //     let textData = "<div  class='pointer-cursor' align:'center'  style='color:#215154' class='text-center'><div>Last Year</div><br>( " + this?.chart?.userOptions?.series[this.index]?.key + " )</div>"
                //     return this.index === 1 ? "<div  class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>This Year</div><br>( " + this?.chart?.userOptions?.series[this.index]?.key + " )</div>" : textData;

                // }

            },


        },

        tooltip: {
            enabled: false,
        },

        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 20,
            itemMarginTop: 10,
            labelFormatter: function () {
                // color: rgb(204, 204, 204); cursor: pointer; font-size: 12px; font-weight: bold; fill: rgb(204, 204, 204);
                { console.log("thisthis", this) }
                let textData = "<div  class='pointer-cursor' align:'center'  style='color:#215154' class='text-center'><div>Last Year</div><br>( " + this?.options?.key + " )</div>"
                return this.index === 1 ? "<div  class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>This Year</div><br>( " + this?.options?.key + " )</div>" : textData;
            }

        },

        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                // borderRadiusTopLeft: "20%",
                // borderRadiusTopRight: "20%",

                dataLabels: {
                    // enabled: true,
                    inside: true,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function () {
                        console.log("this", this)
                        return `<div align='center' class='text-center' style='color:#fff; font-size:15px'}>  ${this.y}% </br>${this.series?.options?.name}</div></div>`
                    },
                    useHTML: true,

                }
            }
        },
        series: [{
            name: 'Intermodal',
            data: [25, 30],
            color: "#5F9a80",
            key: 2023
        }, {
            name: 'Truck',
            data: [75, 70],
            color: "#215154",
            key: 2022
        }]
    }


    const optionCarrierOverview = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        chart: {
            type: 'column'
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 30,
            itemMarginTop: 10,
            labelFormatter: function () {
                let textData = "<div class='pointer-cursor' align:'center'  style='color:#215154' class='text-center text-capitalize'><div>All Carriers</div><br></div>"
                return this.index === 1 ? "<div class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center text-capitalize' ><div>" + props?.carrier_name + "</div><br></div>" : textData;
            }

        },
        yAxis: {
            max: props.options?.[0]?.graphMax,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',
            plotLines: [
                {
                    dashStyle: 'dot',
                    color: '#215154',
                    width: 2,
                    value: 30,
                    label: {
                        text: 'Baseline',
                        align: 'left',
                        x: 0,
                        // y: -10,
                        y: 10,

                        useHTML: true,
                        style: {
                            color: '#215154',
                            fontSize: "12px",
                        }

                    }
                },
                // {
                //     dashStyle: 'dot',
                //     color: '#D8856B',
                //     width: 2,
                //     value: 60,

                //     label: {
                //         y: Math.round(((props?.max - props?.industrialAverage) / props?.max) * 100) > 0 ? -20 : 20,
                //         text: `${Math.round(((props?.max - props?.industrialAverage) / props?.max) * 100) > 0 ? '+' : ''} ${Math.round(((props?.max - props?.industrialAverage) / props?.max) * 100).toFixed(2)}` + "%",
                //         x: -30,

                //         align: 'right',
                //         paddingBottom: 10,
                //         verticalAlign: "bottom",
                //         color: '#D8856B',
                //         useHTML: true,
                //         style: {
                //             color: '#D8856B',
                //             fontSize: "20px",
                //         }
                //     }
                // }, 
                {
                    dashStyle: 'dot',
                    color: '#215154',
                    width: 2,
                    value: props?.industrialAverage,
                    zIndex: 10,

                    label: {
                        text: 'Industry average',
                        align: 'left',
                        x: 0,
                        y: Math.round(((props?.max - props?.industrialAverage) / props?.max) * 100) > 0 ? 20 : -10,
                        useHTML: true,
                        style: {

                            fontSize: "12px",
                            color: '#215154'
                        }
                    }
                }]
        },
        xAxis: {
            categories: [""
            ],
            crosshair: true
        },

        tooltip: {
            enabled: false,

            formatter() {
                return this.y > 0 ? `<b>${this.key} </br> ${this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</b>` : `<b>${this.key} </br> ${Math.abs(this.series.options?.data[this.point?.index]?.y)?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</b>`
            }
        },

        plotOptions: {

            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",

                dataLabels: {
                    enabled: true,
                    inside: false,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function () {

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y + "</br></div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y + "</br></div></div>"
                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: arrNew1
    }

    const optionCarrierComparison = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        chart: {
            type: 'column'
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 10,
            itemMarginTop: 10,
            labelFormatter: function () {
                console.log("thisd", this, this?.userOptions?.obj)

                //     let textData = `<div class="bgSecond" /><div '>
                //     ${this?.userOptions?.obj?.carrier_logo ? `<img

                //             src="${process.env.REACT_APP_BASE_URLFULL}${this.userOptions?.obj?.carrier_logo}"
                //                             alt="logo"
                //                             class="barImg"
                //                         />` : `<div class="logo-Icon border-right-green me-0">
                //                     <span className="logo-icon-name">${
                //                         this?.userOptions?.obj?.carrier?.substring(0, 2)
                //                     }</span>
                //                 </div>`} 

                //     </div>`
                //     return this.index === 1 ? `<div class="bgPrimary" /><div>
                //     ${this?.userOptions?.obj?.carrier_logo ? `<img

                //             src="${process.env.REACT_APP_BASE_URLFULL}${this.userOptions?.obj?.carrier_logo}"
                //                             alt="logo"
                //                             class="barImg"
                //                         />` : `<div class="logo-Icon border-right-green me-0">
                //                     <span className="logo-icon-name">${
                //                         this?.userOptions?.obj?.carrier?.substring(0, 2)
                //                     }</span>
                //                 </div>`}
                //   </div>` : textData;

            }

        },
        yAxis: {
            max: Math.trunc((Math.max(...arrNew1?.map(i => i?.data)) + 10 || 50)) * 1.30,

            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',

        },
        xAxis: {
            categories: [""
            ],
            crosshair: true
        },

        tooltip: {
            enabled: false,

            formatter() {
                return this.y > 0 ? `<b>${this.key} </br> ${this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</b>` : `<b>${this.key} </br> ${Math.abs(this.series.options?.data[this.point?.index]?.y)?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</b>`
            }
        },

        plotOptions: {

            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",
                dataLabels: {
                    enabled: true,
                    inside: false,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function () {

                        return this.color === "#C1D3C0" ? `<div align='center' class='text-center' style='color:#215154; font-size:13px'}> 
                        
                       
                        ${props?.dataytpe === "shipments" ? this.y : this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })} </br></div></div>` : `<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>
                        
                        ${props?.dataytpe === "shipments" ? this.y : this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })} </br></div></div>`
                        // return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div><div class='text-center' style='color:#215154;'>" + props?.unitValue + "</div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div><div class='text-center' style='color:#215154;'>" + props?.unitValue + "</div></div>"

                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: arrNew1
    }

    let graphChart = option4

    if (props.chart === 1) {
        graphChart = options1
    } else if (props.chart === 2) {
        graphChart = option2
    } else if (props.chart === "facilityComparison") {
        graphChart = optionFacilityComparison
    } else if (props.chart === 3) {
        graphChart = option3
    } else if (props.chart === "carrierOverview") {
        graphChart = optionCarrierOverview
    } else if (props.chart === "optionCarrierComparison") {
        graphChart = optionCarrierComparison
    } else if (props.chart === "region") {
        graphChart = option5
    } else if (props.chart === "facility") {
        graphChart = facilityOption
    } else if (props.chart === "lane") {
        graphChart = laneOption
    } else if (props.chart === "project") {
        graphChart = projectOption
    } else if (props.chart === "stackedGraph") {
        graphChart = stackedGraph

    }


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={graphChart} />
        </div>
    )
    // }
}, (_, nextProps) => {
    return nextProps?.reloadData
}

)

export default ChartsHigh