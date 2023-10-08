interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  /* In the following, we use fetch and don't need to use useState and useEffect hooks 
  since this is a server component and not a client component */
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>
        <b>Users:</b>
      </h1>
      {/* When building this website for production, this will become a static page and 
      will show the following time as when the website was built.  However, this will update 
      every 10 seconds since we have set revalidate to 10 seconds in the fetch above. 
      Static (build time) vs dynamic (request time) server-side rendering. */}
      {/* <p>{new Date().toLocaleTimeString()}</p>{" "} */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
