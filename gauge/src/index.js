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

  const compactNumbers = (num) => {
    if (num > 9999999) {
      return Highcharts.numberFormat(
        Math.floor(num / 1000000),
        0
      ) + 'M';
    }
    if (num > 9999) {
      return Highcharts.numberFormat(
        Math.floor(num / 1000),
        0
      ) + 'k';
    }
    return Highcharts.numberFormat(
      num,
      data.style['decimals'].value
    );
  }

  let rowData = data.tables.DEFAULT;

  const min = 0,
    max = rowData[0].maximum[0],
    angle = Math.max(
      Math.abs(data.style['yAxis_startAngle'].value),
      Math.abs(data.style['yAxis_endAngle'].value)
    ),
    centerY = Math.min(70, Math.max(50, 70 - (angle - 90) * 0.3)),
    useBandsForAxis = data.style['yAxis_useBandsForAxis'].value;

  let container = document.getElementById('container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  }

  const plotBands = [{
    from: min,
    to: max,
    color: '#e6e6e6',
    thickness: '15%'
  }];
  let tickPositions = [];
  const targetNames = ['band1Start', 'band2Start', 'band3Start', 'maximum'];
  ['band1', 'band2', 'band3'].forEach((id, i) => {
    const targetName = targetNames[i],
      endTargetName = targetNames[i + 1],
      enabled = data.style[`${id}Enabled`].value,
      color = data.style[`${id}Color`].value.color,
      from = Math.max(min, rowData[0][targetName][0]),
      to = Math.min(max, rowData[0][endTargetName][0]);

    if (
      enabled && color && typeof from === 'number' && typeof to === 'number'
    ) {
      plotBands.push({
        from,
        to,
        color,
        thickness: '15%'
      });

      tickPositions.push(from, to);
    }
  });

  // Unique values
  if (!useBandsForAxis || tickPositions.length === 0) {
    tickPositions = undefined;
  } else {
    tickPositions = [...new Set(tickPositions)];
  }

  console.log('compactNumbers', data.style['compactNumbers'],
  rowData[0].actualValue[0]);

  // Create the chart
  Highcharts.chart('container', {
    chart: {
      width: dscc.getWidth() - 1,
      height: dscc.getHeight() - 1,
      type: 'gauge',
      backgroundColor: 'transparent'
    },
    title: {
      text: null
    },
    pane: {
      startAngle: data.style['yAxis_startAngle'].value,
      endAngle: data.style['yAxis_endAngle'].value,
      background: null,
      center: ['50%', `${centerY}%`]
    },
    yAxis: {
      min,
      max,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickPositions,
      tickColor: '#ffffff',
      tickLength: 50,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        formatter: function () {
          const label = this.axis.defaultLabelFormatter.call(this);

          if (data.style['compactNumbers'].value && useBandsForAxis) {
            return compactNumbers(this.value);
          }

          return label;
        },
        style: {
          fontSize: '14px'
        }
      },
      title: {
        text: null
      },
      plotBands
    },
    series: [{
      data: [
        {
          y: rowData[0].forecast[0],
          dial: {
            backgroundColor: '#ddd'
          },
          dataLabels: {
            enabled: false
          }
        },
        Number(rowData[0].actualValue[0])
      ],
      dataLabels: {
        borderWidth: 0,
        style: {
          fontSize: '1.2rem'
        },
        formatter: function () {
          let ret = Highcharts.numberFormat(
            this.y,
            data.style['decimals'].value
          );
          if (data.style['compactNumbers'].value) {
            ret = compactNumbers(this.y);
          }

          return (
            data.style['dataLabel_prefix'].value +
            ret +
            data.style['dataLabel_suffix'].value
          );
        }
      },
      name: data.fields['actualValue'][0].name,
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
    largestMetric = Math.max(largestMetric, row["actualValue"][0]);
  });

  rowData.forEach(function (row, i) {
    // 'gaugeDimension' and 'actualValue' come from the id defined in myViz.json
    // 'dimId' is Data Studio's unique field ID, used for the filter interaction
    const barData = {
      dim: row["gaugeDimension"][0],
      met: row["actualValue"][0],
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

  var metricName = data.fields['actualValue'][0].name;
  var dimensionName = data.fields['gaugeDimension'][0].name;

  titleElement.innerText = metricName + ' by ' + dimensionName;

}

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });