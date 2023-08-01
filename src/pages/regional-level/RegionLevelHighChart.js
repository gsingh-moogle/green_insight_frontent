import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Boost from "highcharts/modules/boost";
import highcharts3d from "highcharts/highcharts-3d";
Boost(Highcharts);
highcharts3d(Highcharts);
const RegionLevelHighChart = React.memo((props) => {

    let emissionsReduction = [];
    let totalEmissionArr = [];
    let totalEmissionIntensity = [];
    let emissionYear1 = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"]

    if (props.chart === "emissionReduction") {
        Object.entries(props.options ? props.options : {})?.map((x) => {
            if (x[0] !== "base_level" && x[0] !== "max" && x[0] !== "year" && x[0] !== "company_level") {
                emissionsReduction.push({
                    name: x[0] === "targer_level" ? props?.regionName + " Target/Q" : x[0] === "company_level" ? "Company level" : props?.regionName + " Region", data: x[1], color: x[0] === "targer_level" ? "#427c90" : x[0] === "company_level" ? "#325454" : "#285254", marker: {
                        symbol: 'circle',
                        radius: 10,
                    }, zoneAxis: 'x', threshold: 2, zones: [{
                        value: 4 + (0.33 * (new Date().getMonth() + 1)),
                    }, {
                        dashStyle: props.options?.year?.[1] === new Date().getFullYear() ? "dot" : ""
                    }],
                    dataLabels: {
                        enabled: true,
                        y: -4,
                        x: -30,
                        color: "#215154",
                        useHTML: true,
                        crop: false,
                        overflow: 'none',
                        allowOverlap: false,
                        formatter: function () {
                            if (this.point === this.series.data[0]) {
                                return x[0] === "targer_level" ? `` : x[0] === "company_level" ? "<div style='margin-top:0px;font-size:12px'>Company<br/>Level</div>" : ``;
                            }
                        }
                    }
                })
            }
            return true
       })
    }

    if (props.chart === "emissionReductionFacility") {
        Object.entries(props.options ? props.options : {})?.map((x) => {
            if (x[0] !== "base_level" && x[0] !== "max" && x[0] !== "year" && x[0] !== "company_level") {
                emissionsReduction.push({
                    name: x[0] === "targer_level" ? props?.regionName + " Target/Q" : x[0] === "company_level" ? "Company level" : props?.regionName + " Facility", data: x[1], color: x[0] === "targer_level" ? "#427c90" : x[0] === "company_level" ? "#325454" : "#285254", marker: {
                        symbol: 'circle',
                        radius: 10,
                    }, zoneAxis: 'x', threshold: 2, zones: [{
                        value: 4 + (0.33 * (new Date().getMonth() + 1)),
                    }, {
                        dashStyle: props.options?.year?.[1] === new Date().getFullYear() ? "dot" : ""
                    }],
                    dataLabels: {
                        enabled: true,
                        y: -4,
                        x: -30,
                        color: "#215154",
                        useHTML: true,
                        crop: false,
                        overflow: 'none',
                        allowOverlap: false,
                        formatter: function () {
                            if (this.point === this.series.data[0]) {
                                return x[0] === "targer_level" ? `` : x[0] === "company_level" ? "<div style='margin-top:0px;font-size:12px'>Company<br/>Level</div>" : ``;
                            }
                        }
                    }
                })
            }
           
            return true;

        })
    }



    if (props.chart === "totalEmission") {

        props?.options?.[0]?.dataset?.length > 0 && props.options?.[0]?.dataset.map((x, index) => {

            totalEmissionArr.push({ name: x.quarter + " " + x.year, data: [Number(x.contributor)], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50 })

        })
    }
    if (props.chart === "emissionIntensity") {

        props?.options?.[0]?.dataset?.length > 0 && props.options?.[0]?.dataset.map((x, index) => {

            totalEmissionIntensity.push({ name: `Q${x.quarter} ${x.year}` , data: [Number(x.intensity)], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50 })

        })

    }
    const optionPieChart = {
        credits: {
            enabled: false
        },
        title: {
            style: {
                fontWeight: 'bold',
                color: '#285254'
            },
            text: `<div style="color:;font-size:20px">${props?.pieChartCount}</div><br><span>Projects</span>`,
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
                ['', 99.90],

            ]
        }]
    }
    const optionsEmissionReductionFacility = {
        credits: {
            enabled: false
        },
        chart: {

            zoomType: 'xy',
        },
        title: {
            text: ''
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
                    return this.value?.toLocaleString("en-US", { minimumFractionDigits: 1 })
                }
            },
            plotLines: [{
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props.options?.base_level?.[0],
                enabled: false,
                label: {
                    y: -15,
                    x: 0,

                    align: 'left',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return '<div>COMPANY LEVEL BASELINE</div>';

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
                value: props.options?.base_level?.[0],

                label: {
                    y: -10,
                    x: -10,

                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return '<div></div>';

                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            },
            {
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props?.maxRegionsValue,

                label: {
                    y: -3,
                    x: 0,

                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return `<div>${props?.regionName ? props?.regionName : "Pacific"} Facility</div><br/>`;

                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            },
            ]
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.key} </br>` + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })
            }
        },
        dataLabels: {
            enabled: false,
            rotation: 0,
            color: '#FFFFFF',
            align: 'center',
            crop: false,
            format: '{point.y:.2f}',

        },

        xAxis: {
            min: -1,
            labels: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    if (this.pos === 1) {
                        return  `${this.value} <br/><div style='font-weight:bold;padding-top:12px;'>${props.options?.year[0]}</div>`;
                    }

                    else if (this.pos === 5) {
                        return `${this.value} <br/> <div style='font-weight:bold;padding-top:12px;'>${props.options?.year[1]}</div>`;
                    }

                    return this.value
                }

            },
            categories: emissionYear1,
            plotLines: [{


                color: "#285254",
                width: 1,
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

        series: emissionsReduction,

        responsive: {
            rules: [{
                condition: {
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },




    }
    const optionsEmissionReduction = {
        credits: {
            enabled: false
        },
        chart: {

            zoomType: 'xy',
        },
        title: {
            text: ''
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
                    return this.value?.toLocaleString("en-US", { minimumFractionDigits: 1 })
                }
            },
            plotLines: [{
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props.options?.base_level?.[0],
                enabled: false,
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
                value: props.options?.base_level?.[0],

                label: {
                    y: -10,
                    x: -10,

                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return '<div></div>';

                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            },
            {
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props?.maxRegionsValue,

                label: {
                    y: -3,
                    x: 0,

                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return `<div>${props?.regionName ? props?.regionName : "Pacific"} Region</div><br/>`;

                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            },
            ]
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.key} </br>` + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })
            }
        },
        dataLabels: {
            enabled: false,
            rotation: 0,
            color: '#FFFFFF',
            align: 'center',
            crop: false,
            format: '{point.y:.2f}',

        },

        xAxis: {
            min: -1,
            labels: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    if (this.pos === 1) {
                        return `${this.value} <br/> <div style='font-weight:bold;padding-top:12px;'>${props.options?.year[0]}</div>`;
                    }

                    else if (this.pos === 5) {
                        return `${this.value} <br/> <div style='font-weight:bold;padding-top:12px;'>${props.options?.year[1]}</div>`;
                    }

                    return this.value
                }

            },
            categories: emissionYear1,
            plotLines: [{


                color: "#285254",
                width: 1,
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

        series: emissionsReduction,

        responsive: {
            rules: [{
                condition: {
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },




    }
    const optionTotalEmission = {

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

                let textData = "<div align:'center'  style='color:#215154' class='text-center'><div>Last Quarter</div><br>( Q" + this.name + " )</div>"
                return this.index === 1 ? "<div align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>This Quarter</div><br>( Q" + this.name + " )</div>" : textData;
            }

        },
       
        yAxis: {
            max: props?.options?.[0]?.max,
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

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div></div>"
                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: totalEmissionArr
    }
    const optionEmissionIntenisty = {
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
                let textData = "<div align:'center'  style='color:#215154' class='text-center'><div>Last Year</div><br>( " + this.name + " )</div>"
                return this.index === 1 ? "<div align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>This Year</div><br>( " + this.name + " )</div>" : textData;
            }

        },
        yAxis: {
            max: props?.options?.[0]?.graphMax,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',

            plotLines: [
               
                {
                    dashStyle: 'dot',
                    color: '#D8856B',
                    width: 2,
                    value: props.options?.[0]?.max,

                    label: {
                        y: Math.round(((props.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props.options?.[0]?.max) * 100).toFixed(2) > 0 ? -20 : 20,
                        text: `${Math.round(((props.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props.options?.[0]?.max) * 100).toFixed(2) > 0 ? '+' : ''} ${Math.round(((props.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props.options?.[0]?.max) * 100)} %`,
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
                    value: props?.options?.[0]?.industrialAverage,
                    zIndex: 10,

                    label: {
                        text: 'Industry average',
                        align: 'left',
                        x: 0,
                        y: Math.round(((props.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props.options?.[0]?.max) * 100).toFixed(2) > 0 ? 20 : -20,
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

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "  </br></div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div></div>"
                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: totalEmissionIntensity

    }
    return (
        <HighchartsReact highcharts={Highcharts} options={props.chart === "emissionReduction" ? optionsEmissionReduction : props.chart === "emissionReductionFacility" ? optionsEmissionReductionFacility : props.chart === "totalEmission" ? optionTotalEmission : props.chart === "piechart" ? optionPieChart : optionEmissionIntenisty} />)
}, (_, nextProps) => {
    return nextProps?.reloadData
}
)

export default RegionLevelHighChart