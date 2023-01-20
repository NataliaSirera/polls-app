import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div className="px-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Leaderboard</h1>
      <table className="table-auto border-collapse w-full text-gray-800 ">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 border border-grey-100 text-left">
              Users
            </th>
            <th className="p-2 border border-grey-100">Answered</th>
            <th className="p-2 border border-grey-100">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-1 px-2 border border-grey-100">
                <img
                  className="h-12 w-12 float-left p-1"
                  src={user.avatarURL}
                  alt={`Avatar of ${user.id}`}
                />
                <p className="text-lg font-medium pl-14">{user.name}</p>
                <p className="text-xs text-gray-500 pl-14">{user.id}</p>
              </td>
              <td className="py-1 px-2 border border-grey-100 text-center">
                {Object.keys(user.answers).length}
              </td>
              <td className="py-1 px-2 border border-grey-100 text-center">
                {user.questions.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users).sort(
      (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
    ),
  };
};

export default connect(mapStateToProps)(Leaderboard);
