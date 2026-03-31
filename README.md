# project
for ECE-3100

1. Everything in the `__root.tsx` route stays still throughout the session i.e., rendered once. Nothing is rendered.
2. `<Link>` tag from **tanstack-react-router** must be used instead of `<a>` tag to prevent hot navigation and re-render of the components which are not supposed to be re-rendered.
3. `<Outlet/>` component is used to render the closest child component in the route directory in the `route.tsx` file. The content inside the `route.tsx` file is rendered only once while loading the route. This `<Outlet/>` component serves exactly same function like `{children}` in the `__root.tsx` file but in a local route not for the root route.
