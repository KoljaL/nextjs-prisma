import React from 'react';

const Users = ({ users }) => {
    return (
        <div>
            <h1>List of our Users</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <h2 style={{ color: '#A76F6F' }}>{user.name}</h2>
                </div>
            ))}
        </div>
    );
};

export default Users;

export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    return {
        props: { users },
    };
};

// import React, { useState } from "react";
// import variables from "../../styles/home.module.scss";
// import useSWR from "swr";

// const Users = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await fetch("/api/create-users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetcher = (url) => fetch(url).then((res) => res.json());

//   const { data, error } = useSWR("/api/get-users", fetcher, {
//     refreshInterval: 1000,
//   });

//   return (
//     <div>
//       <h1
//         style={{
//           color: variables.primaryColor,
//         }}
//       >
//         Here is a List of our Users:
//       </h1>
//       {data &&
//         data.map((user) => (
//           <div key={user.id}>
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//           </div>
//         ))}

//       <div
//         style={{
//           marginTop: "10rem",
//         }}
//       >
//         <h1>Create a New User</h1>
//         <form action="" onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             placeholder="name"
//             onChange={onChange}
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             placeholder="email"
//             onChange={onChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             value={formData.password}
//             onChange={onChange}
//           />

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Users;
