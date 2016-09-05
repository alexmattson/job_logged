import React from 'react';
import Chart from 'chart.js/src/chart';
import moment from 'moment';

class ApplicationChart extends React.Component {
	constructor(props){
		super(props);
		this.otherApplicantsData =  [{x: 0, y: 1},
																 {x: 1, y: 12},
																 {x: 2, y: 0},
																 {x: 3, y: 3},
																 {x: 4, y: 11},
																 {x: 5, y: 14},
																 {x: 6, y: 11},
																 {x: 7, y: 4},
																 {x: 8, y: 7},
																 {x: 9, y: 13},
																 {x: 10, y: 10},
																 {x: 11, y: 0},
																 {x: 12, y: 5},
																 {x: 13, y: 11},
																 {x: 14, y: 9},
																 {x: 15, y: 3},
																 {x: 16, y: 14},
																 {x: 17, y: 1},
																 {x: 18, y: 7},
																 {x: 19, y: 9},
																 {x: 20, y: 13},
																 {x: 21, y: 8},
																 {x: 22, y: 0},
																 {x: 23, y: 8},
																 {x: 24, y: 1},
																 {x: 25, y: 5},
																 {x: 26, y: 10},
																 {x: 27, y: 10},
																 {x: 28, y: 11},
																 {x: 29, y: 1},
																 {x: 30, y: 1},
																 {x: 31, y: 5},
																 {x: 32, y: 1},
																 {x: 33, y: 10},
																 {x: 34, y: 0},
																 {x: 35, y: 7},
																 {x: 36, y: 4},
																 {x: 37, y: 1},
																 {x: 38, y: 7},
																 {x: 39, y: 0},
																 {x: 40, y: 14},
																 {x: 41, y: 2},
																 {x: 42, y: 0},
																 {x: 43, y: 5},
																 {x: 44, y: 2},
																 {x: 45, y: 5},
																 {x: 46, y: 2},
																 {x: 47, y: 5},
																 {x: 48, y: 0},
																 {x: 49, y: 13},
																 {x: 50, y: 9},
																 {x: 51, y: 14},
																 {x: 52, y: 13},
																 {x: 53, y: 2},
																 {x: 54, y: 13},
																 {x: 55, y: 2},
																 {x: 56, y: 10},
																 {x: 57, y: 3},
																 {x: 58, y: 3},
																 {x: 59, y: 2},
																 {x: 60, y: 7},
																 {x: 61, y: 0},
																 {x: 62, y: 6},
																 {x: 63, y: 2},
																 {x: 64, y: 11},
																 {x: 65, y: 13},
																 {x: 66, y: 7},
																 {x: 67, y: 11},
																 {x: 68, y: 11},
																 {x: 69, y: 13},
																 {x: 70, y: 7},
																 {x: 71, y: 9},
																 {x: 72, y: 14},
																 {x: 73, y: 8},
																 {x: 74, y: 9},
																 {x: 75, y: 7},
																 {x: 76, y: 1},
																 {x: 77, y: 0},
																 {x: 78, y: 13},
																 {x: 79, y: 8},
																 {x: 80, y: 11},
																 {x: 81, y: 10},
																 {x: 82, y: 13},
																 {x: 83, y: 3},
																 {x: 84, y: 5},
																 {x: 85, y: 12},
																 {x: 86, y: 1},
																 {x: 87, y: 13},
																 {x: 88, y: 7},
																 {x: 89, y: 7},
																 {x: 90, y: 0},
																 {x: 91, y: 1},
																 {x: 92, y: 0},
																 {x: 93, y: 10},
																 {x: 94, y: 2},
																 {x: 95, y: 1},
																 {x: 96, y: 3},
																 {x: 97, y: 6},
																 {x: 98, y: 2},
																 {x: 99, y: 10}];
	}

  componentDidUpdate() {
    let ctx = document.getElementById("myChart");

		let appData = {};
		let apps = this.props.applications;
		let user = this.props.session.currentUser;
		let start = moment(user.created_at);

		Object.keys(apps).forEach(id => {
			// let date = moment(apps[id].created_at).format('l');
			let date = moment(apps[id].created_at);
			let diff = date.diff(start, 'days');
			if (appData[diff]) {
				appData[diff] += 1;
			} else {
				appData[diff] = 1;
			}
		});

		let today = moment(new Date());
		let daysSinceStart = today.diff(start, 'days');
		let otherApplicantsData = this.otherApplicantsData
																	.slice(0, daysSinceStart + 1);
		let appDataArray = Object.keys(appData).map(diff => {
			return({ x: diff, y: appData[diff]});
		});

    let data = {
      datasets: [{
        label: 'Applications Sent',
        data: appDataArray,
        backgroundColor: '#2196f3'
      },
      {
        label: 'Other Applicants',
        data: otherApplicantsData,
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
