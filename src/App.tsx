import React, { memo } from "react";

import { UserProvider } from "./UserContainer";
import { UserForm } from "./UserForm";
import { RenderCount } from "./RenderCount";

const App = () => {
  return (
    <UserProvider>
      <div style={{ padding: 15 }}>
        <div>
          <p>count: <RenderCount /></p>
        </div>
        <div>
          <p>consumer 1</p>
          <UserForm />
          <p>----</p>
          <UserForm />
        </div>
        <div>
          <p>consumer 2</p>
          <UserForm />
        </div>
      </div>
    </UserProvider>
  );
};

export default memo(App);
