import pathToRegexp from 'path-to-regexp';
import { EventEmitter } from "../eventEmitter";
import { _YUI } from './install'

export class History extends EventEmitter {
    constructor(router, base, routes) {
        super();
        this.router = router
        this.base = base;
        this.current = START;
        this.routes = [];
        routes.forEach((route) => {
            const temp = _YUI.util.extend({}, createRoute(null, route), {
                regexp: pathToRegexp(route.path)
            });
            this.routes.push(temp);
        });
    }
}

export function createRoute(record, location) {
    const route = {
        name: location.name || (record && record.name),
        path: location.path || '/',
        hash: location.hash || '',
        query: {},
        params: location.params || {},
        callback: location.callback || function() { }
    }
    return Object.freeze(route)
}

export const START = createRoute(null, {
    path: '/'
})