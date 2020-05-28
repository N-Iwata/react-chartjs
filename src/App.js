import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
    this.state = {
      isProb: false,
    };
    this.dataset = {
      labels: ["A", "B", "C", "D", "E"],
      datasets: [
        {
          label: "label1",
          data: [36.1, 41.2, 50.4, 32.9, 29.4],
          backgroundColor: "red",
        },
        {
          label: "label2",
          data: [51.9, 60.5, 45.6, 55.5, 75.5],
          backgroundColor: "blue",
        },
        {
          label: "label3",
          data: [80.1, 88.2, 75.7, 69.4, 100.2],
          backgroundColor: "green",
        },
        {
          label: "label4",
          data: [120.5, 110.5, 128.9, 130.2, 150.5],
          backgroundColor: "purple",
        },
        {
          label: "label5",
          data: [80.5, 85.9, 77.7, 68.5, 60.9],
          backgroundColor: "yellow",
        },
      ],
    };
    this.options = {
      scales: {
        xAxes: [
          {
            stacked: true,
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            display: true,
            scaleLabel: {
              display: true,
              labelString: "実数(kg)",
            },
            ticks: {
              min: 0,
            },
          },
        ],
      },
      maintainAspectRatio: false,
    };
  }
  onClickButton() {
    this.setState({ isProb: !this.state.isProb });
  }
  changeDataSet() {
    let dataset = _.cloneDeep(this.dataset);

    // 割合表示の時にデータを変更
    let sum = 0;
    if (this.state.isProb === true) {
      for (let j = 0; j < dataset.datasets[0].data.length; j++) {
        sum = 0;
        for (let i = 0; i < dataset.datasets.length; i++) {
          sum += dataset.datasets[i].data[j];
        }

        for (let i = 0; i < dataset.datasets.length; i++) {
          if (sum > 0) {
            dataset.datasets[i].data[j] = _.floor(
              // dataset.datasets[i].data[j] = _.round(
              (dataset.datasets[i].data[j] / sum) * 100,
              1
            );
          } else {
            dataset.datesets[i].data[j] = 0;
          }
        }
      }
    }
    return dataset;
  }
  changeOptions(data) {
    let options = _.cloneDeep(this.options);

    if (this.state.isProb === true) {
      options.scales.yAxes[0].scaleLabel.labelString = "割合(%)";
    }
    return options;
  }
  render() {
    const data = this.changeDataSet();
    const options = this.changeOptions();
    console.log(options);
    return (
      <div>
        <input type="button" value="変更" onClick={this.onClickButton} />
        <Bar data={data} options={options} height={400} />
      </div>
    );
  }
}

export default App;
