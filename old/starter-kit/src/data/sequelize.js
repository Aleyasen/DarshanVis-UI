/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize';
import { server_url } from '../../src/config';

console.log("filename: " + __filename);

console.log("server_url: " + server_url);

const sequelize = new Sequelize(server_url, {
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
