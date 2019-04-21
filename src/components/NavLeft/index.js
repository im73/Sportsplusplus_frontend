import React from 'react'


import { Menu, Icon, Button } from 'antd';

import { NavLink} from 'react-router-dom'
import './index.less'

import menuConfig from './../../config/MenuConfig'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class NavLeft extends React.Component {
    componentWillMount() {
        const MenuTreenod = this.renderMenu(menuConfig);
        this.setState(
            {MenuTreenod}
        )
    }

    renderMenu=(data)=>
    {
        return data.map(
            (item)=>{
                if(item.children)
                {
                    return(
                        <SubMenu title={item.title} key={item.key}>
                             {this.renderMenu(item.children)}
                        </SubMenu>

                    )
                }
                return (<Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>)

            }
            )
    }



    render() {
        return(
            <div className="nav-left">
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <h1>Sports ++</h1>
                    </div>
                <Menu theme="dark">
                    {this.state.MenuTreenod}
                </Menu>
            </div>
        );
    }
}
