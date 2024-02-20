import React, { useState } from "react";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const GetAllUsersWithPrismaStaticProps = ({ users }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/create-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>GetAllUsersWithPrismaStaticProps</h1>

      <h2>List of Fetched Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}

      <h1>Create a New User</h1>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="name"
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={onChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GetAllUsersWithPrismaStaticProps;

export const getStaticProps = async () => {
  try {
    const res = await prisma.user.findMany();
    const users = res.map((user) => {
      return {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toString(),
      };
    });

    return {
      props: { users },
      revalidate: 60 * 2,
    };
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

//    revalidate: 60 * 30 // in seconds (30 minutes), this will be used to refresh the page every
// 30 minutes to get the latest data from the database
//   }
