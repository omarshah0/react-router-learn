import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  ...prefix('omar', [
    layout('routes/omar/layout.tsx', [
      index('routes/omar/index.tsx'),
      route('users', 'routes/omar/Users.tsx', [
        route(':id', 'routes/omar/User.tsx'),
      ]),
      route('search', 'routes/omar/SearchUser.tsx'),
      route('search-user', 'routes/omar/search-user.ts'),
    ]),
  ]),
] satisfies RouteConfig
