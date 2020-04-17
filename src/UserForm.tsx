import React, { memo, useContext, useCallback, useState } from "react";

import { UserContext, useUserAction } from "./UserContainer";

export const UserForm = memo(() => {
  const { userMap } = useContext(UserContext);
  const { asyncAddUser } = useUserAction();
  const [isLoading, setLoading] = useState(false);
  const onClick = useCallback(async () => {
    try {
      setLoading(true);
      await asyncAddUser(
        {
          name: Math.random().toFixed(3),
          email: `${Math.random().toFixed(3)}@email.com`,
        },
        true
      );
    } finally {
      setLoading(false);
    }
  }, [asyncAddUser, setLoading]);
  const userList = Object.values(userMap);
  return (
    <div>
      <button type="button" onClick={onClick} disabled={isLoading}>
        Add{isLoading && "..."}
      </button>
      <div>
        {userList.map((user) => (
          <div key={user.id}>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>E-mail: {user.email}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
});
