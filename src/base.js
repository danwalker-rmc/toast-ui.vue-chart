/* eslint-disable no-console */
/* eslint-disable prefer-template */
import TuiChart from 'tui-chart';

const creator = {
  'bar': TuiChart.barChart,
  'column': TuiChart.columnChart,
  'line': TuiChart.lineChart,
  'area': TuiChart.areaChart,
  'bubble': TuiChart.bubbleChart,
  'scatter': TuiChart.scatterChart,
  'pie': TuiChart.pieChart,
  'combo': TuiChart.comboChart,
  'map': TuiChart.mapChart,
  'heatmap': TuiChart.heatmapChart,
  'treemap': TuiChart.treemapChart,
  'radial': TuiChart.radialChart,
  'boxplot': TuiChart.boxplotChart,
  'bullet': TuiChart.bulletChart
};

const chartEvents = [
  'load',
  'selectLegend',
  'selectSeries',
  'unselectSeries',
  'beforeShowTooltip',
  'afterShowTooltip',
  'beforeHideTooltip',
  'zoom',
  'changeCheckedLegends'
];

export const createComponent = (type, ref) => ({
  name: `${type}-chart`,
  // template: `<div ref="tuiChart_${ref}"></div>`,
  template: `<div ref="tuiChart"></div>`,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object
    },
    theme: {
      type: Object
    },
    map: {
      type: [String, Object],
      validator(value) {
        let result = false;
        if (typeof value === 'object') {
          result = value.hasOwnProperty('name') && value.hasOwnProperty('value');
        }

        return result;
      }
    }
  },
  data() {
    return {
      creator: creator[type],
      chartInstance: null,
      computedOptions: {},
      refNum: ref
    };
  },
  watch: {
    data: {
      handler(newVal) {
        console.log('SETTING DATA FOR CHART');
        console.log(newVal);
        this.chartInstance.setData(newVal);
      },
      deep: true
    }
  },
  mounted() {
    this.computedOptions = Object.assign({}, this.options);
    this.registerMapToOptions();
    this.registerThemeToOptions();
    // const r = 'tuiChart_' + ref;
    const r = 'tuiChart';
    this.chartInstance = this.creator(this.$refs[r], this.data, this.computedOptions);
    this.addEventListeners();
  },
  destroyed() {
    chartEvents.forEach(event => {
      this.chartInstance.off(event);
    });
  },
  methods: {
    registerMapToOptions() {
      if (this.map) {
        TuiChart.registerMap(this.map.name, this.map.value);
        this.computedOptions = Object.assign({}, this.computedOptions, {
          map: this.map.name || this.map
        });
      }
    },
    registerThemeToOptions() {
      if (this.theme) {
        TuiChart.registerTheme(this.theme.name, this.theme.data);
        this.computedOptions = Object.assign({}, this.computedOptions, {
          theme: this.theme.name || this.theme
        });
      }
    },
    applyTheme(theme) {
      console.log('TRYING TO APPLY PASSED THEME');
      const result = TuiChart.registerTheme(theme.name, theme.data);

      return result;
    },
    addEventListeners() {
      chartEvents.forEach(event => {
        this.chartInstance.on(event, (...args) => {
          this.$emit(event, ...args);
        });
      });
    },
    invoke(methodName, ...args) {
      let result;
      if (this.chartInstance[methodName]) {
        result = this.chartInstance[methodName](...args);
      }

      return result;
    }
  }
});
