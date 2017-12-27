
/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Line } from 'react-chartjs-2'
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
    if (this.state.Line && this.props.chartInfo.length) {
      const Line = this.state.Line
      console.log(this.props.chartInfo.map((info) => info.update_at))
      console.log(this.props.chartInfo.map((info) => info.goodsPrice))
      const chartData = {
        labels: this.props.chartInfo.map((info) => info.update_at),
        datasets: [
          {
            label: '价格波动曲线',
            data: this.props.chartInfo.map((info) => info.goodsPrice),
            // data: [149, 130, 123, 135, 140, 109, 132, 144, 138, 129, 100, 149],
            // backgroundColor: 'transparent', // 填充数据点
            // borderColor: '#F6A139',
            // fill: false, // How to fill the area under the line 这里不填充 http://www.chartjs.org/docs/latest/charts/line.html
            // borderWidth: 4,
            // pointStyle: 'line',
            // lineTension: 0, // set 0 to draw straight line
            // pointRadius: 0, // The radius of the point shape. If set to 0, the point is not rendered
            // pointHoverRadius: 0,
          }
        ]
      }
      const options = {
        responsive: true,
        title: {
          display:true,
          text:'Chart.js Line Chart',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Value'
            }
          }]
        }
    }
      console.log(<Line data={chartData} options={options} height={150} />)
      // console.log(window)
      return (
        <div style={{ width: '100%', height: 300 }}>
          {
            Line ? <Line data={chartData} options={options} height={150} /> : null
          }
        </div>
        // <p>此处应有折线图</p>
      )
    }
    return <p></p>
  }
}

export default connect(
  state => state,
  { getChatInfo },
)(LineChart)
