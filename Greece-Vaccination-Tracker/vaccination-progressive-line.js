// based on https://github.com/chartjs/Chart.js/blob/master/docs/samples/animations/progressive-line.md

let config = {}

function animate(data, data2, label, label2) {
  for (let i = 0; i < data.length; i++) {
    data[i] = {x:i, y: data[i]};
    data2[i] = {x:i, y: data2[i]};
  }

  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

  config = {
    type: 'line',
    data: {
      datasets: [{
        label: label,
        borderColor: '#2e82cc',
        borderWidth: 3,
        radius: 0,
        data: data,
      },
      {
        label: label2,
        borderColor: '#e8fbfe',
        borderWidth: 3,
        radius: 0,
        data: data2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: true
      },
      scales: {
        x: {
          type: 'linear',
        },
        xAxes: {
          title: {
              display: true,
              text: 'Days since vaccination started',
          }
      }
      }
    }
  };
}

export { config, animate };