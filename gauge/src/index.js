// Load Highcharts
async function loadHighcharts() {
    // Load the files
    const location = 'https://code.highcharts.com/es-modules/masters';
    const modules = [
        'highcharts-more.src.js'
    ];

    const {
        default: Highcharts
    } = await import(`${location}/highcharts.src.js`)
        .catch(console.error);

    for (const module of modules) {
        await import(`${location}/${module}`).catch(console.error);
    }
    return Highcharts;
}



// create a title element
/*
var titleElement = document.createElement('div');
titleElement.id = 'myVizTitle';
document.body.appendChild(titleElement);
*/

async function drawViz(data) {

  const Highcharts = await loadHighcharts();

  const min = data.style['yAxis_min'].value,
    max = data.style['yAxis_max'].value;

  let rowData = data.tables.DEFAULT;

  let container = document.getElementById('container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  }

  const plotBands = [{
    from: min,
    to: max,
    color: Highcharts.getOptions().colors[0],
    thickness: '15%'
  }];
  ['band1', 'band2', 'band3'].forEach(id => {
    const enabled = data.style[`${id}Enabled`].value,
      color = data.style[`${id}Color`].value.color,
      from = Math.max(min, data.style[`${id}From`].value),
      to = Math.min(max, data.style[`${id}To`].value);

    if (
      enabled && color && typeof from === 'number' && typeof to === 'number'
    ) {
      plotBands.push({
        from,
        to,
        color,
        thickness: '15%'
      });
    }
  });

  // Create the chart
  Highcharts.chart('container', {
    chart: {
      width: dscc.getWidth() - 1,
      height: dscc.getHeight() - 1,
      type: 'gauge'
    },
    title: {
      text: null
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: null
    },
    yAxis: {
      min,
      max,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickColor: '#ffffff',
      tickLength: 50,
      tickWidth: 2,
      minorTickInterval: null,
      /*
      minorTickLength: 3,
      minorTickColor: '#ccd6eb',
      minorTickPosition: 'outside',
      */
      labels: {
        distance: 20
      },
      title: {
        text: null
      },
      plotBands
    },
    series: [{
      data: [Number(rowData[0].gaugeMetric[0])],
      dataLabels: {
        borderWidth: 0,
        style: {
          fontSize: '1.2rem'
        },
        formatter: ctx => {
          console.log('@formatter', ctx)
          return ctx.y;
        }
      },
      name: data.fields['gaugeMetric'][0].name,
      dial: {
        radius: '80%',
        backgroundColor: 'gray',
        baseWidth: 12,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: 'gray',
        radius: 6
      },
      overshoot: 5
    }]
  });

  return;

  // remove the svg if it already exists
  if (document.querySelector("svg")) {
    let oldSvg = document.querySelector("svg");
    oldSvg.parentNode.removeChild(oldSvg);
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", `${height}px`);
  svg.setAttribute("width", `${width}px`);

  const maxBarHeight = height - padding.top - padding.bottom;
  const barWidth = width / (rowData.length * 2);

  // obtain the maximum bar metric value for scaling purposes
  let largestMetric = 0;

  rowData.forEach(function (row) {
    largestMetric = Math.max(largestMetric, row["gaugeMetric"][0]);
  });

  rowData.forEach(function (row, i) {
    // 'gaugeDimension' and 'gaugeMetric' come from the id defined in myViz.json
    // 'dimId' is Data Studio's unique field ID, used for the filter interaction
    const barData = {
      dim: row["gaugeDimension"][0],
      met: row["gaugeMetric"][0],
      dimId: data.fields["gaugeDimension"][0].id
    };

    // calculates the height of the bar using the row value, maximum bar
    // height, and the maximum metric value calculated earlier
    let barHeight = Math.round((barData["met"] * maxBarHeight) / largestMetric);

    // normalizes the x coordinate of the bar based on the width of the convas
    // and the width of the bar
    let barX = (width / rowData.length) * i + barWidth / 2;

    // create the "bar"
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", barX);
    rect.setAttribute("y", maxBarHeight - barHeight);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("data", JSON.stringify(barData));
    // use style selector from Data Studio
    rect.style.fill = fillColor;
    svg.appendChild(rect);

    // add text labels
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let textX = barX + barWidth / 2;
    text.setAttribute("x", textX);
    text.setAttribute("text-anchor", "middle");
    let textY = maxBarHeight + padding.top;
    text.setAttribute("y", textY);
    text.setAttribute("fill", fillColor)
    text.innerHTML = barData["dim"];

    svg.appendChild(text);
  });

  document.body.appendChild(svg);

  // Get the human-readable name of the metric and dimension

  var metricName = data.fields['gaugeMetric'][0].name;
  var dimensionName = data.fields['gaugeDimension'][0].name;

  titleElement.innerText = metricName + ' by ' + dimensionName;

}

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });