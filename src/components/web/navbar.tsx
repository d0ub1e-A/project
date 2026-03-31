function Navbar() {
  return (
    <nav className={`sticky top-0 z-50 border-b bg-amber-50 backdrop-blur-2xl`}>
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-4`}
      >
        <div className={`flex items-center gap-2`}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafeLgRXntEcrOogx7zl2R5xvKilhHK1z20w&s"
            alt="Tanstack Start Logo"
            className={`size-8`}
          />
          <h1 className={`text-lg font-semibold`}>Tanstack Start</h1>
        </div>

        <div className={`flex items-center gap-3`}>
          <button className={`px-3 py1 rounded-lg bg-yellow-100`}>SignUp</button>
          <button>SignIn</button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
