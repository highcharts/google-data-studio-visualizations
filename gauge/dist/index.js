!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return t={},n.m=C={"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,C=1,t=arguments.length;C<t;C++)for(var n in R=arguments[C])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});
/*!
  @license
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
var _=R(/*! ./types */"./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R(/*! ./types */"./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new")};function E(e){return e.type===_.ConfigDataElementType.DIMENSION||e.type===_.ConfigDataElementType.METRIC}function r(e){return e===_.ConfigDataElementType.DIMENSION?-1:1}function a(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var C,t=(C=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return C(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return t.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var C,t,n={};return t=R,((C=e).length<t.length?C.map(function(e,R){return[e,t[R]]}):t.map(function(e,R){return[C[R],e]})).forEach(function(e){var R=e[0],C=e[1];void 0===n[C]&&(n[C]=[]),n[C].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),C={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){C[e.id]=e.value.map(function(e){return R[e]})})}),C};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){if(void 0!==R[e.id])throw new Error("styleIds must be unique. Your styleId: '"+e.id+"' is used more than once.");R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case _.DSInteractionType.FILTER:return _.InteractionType.FILTER}}function s(e){var R=e.config.interactions;return void 0===R?{}:R.reduce(function(e,R){var C=R.supportedActions.map(n),t={type:n(R.value.type),data:R.value.data};return e[R.id]={value:t,supportedActions:C},e},{})}N.tableTransform=function(e){return{tables:(R=e,t=N.fieldsByConfigId(R),n=a(R),E={},r=n.map(function(e){void 0===E[e]?E[e]=0:E[e]++;var R=E[e],C=t[e][R];return i(i({},C),{configId:e})}),(C={})[_.TableType.DEFAULT]={headers:[],rows:[]},o=C,R.dataResponse.tables.forEach(function(e){o[e.id]={headers:r,rows:e.rows}}),o),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n,E,r,o},N.objectTransform=function(e){return{tables:(t=a(R=e),(C={})[_.TableType.DEFAULT]=[],n=C,R.dataResponse.tables.forEach(function(e){var R=e.rows.map(o(t));e.id===_.TableType.DEFAULT?n[e.id]=R:(void 0===n[e.id]&&(n[e.id]=[]),n[e.id]=n[e.id].concat(R))}),n),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n};function u(e){var R,C=!1;return e===N.tableTransform||e===N.objectTransform?C=!0:(R=!1,"identity"===e("identity")&&(R=!0,console.warn("This is an unsupported data format. Please use one of the supported transforms:\n       dscc.objectFormat or dscc.tableFormat.")),R&&(C=!0)),C}N.subscribeToData=function(R,C){if(u(C.transform)){var e=function(e){e.data.type===_.MessageType.RENDER?R(C.transform(e.data)):console.error("MessageType: "+e.data.type+" is not supported by this version of the library.")};window.addEventListener("message",e);var t={componentId:N.getComponentId(),type:_.ToDSMessageType.VIZ_READY};return window.parent.postMessage(t,"*"),function(){return window.removeEventListener("message",e)}}throw new Error("Only the built in transform functions are supported.")},N.sendInteraction=function(e,R,C){var t=N.getComponentId(),n={type:_.ToDSMessageType.INTERACTION,id:e,data:C,componentId:t};window.parent.postMessage(n,"*")},N.clearInteraction=function(e,R){N.sendInteraction(e,R,void 0)}},"./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */function(e,R,C){"use strict";var t,n,E,r,o,N;Object.defineProperty(R,"__esModule",{value:!0}),(t=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",t.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(n=R.FieldType||(R.FieldType={})).YEAR="YEAR",n.YEAR_QUARTER="YEAR_QUARTER",n.YEAR_MONTH="YEAR_MONTH",n.YEAR_WEEK="YEAR_WEEK",n.YEAR_MONTH_DAY="YEAR_MONTH_DAY",n.YEAR_MONTH_DAY_HOUR="YEAR_MONTH_DAY_HOUR",n.QUARTER="QUARTER",n.MONTH="MONTH",n.WEEK="WEEK",n.MONTH_DAY="MONTH_DAY",n.DAY_OF_WEEK="DAY_OF_WEEK",n.DAY="DAY",n.HOUR="HOUR",n.MINUTE="MINUTE",n.DURATION="DURATION",n.COUNTRY="COUNTRY",n.COUNTRY_CODE="COUNTRY_CODE",n.CONTINENT="CONTINENT",n.CONTINENT_CODE="CONTINENT_CODE",n.SUB_CONTINENT="SUB_CONTINENT",n.SUB_CONTINENT_CODE="SUB_CONTINENT_CODE",n.REGION="REGION",n.REGION_CODE="REGION_CODE",n.CITY="CITY",n.CITY_CODE="CITY_CODE",n.METRO_CODE="METRO_CODE",n.LATITUDE_LONGITUDE="LATITUDE_LONGITUDE",n.NUMBER="NUMBER",n.PERCENT="PERCENT",n.TEXT="TEXT",n.BOOLEAN="BOOLEAN",n.URL="URL",n.IMAGE="IMAGE",n.CURRENCY_AED="CURRENCY_AED",n.CURRENCY_ALL="CURRENCY_ALL",n.CURRENCY_ARS="CURRENCY_ARS",n.CURRENCY_AUD="CURRENCY_AUD",n.CURRENCY_BDT="CURRENCY_BDT",n.CURRENCY_BGN="CURRENCY_BGN",n.CURRENCY_BOB="CURRENCY_BOB",n.CURRENCY_BRL="CURRENCY_BRL",n.CURRENCY_CAD="CURRENCY_CAD",n.CURRENCY_CDF="CURRENCY_CDF",n.CURRENCY_CHF="CURRENCY_CHF",n.CURRENCY_CLP="CURRENCY_CLP",n.CURRENCY_CNY="CURRENCY_CNY",n.CURRENCY_COP="CURRENCY_COP",n.CURRENCY_CRC="CURRENCY_CRC",n.CURRENCY_CZK="CURRENCY_CZK",n.CURRENCY_DKK="CURRENCY_DKK",n.CURRENCY_DOP="CURRENCY_DOP",n.CURRENCY_EGP="CURRENCY_EGP",n.CURRENCY_ETB="CURRENCY_ETB",n.CURRENCY_EUR="CURRENCY_EUR",n.CURRENCY_GBP="CURRENCY_GBP",n.CURRENCY_HKD="CURRENCY_HKD",n.CURRENCY_HRK="CURRENCY_HRK",n.CURRENCY_HUF="CURRENCY_HUF",n.CURRENCY_IDR="CURRENCY_IDR",n.CURRENCY_ILS="CURRENCY_ILS",n.CURRENCY_INR="CURRENCY_INR",n.CURRENCY_IRR="CURRENCY_IRR",n.CURRENCY_ISK="CURRENCY_ISK",n.CURRENCY_JMD="CURRENCY_JMD",n.CURRENCY_JPY="CURRENCY_JPY",n.CURRENCY_KRW="CURRENCY_KRW",n.CURRENCY_LKR="CURRENCY_LKR",n.CURRENCY_LTL="CURRENCY_LTL",n.CURRENCY_MNT="CURRENCY_MNT",n.CURRENCY_MVR="CURRENCY_MVR",n.CURRENCY_MXN="CURRENCY_MXN",n.CURRENCY_MYR="CURRENCY_MYR",n.CURRENCY_NOK="CURRENCY_NOK",n.CURRENCY_NZD="CURRENCY_NZD",n.CURRENCY_PAB="CURRENCY_PAB",n.CURRENCY_PEN="CURRENCY_PEN",n.CURRENCY_PHP="CURRENCY_PHP",n.CURRENCY_PKR="CURRENCY_PKR",n.CURRENCY_PLN="CURRENCY_PLN",n.CURRENCY_RON="CURRENCY_RON",n.CURRENCY_RSD="CURRENCY_RSD",n.CURRENCY_RUB="CURRENCY_RUB",n.CURRENCY_SAR="CURRENCY_SAR",n.CURRENCY_SEK="CURRENCY_SEK",n.CURRENCY_SGD="CURRENCY_SGD",n.CURRENCY_THB="CURRENCY_THB",n.CURRENCY_TRY="CURRENCY_TRY",n.CURRENCY_TWD="CURRENCY_TWD",n.CURRENCY_TZS="CURRENCY_TZS",n.CURRENCY_UAH="CURRENCY_UAH",n.CURRENCY_USD="CURRENCY_USD",n.CURRENCY_UYU="CURRENCY_UYU",n.CURRENCY_VEF="CURRENCY_VEF",n.CURRENCY_VND="CURRENCY_VND",n.CURRENCY_YER="CURRENCY_YER",n.CURRENCY_ZAR="CURRENCY_ZAR",(E=R.TableType||(R.TableType={})).DEFAULT="DEFAULT",E.COMPARISON="COMPARISON",E.SUMMARY="SUMMARY",(r=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",r.DIMENSION="DIMENSION",r.MAX_RESULTS="MAX_RESULTS",(o=R.ConfigStyleElementType||(R.ConfigStyleElementType={})).TEXTINPUT="TEXTINPUT",o.SELECT_SINGLE="SELECT_SINGLE",o.CHECKBOX="CHECKBOX",o.FONT_COLOR="FONT_COLOR",o.FONT_SIZE="FONT_SIZE",o.FONT_FAMILY="FONT_FAMILY",o.FILL_COLOR="FILL_COLOR",o.BORDER_COLOR="BORDER_COLOR",o.AXIS_COLOR="AXIS_COLOR",o.GRID_COLOR="GRID_COLOR",o.OPACITY="OPACITY",o.LINE_WEIGHT="LINE_WEIGHT",o.LINE_STYLE="LINE_STYLE",o.BORDER_RADIUS="BORDER_RADIUS",o.INTERVAL="INTERVAL",o.SELECT_RADIO="SELECT_RADIO",(R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(N=R.ToDSMessageType||(R.ToDSMessageType={})).VIZ_READY="vizReady",N.INTERACTION="vizAction",(R.InteractionType||(R.InteractionType={})).FILTER="FILTER"}},n.c=t,n.d=function(e,R,C){n.o(e,R)||Object.defineProperty(e,R,{enumerable:!0,get:C})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(R,e){if(1&e&&(R=n(R)),8&e)return R;if(4&e&&"object"==typeof R&&R&&R.__esModule)return R;var C=Object.create(null);if(n.r(C),Object.defineProperty(C,"default",{enumerable:!0,value:R}),2&e&&"string"!=typeof R)for(var t in R)n.d(C,t,function(e){return R[e]}.bind(null,t));return C},n.n=function(e){var R=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(R,"a",R),R},n.o=function(e,R){return Object.prototype.hasOwnProperty.call(e,R)},n.p="",n(n.s="./src/index.ts");function n(e){if(t[e])return t[e].exports;var R=t[e]={i:e,l:!1,exports:{}};return C[e].call(R.exports,R,R.exports,n),R.l=!0,R.exports}var C,t});
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