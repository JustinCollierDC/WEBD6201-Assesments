"use strict";

// -> Refactored 3/7/2023

namespace core
{
    export class Router
    {
        // Public Properties
        private m_activeLink: string;
        private m_routingTable: string[];
        /**
         *
         * @returns {String}
         * @constructor
         */
        public get ActiveLink() : string
        {
            return this.m_activeLink;
        }

        /**
         *
         * @param link
         * @constructor
         */
        public set ActiveLink(link : string)
        {
            this.m_activeLink = link;
        }

        // Constructor
        public constructor()
        {
            this.m_activeLink = "";
            this.m_routingTable = [];
        }

        // Public Methods
        public Add(route : string) : void
        {
            this.m_routingTable.push(route);
        }

        AddTable(routeTable : string[]) : void
        {
            this.m_routingTable = routeTable;
        }

        Find(route : string) : number
        {
            // Returns index of 'route' in routingTable
            return this.m_routingTable.indexOf(route);
        }

        Remove(route : string) : boolean
        {
            if(this.Find(route) > -1)   // Check if index is > -1 AKA it exists.
            {
                this.m_routingTable.splice(this.Find(route));
                return true
            }
            return false
        }

        // Public Overrides
        toString() : string
        {
            return this.m_routingTable.toString();
        }

    }
}

// Defining Router
let router : core.Router = new core.Router();

// Adding default routes
router.AddTable(
    [
        "/",
        "/home",
        "/about",
        "/services",
        "/contact",
        "/contact-list",
        "/edit",
        "/products",
        "/register",
        "/login"
    ]
);

let route : string = location.pathname;

// If route is of positive index proceed -> If route is "/" set page to home, otherwise ignore / and set page to name.
// If route is -1, set to "404"
router.ActiveLink = (router.Find(route) > -1)
                    ? (route === "/") ? "home" : route.substring(1)
                    : ("404");