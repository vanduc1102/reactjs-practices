import React from 'react';
import { FontSizes, PrimaryButton, Spinner, Text } from '@fluentui/react';
import { useSelector } from 'react-redux';

import { RootState } from '../../state';
import { AccountState } from '../../state/account/types';
import { useGetUsersQuery, useLogoutMutation } from '../../state/api/user';

const HomePage: React.FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const { user } = useSelector<RootState, AccountState>(
    ({ account }) => account
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: 'auto',
      }}
    >
      <div style={{ fontSize: FontSizes.size32 }}>Hi {user?.firstName}</div>
      <div style={{ fontSize: FontSizes.size24 }}>
        You're logged in with React & JWT!!
      </div>
      <Text as="h3" block={true}>
        Users from secure api end point:
      </Text>
      {isLoading && <Spinner label="Loading users..." />}
      {error && (
        <span className="text-danger">ERROR: {JSON.stringify(error)}</span>
      )}

      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Text block={true}>First Name: {user.firstName}</Text>
              <Text block={true}>Last Name: {user.lastName}</Text>
            </li>
          ))}
        </ul>
      )}
      <div>
        {isLoggingOut ? (
          <Spinner
            label="Wait, wait..."
            ariaLive="assertive"
            labelPosition="right"
          />
        ) : (
          <PrimaryButton onClick={handleLogout} disabled={isLoggingOut}>
            Logout
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default HomePage;
