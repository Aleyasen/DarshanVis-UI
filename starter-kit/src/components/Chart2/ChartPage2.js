/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import Filter from '../Filter';

function ChartPage2({params}) {
  return (
    <div>
      <Filter/>
      <div id="chart-container"/>
    </div>
  );
}

ChartPage1.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default ChartPage2;
