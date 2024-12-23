import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  ...prefix('omar', [
    layout('routes/omar/layout.tsx', [
      index('routes/omar/index.tsx'),
      route('users', 'routes/omar/Users.tsx', [
        route(':id', 'routes/omar/User.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
