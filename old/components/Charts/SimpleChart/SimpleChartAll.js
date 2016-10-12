/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import Filter from '../../Filter';
import Table from '../../Table';
import Chart from './SimpleChart';

function SimpleChartAll({params}) {
  return (
    <div>
      <Filter data="params"/>
      <Chart data="params"/>
      <Table data="params"/>

    </div>
  );  
}

SimpleChartAll.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default SimpleChartAll;
