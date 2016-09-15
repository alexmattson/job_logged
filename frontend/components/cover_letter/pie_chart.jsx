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
        "dark-blue",
				"white"
      ],
      datasets: [
        {
          data: [this.props.percent, 100 - this.props.percent],
          backgroundColor: [
            "#075794",
						"#ddd"
          ],
          hoverBackgroundColor: [
            "#075794",
						"#ddds"
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

	render() {
		return (
      <div className='match'>
        <div className='pie-chart-container'>
          <canvas id={`chart${this.chartId}`}
									height="150"
									width="150"
									className='pie-chart'></canvas>
          <div className='percent'>{this.props.percent}%</div>
        </div>
        <p>{this.props.text}</p>

      </div>
		);
	}

}

export default PieChart;
