import React from 'react';
import Chart from 'chart.js/src/chart';

class PieChart extends React.Component {
	constructor(props){
		super(props);
    this.chartId = Math.floor(Math.random()*10000);
	}

  componentDidUpdate() {
    let ctx = document.getElementById(`chart${this.chartId}`);

    let data = {
      labels: [
        "white",
        "dark-blue"
      ],
      datasets: [
        {
          data: [this.props.percent, 100 - this.props.percent],
          backgroundColor: [
            "#FFF",
            "#075794"
          ],
          hoverBackgroundColor: [
            "#FFFs",
            "#075794"
          ]
        }]
    };

    let options = {
      cutoutPercentage: 90,
      legend: {
        display: false
      },
      elements: {
        arc: {
          borderWidth: 0
        }
      }
    };

   let myPie = new Chart(ctx, {
      type: 'doughnut',
      data,
      options
    });
  }

	selectClass() {
		if (this.props.dark) {
			return 'box dark';
		} else {
			return 'box';
		}
	}

	render() {
		return (
      <div className={this.selectClass()}>
        <div className='pie-chart-container'>
          <canvas id={`chart${this.chartId}`} height="60" width="60"></canvas>
          <div className='percent'>{this.props.percent}%</div>
        </div>
        <p>{this.props.text}</p>

      </div>
		);
	}

}

export default PieChart;
