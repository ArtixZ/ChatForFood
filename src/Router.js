import React from 'react';
// import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ChatUI from './components/ChatUI';
// import EmployeeCreate from './components/EmployeeCreate';
// import EmployeeEdit from './components/EmployeeEdit';


// <Scene key="auth">
//   <Scene key="login" component={LoginForm} title="Please Login" />
// </Scene>
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      

      <Scene key="main">
        <Scene
          onRight={() => Actions.chatRoom()}
          rightTitle="Refresh"
          key="chatRoom"
          component={ChatUI}
          title="ChatForFood"
          initial
        />
      </Scene>
    </Router>
  );
};
        // <Scene key="refresh" component={EmployeeCreate} title="Create Employee" />

export default RouterComponent;
