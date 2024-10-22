import React from "react";
import { useLocation } from "react-router-dom";
import{ 
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
  }from'antd-mobile-icons'
import { TabBar } from "antd-mobile";
const MenuBar =  () => {
    const location = useLocation()
    const { pathname } = location
  
    const setRouteActive = (value: string) => {
      history.push(value)
    }
  
    const tabs = [
      {
        key: '/home',
        title : 'Home' , 
        icon: <AppOutline />,
      },
      {
        key : '/all' , 
        title : 'To Do' , 
        icon: <UnorderedListOutline />,
      },
      {
        key: '/message',
        title : 'News' , 
        icon: <MessageOutline />,
      },
      {
        key: '/me',
        title : 'My' , 
        icon: <UserOutline />,
      },
    ]
  
    return( 
      <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </ TabBar >
    )
  }

  export default MenuBar;