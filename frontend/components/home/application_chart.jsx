import React from 'react';
import Chart from 'chart.js/src/chart';

class ApplicationChart extends React.Component {
	constructor(props){
		super(props);
	}

  componentDidMount() {
    let ctx = document.getElementById("myChart");

    let data = {
      datasets: [{
        label: 'Applications Sent',
        data: [{x: 1, y:  0},
               {x: 2, y: 10},
               {x: 3, y:  5},
               {x: 4, y:  0},
               {x: 5, y: 10}],
        backgroundColor: '#2196f3'
      },
      {
        label: 'Other Applicants',
        data: [{x: 1, y:  6},
               {x: 2, y: 9},
               {x: 3, y: 14},
               {x: 4, y:  9},
               {x: 5, y:  2}],
        backgroundColor: '#ddd'
      }],
    };

    let options = {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          gridLines: { display : false, color: 'white' },
          ticks: { display: false }
        }],
        yAxes: [{
          gridLines: { display : false, color: 'white' },
          ticks: { display: false }
        }]
      },
      maintainAspectRatio: false,
      legend: { display: false },
			responsiveAnimationDuration: 3000
    };

    let myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

  }

	render() {
		return (
      <div className='canvas-container'>
        <div className='table-header'>Job Applications Sent</div>
        <div>
          <canvas id="myChart" width="500" height="175"></canvas>
        </div>
      </div>
		);
	}

}

export default ApplicationChart;
