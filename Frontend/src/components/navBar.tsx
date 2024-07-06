import NavLinks from "./UI/navLinks";

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between items-center border-b border-stone-500 h-24 px-96">
        <div className="text-3xl">Logo</div>
        <div className="flex gap-5 justify-center items-center">
          <NavLinks />
        </div>
        <div>user</div>
      </div>
    </>
  );
};
export default NavBar;
