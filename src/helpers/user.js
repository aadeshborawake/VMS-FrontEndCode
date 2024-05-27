
export const getCurrentUserName = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.login : null;
  };

  export const isCurrentUserAdmin = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.roleName === 'admin' : false;
  };
  
  export const isCurrentUserVendorUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.roleName === 'user' : false;
  };
  
  export const isCurrentUserVendorCoordinator = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.roleName === 'coordinator' : false;
  };

  export const getCurrentUserId = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.id : null;
  };
  
  export const getCurrentVendorId = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.id : null;
  };



