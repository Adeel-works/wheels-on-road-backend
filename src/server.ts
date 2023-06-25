import { Server, ServerRoute } from '@hapi/hapi';

import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { dbSetup } from './config/db.config';
import {
  validateAccessToken,
} from './auth/auth.service';

import { AuthRoutes } from './auth/auth.route';

import { User } from './auth/user.model';
import { roles } from './roles';
import {  CategoriesRoute } from './categories/index.route';
import { VehicleRoute } from './vehicles/index.route';
import { DashBoardRoute } from './dashboard/index.route';

var bcrypt = require('bcryptjs');

const prefixizeRoutes = (
  prefix: string,
  tag: string,
  routes: ServerRoute[]
) => {
  routes.forEach((r) => {
    r.path = `${prefix}${r.path}`;
    r.options = {
      ...r.options,
      tags: ['api', tag],
    };
  });

  return routes;
};
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync('Admin@123', salt);


/**
 * @description The code below is for adding a new admin
 */


const checkAdmin = async () => {
  const user = await User.findOne({ email: 'manager@gmail.com' });
  if (!user) {
    const user = await User.create({
      name: 'Test',
      email: 'manager@gmail.com',
      password: hash,
      isActive:true,
    });
  }
};



const init = async () => {
  const server = new Server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: { origin: 'ignore' },
      validate: {
        failAction: async (request, h, err) => {
          console.error(err);
          throw err;
        },
      },
    },
  });

  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] },
    validate: validateAccessToken,
  });

  
  server.auth.default('jwt');

  //========== Routes Registration ============//
  server.route([
    ...prefixizeRoutes('', 'Auth', AuthRoutes),
    ...prefixizeRoutes('/category','Category',CategoriesRoute),
    ...prefixizeRoutes('/vehicle','Vehicle',VehicleRoute),
    ...prefixizeRoutes('/dashboard','DashBoard',DashBoardRoute),
  ]);
  //========== Routes Registration ============//

  //========== Swagger ========================//
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: { title: 'wheelsOnRoad.com APIs Documentation', version: '1.0.0' },
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
        security: [{ Bearer: [] }],
        grouping: 'tags',
      },
    },
  ]);
  //========== Swagger ========================//
  dbSetup();
  await server.start();

  //========== Create Default User ========================//
  checkAdmin();
  
  //====== Seeding ==========//
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
});

init();
