import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom'; // react router syntax below v4! 
import { createBrowserHistory } from 'history';
import { Session } from 'meteor/session'

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Notfound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createBrowserHistory();
const location = history.location;
const unAuthenticatedPages = ['/signup', '/', '*', '/login'];
const authenticatedPages = ['/dashboard']


const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to="/dashboard" />
    } else {
        return <Component />
    }
}

const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to="/login" />
    } else {
        return <Component />
    }
}

const onEnterNotePage = (Component, location) => {
    if (!Meteor.userId()) {
        return <Redirect to="/" />
    } else {
        Session.set('selectedNoteId', location.pathname)
    }
}

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.push('/dashboard')
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.push('/login')
    }
}

export const routes = ( 
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login} render={() => onEnterPublicPage(Login)} />
            <Route exact path="/dashboard" component={Dashboard} render={() => onEnterPublicPage(Login)} />
            {/* below is how we route and rig the page to upload the proper id when we click on it*/}
            <Route exact path="/dashboard/:id" component={Dashboard} render={() => onEnterNotePage(Dashboard, location)} />
            <Route exact path="/signup" component={Signup} render={() => onEnterPublicPage(Signup)} />
            <Route exact path="/login" component={Login} render={() =>  onEnterPrivatePage(Dashboard)} />
            <Route exact path="*" component={Notfound} />
        </Switch>
    </Router>
);




