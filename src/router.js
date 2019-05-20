import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'
import Home from './pages/Home';
import BackUser from './pages/BackUser'
import AppUser from './pages/AppUser'
import Team from './pages/Team'
import Player from './pages/Player'

export default class ERouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>


                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    {/*<Route path='/home' component={Home} />*/}
                                    <Route path="/user/back"     component={BackUser} />
                                    <Route path="/user/app"      component={AppUser} />
                                    <Route path="/manage/player" component={Team} />
                                    <Route path="/manage/team"   component={Player} />
                                    <Route path="/home"          component={Home} />
                                    {/*<Route path="/ui/modals" component={Modals} />*/}
                                    {/*<Route path="/ui/loadings" component={Loadings} />*/}
                                    {/*<Route path="/ui/notification" component={Notice} />*/}
                                    {/*<Route path="/ui/messages" component={Messages} />*/}
                                    {/*<Route path="/ui/tabs" component={Tabs} />*/}
                                    {/*<Route path="/ui/gallery" component={Gallery} />*/}
                                    {/*<Route path="/ui/carousel" component={Carousel} />*/}
                                    {/*<Route path="/form/login" component={FormLogin} />*/}
                                    {/*<Route path="/form/reg" component={FormRegister} />*/}
                                    {/*<Route path="/table/basic" component={BasicTable} />*/}
                                    {/*<Route path="/table/high" component={HighTable} />*/}
                                    {/*<Route path='/rich' component={Rich} />*/}
                                    {/*<Route path="/city" component={City} />*/}
                                    {/*<Route path="/order" component={Order} />*/}
                                    {/*<Route path='/bikeMap' component={BikeMap} />*/}
                                    {/*<Route path='/user' component={User} />*/}
                                    {/*<Route path="/charts/bar" component={Bar} />*/}
                                    {/*<Route path="/charts/pie" component={Pie} />*/}
                                    {/*<Route path="/charts/line" component={Line} />*/}
                                    {/*<Route path="/permission" component={Permission} />*/}
                                    {/*<Redirect to="/home" />*/}
                                    {/* <Route component={NoMatch} /> */}
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}
