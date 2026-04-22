# project
for ECE-3100

1. Everything in the `__root.tsx` route stays still throughout the session i.e., rendered once. Nothing is rendered.
2. `<Link>` tag from **tanstack-react-router** must be used instead of `<a>` tag to prevent hot navigation and re-render of the components which are not supposed to be re-rendered.
3. `<Outlet/>` component is used to render the closest child component in the route directory in the `route.tsx` file. The content inside the `route.tsx` file is rendered only once while loading the route. This `<Outlet/>` component serves exactly same function like `{children}` in the `__root.tsx` file but in a local route not for the root route.
4. There is a built-in process to make any route/path type safe throughout the whole application through a function.
```ts
linkOptions(/* any attribute named 'to' will be considered to have a valid route and hence the type safety is achieved */)
```
5. All code in TanStack Start is `isomorphic` by default - it runs and is included in both `server` and `client` bundles unless explicitly constrained. Route loader functions are isomorphic. This isomorphic functions are both sided :). If the page gets a hot reload, the functions are executed in server side (CSR), if the client side navigation is invoked, then the same function will be executed on the client side (CSR).
6. Why to use middleware?
> - It makes the code cleaner as the server function can be used only for handling business logic rather than handling authentication first.
> - It makes reusable code
