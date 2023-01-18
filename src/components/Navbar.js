import { connect } from "react-redux";

const Navbar = ({ authedUser, users, currentPage }) => {
  return (
    <ul className="flex mx-8 mt-2 border-b font-medium text-gray-500">
      <li
        className={
          "mr-2 py-1 text-sm inline-block border-b-2 " +
          (currentPage === "home"
            ? "text-black border-black"
            : "border-transparent hover:border-gray-500 hover:text-gray-700")
        }
      >
        Home
      </li>
      <li
        className={
          "mx-2 py-1 text-sm inline-block border-b-2 " +
          (currentPage === "leaderboard"
            ? "text-black border-black"
            : "border-transparent hover:border-gray-500 hover:text-gray-700")
        }
      >
        Leaderboard
      </li>
      <li
        className={
          "mx-2 py-1 text-sm inline-block border-b-2 " +
          (currentPage === "new"
            ? "text-black border-black"
            : "border-transparent hover:border-gray-500 hover:text-gray-700")
        }
      >
        New
      </li>
      <img
        className="h-8 w-8 ml-auto border-4 border-white"
        src={users[authedUser].avatarURL}
        alt={`Avatar of ${authedUser}`}
      />
      <li className="mx-2 py-1 text-sm inline-block text-gray-700">
        {authedUser}
      </li>
      <li className="ml-2 py-1 text-sm inline-block border-b-2 border-transparent hover:text-gray-600 hover:border-gray-500">
        Logout
      </li>
    </ul>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Navbar);
