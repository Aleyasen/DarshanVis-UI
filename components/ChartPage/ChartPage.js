/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';

function ChartPage({ params }) {
  return (
    <div>
      <Filter data="params"  />
      <Chart data="params" />
      <Table data="params" />
    </div>
  );
}

ChartPage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ChartPage;
