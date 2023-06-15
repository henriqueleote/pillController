import React from 'react';
import MainActivity from './MainActivity'


const App = () => {
  //const [authenticated, setAuthenticated] = useState(false);

  // auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  // });

  // if (authenticated) {
  //   return <Main />;
  // }

  //return <LoginScreen />;

  return <MainActivity />;
}

export default App;