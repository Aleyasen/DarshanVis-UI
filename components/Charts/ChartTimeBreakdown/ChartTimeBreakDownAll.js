/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import Filter from '../../Filter';
// import Chart from '../Charts/SimpleChart';
import Table from '../../Table';

function ChartTimeBreakDownAll({params}) {
  return (
    <div>
      <Filter data="params"/>
      <div id="chart-container2"/>
      <Table data="params"/>
    </div>
  );
}

ChartTimeBreakDownAll.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default ChartTimeBreakDownAll;
