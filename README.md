# project
for ECE-3100

1. Everything in the `__root.tsx` route stays still throughout the session i.e., rendered once. Nothing is rendered.
2. `<Link>` tag from **tanstack-react-router** must be used instead of `<a>` tag to prevent hot navigation and re-render of the components which are not supposed to be re-rendered.
