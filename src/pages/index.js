import React, { useState } from 'react';
import styles from '../styles/home.module.scss';

const Users = ({ users }) => {
    return (
        <div>
            <h1 className={styles.headerText}>Welcome to Next JS</h1>

            <p style={{ color: styles.primaryColor }}>Styling this para with sass variable</p>
            {/* {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
        </div>
      ))} */}
        </div>
    );
};

export default Users;

export const getStaticProps = async (ctx) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return {
        props: { users },
    };
};
