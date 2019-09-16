import {createComponent} from './base';

/* function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
} */

export const {
  barChart,
  columnChart,
  lineChart,
  areaChart,
  bubbleChart,
  scatterChart,
  pieChart,
  comboChart,
  mapChart,
  heatmapChart,
  treemapChart,
  radialChart,
  boxplotChart,
  bulletChart
} = [
  'bar',
  'column',
  'line',
  'area',
  'bubble',
  'scatter',
  'pie',
  'combo',
  'map',
  'heatmap',
  'treemap',
  'radial',
  'boxplot',
  'bullet'
].reduce((obj, chartName) => {
  // obj[`${chartName}Chart`] = createComponent(chartName, getRandomInt(5000));
  obj[`${chartName}Chart`] = createComponent(chartName);

  return obj;
}, {});
