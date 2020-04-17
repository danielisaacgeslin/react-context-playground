import React, { memo, useContext, useCallback } from "react";

import { UserContext, useUserAction } from "./UserContainer";
import { useLoadingCallback } from "./useLoadingCallback";

export const UserForm = memo(() => {
  const { userMap } = useContext(UserContext);
  const { asyncAddUser } = useUserAction();
  const addUser = useCallback(
    () =>
      asyncAddUser({
        name: Math.random().toFixed(3),
        email: `${Math.random().toFixed(3)}@email.com`,
      }),
    [asyncAddUser]
  );
  const [onClick, isLoading, error] = useLoadingCallback<Error>(addUser);
  const userList = Object.values(userMap);
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
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
