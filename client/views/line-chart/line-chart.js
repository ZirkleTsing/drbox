
/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getChatInfo } from '../../store/redux'

class LineChart extends Component {
  static propTypes = {
    getChatInfo: PropTypes.func.isRequired,
  }

  state = {
    Line: null
  }

  componentWillMount() {
    this.props.getChatInfo()
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const line = require("react-chartjs-2").Line
      this.setState({
        Line: line
      })
    }
  }

  render() {
    if (!this.state.Line) {
      return null
    }
    if (this.state.Line) {
      const Line = this.state.Line
      const chartData = {
        labels: this.props.chartInfo.map((info) => info.update_at),
        datasets: [
          {
            label: '价格波动曲线',
            data: this.props.chartInfo.map((info) => info.goodsPrice),
            backgroundColor: 'transparent', // 填充数据点
            borderColor: '#F6A139',
            fill: false, // How to fill the area under the line 这里不填充 http://www.chartjs.org/docs/latest/charts/line.html
            borderWidth: 4,
            pointStyle: 'line',
            lineTension: 0, // set 0 to draw straight line
            pointRadius: 0, // The radius of the point shape. If set to 0, the point is not rendered
            pointHoverRadius: 0,
          }
        ]
      }
      const DEFAULT_CHART_OPTIONS = {
        // tooltips: {
        //   // mode: 'dataset',
        //   position: 'nearest',
        //   callbacks: {},
        //   displayColors: false,
        //   yPadding: 16,
        //   xPadding: 7, // Padding to add on left and right of tooltip.
        //   cornerRadius: 4,
        //   bodyFontSize: 14,
        //   titleFontSize: 14,
        //   bodySpacing: 8
        // },
        // // scaleLineColor : normalShow ? 'blue' : 'red',
        // maintainAspectRatio: false,
        // legend: {
        //   // The legend label configuration is nested below the legend configuration using the labels key.
        //   // display: !!normalShow,
        //   labels: {
        //     usePointStyle: true,
        //     // fontSize: 14, // font size of text
        //     boxWidth: 10, // width of coloured box
        //     padding: 10, // Padding between rows of colored boxes.
        //     fontColor: 'rgba(102, 102, 102, 1)', // Label style will match corresponding point style (size is based on fontSize, boxWidth is not used in this case).
        //     fillStyle: 'red'
        //     // generateLabels: (chart) => {
        //     //   // labels = Chart.defaults.global.legend.labels.generateLabels(chart)
        //     //   console.log(chart)
        //     // }
        //   }
        // },
        // layout: {
        //   padding: {
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     top: 0
        //   }
        // },
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         // suggestedMin: 200,
        //         // suggestedMax: 10,
        //         beginAtZero: false,
        //         // display: !!normalShow,
        //         padding: 20,
        //         offset: true,
        //         // autoSkip: true,
        //         // autoSkipPadding: 100,
        //         min: 0,
        //         // stepSize: dataInfo.length ? this.calculateGap(dataInfo) : 1
        //         // http://www.chartjs.org/samples/latest/scales/linear/step-size.html
        //         // 查看源代码,发现纵坐标gap值是可以指定的
        //       },
        //       gridLines: {
        //         display: false,
        //         color: 'rgba(191, 198, 206, .42)',
        //         drawBorder: true,
        //       }
        //     }
        //   ],
        //   xAxes: [
        //     {
        //       ticks: {
        //         // display: !!normalShow,
        //         offset: true,
        //         autoSkip: true,
        //         autoSkipPadding: 50,
        //         padding: 15
        //         // minRotation: 60
        //       },
        //       gridLines: {
        //         display: false,
        //         color: 'rgba(191, 198, 206, .42)',
        //         drawBorder: true,
        //       }
        //     }
        //   ]
        // }
      }
      console.log(<Line data={chartData} options={DEFAULT_CHART_OPTIONS} height={150} />)
      return (
        <Line data={chartData} height={150} />
        // <p>123</p>
      )
    }
    return null
  }
}

export default connect(
  state => state,
  { getChatInfo },
)(LineChart)
