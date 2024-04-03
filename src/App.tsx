import React from 'react';
import {Admin, Resource} from "react-admin";
import UserList from "./components/UserList";
import {dataProvider} from "./services/DataProvider";
import authProvider from "./services/AuthProvider";

function App() {
  return (
    <Admin
        dataProvider={dataProvider}

        // authProvider={authProvider}
    >
      <Resource name={'user'} list={UserList}/>
    </Admin>
  );
}

export default App;
