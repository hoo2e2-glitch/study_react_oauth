import React from 'react';

const UnAuthLayout = () => {
  
  const {isAuthenticated} = useAuthStore()

  // 단, 페이지를 막으려면 Navigate 태그를 사용해야한다.
  if(!isAuthenticated){

    // replace: 왔던 기록을 없애버림.
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UnAuthLayout;