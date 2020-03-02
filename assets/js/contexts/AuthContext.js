import React from 'react';

export default React.createContext({
    isAuthenticated: false,
    setIsAthenticated: value => {}
});