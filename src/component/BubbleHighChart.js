import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more'
import Boost from "highcharts/modules/boost";

HC_more(Highcharts)

Boost(Highcharts);

export default function BubbleHighChart(props) {
    let bubbleArr = []
    props?.options.map((x) =>
        bubbleArr.push({ color: x.color, name: x.name, x: x.x, y: x.y, z: Number(x.z), fillColor: x.color })
    )
    const bubbleOption = {
        credits: {
            enabled: false
        },


        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
        legend: { enabled: false },
        title: { text: '' },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'tCo2e'
            },
            labels: {
                enabled: false,

            },
            plotLines: [{
                color: 'transparent',
                dashStyle: 'dot',
                width: 2,

                label: {
                    rotation: 0,
                    y: 25,
                    x: 10,
                    style: {
                        fontWeight: "bold",
                    },
                    text: 'Emissions <br /> Intensity <br /> gCo2/Ton-Mile'
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: ''
            }
        },

        yAxis: {
            min: Math.trunc((Math.min(...props?.options?.map(i => i?.y)) || 50) - 10),

            title: {
                text: 'gCO2e/Ton-Mile'
            },
            labels: {
                formatter: function () {
                    if (this.value < 1000) {
                        return this.value + 'g';
                    }
                    else if (this.value >= 1000) {
                        return this.value + "g";
                    }
                    return this.value
                }
            },
            plotLines: [{
                color: 'transparent',
                dashStyle: 'dot',
                width: 2,
                value: 800,

                label: {
                    rotation: 0,
                    y: 180,
                    x: 870,
                    style: {
                        fontWeight: "bold",
                    },
                    text: 'Ton Miles of Fright'
                },
                zIndex: 3
            }, {
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: 1500,
                zIndex: 10,
                label: {
                    text: 'Emissions <br />Intensity <br /> gCO2e ton-mile',
                    align: 'left',
                    x: 10,
                    y: -20,
                    useHTML: true,
                    style: {
                        fontSize: "14px",
                        color: '#215154'
                    }
                }
            }],

        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b><span class="text-capitalize">{point.name}:</span></b> {point.y:.1f}g</sub>'
        },
        plotOptions: {
            series: {
                marker: {
                    fillOpacity: 1,
                    // fillColor: '#FFFFFF',
                    lineWidth: 0,
                    lineColor: null // inherit from series
                },
                dataLabels: {
                    inside: false,
                    enabled: true,
                    y: -15,
                    format: '<span class="text-capitalize">{point.name}</span>'
                }
            }
        },

        // { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
        // { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
        // { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },

        series: [{

            data: bubbleArr,
            colorByPoint: true
        }]
    }
    return (
        <HighchartsReact highcharts={Highcharts} options={bubbleOption} />)
}