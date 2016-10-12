/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Menu from '../../components/Menu';
import Chart1 from '../../components/Chart1';

const title = 'React Starter Kit';

function Home({news}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className="container-fluid">
        <h1 className={s.title}>React.js News</h1>
        <div className="row">
          <div className="col-md-3">
            <Menu/>
          </div>
          <div className="col-md-9">

            <div className="tab-content">
              <div id="chart1" className="tab-pane fade in active">
                <Chart1/>
              </div>
              <div id="chart2" className="tab-pane fade">

              </div>
              <div id="chart3" className="tab-pane fade">
                <h3>Menu 2</h3>
                <p>Some content in menu 2.</p>
              </div>
            </div>
            <div id="chart"/>
            
          </div>

        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};
Home.contextTypes = {setTitle: PropTypes.func.isRequired};

export default withStyles(s)(Home);
