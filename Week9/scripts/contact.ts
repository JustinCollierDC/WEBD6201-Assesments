/*
 Author: Justin Collier
 Title: Contact TypeScript
 Date: 1/27/2023 -> Refactored 3/7/2023
 Purpose: The Contact Javascript file for creating Contact objects.
 */

"use strict";

namespace core
{
    export class Contact
    {

        // Constructor (Acts as both default and parameterized)
        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string;

        /**
         *
         * @param fullName
         * @param contactNumber
         * @param emailAddress
         */
        constructor(fullName : string = "", contactNumber : string = "", emailAddress : string = "")
        {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }

        // Getters
        /**
         *
         * @returns {*}
         * @constructor
         */
        public get FullName() : string
        {
            return this.m_fullName;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        public get ContactNumber() : string
        {
            return this.m_contactNumber;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        public get EmailAddress() : string
        {
            return this.m_emailAddress;
        }

        // Setters
        /**
         *
         * @param fullName
         * @constructor
         */
        public set FullName(fullName : string)
        {
            this.m_fullName = fullName;
        }

        /**
         *
         * @param contactNumber
         * @constructor
         */
        public set ContactNumber(contactNumber : string)
        {
            this.m_contactNumber = contactNumber;
        }

        /**
         *
         * @param emailAddress
         * @constructor
         */
        public set EmailAddress(emailAddress : string)
        {
            this.m_emailAddress = emailAddress;
        }

        /**
         *
         * @returns {string}
         */
        public toString() : string
        {
            return `Full Name: ${this.FullName}\nContact Number: ${this.FullName}\n EmailAddress: ${this.EmailAddress}`;
        }

        /**
         *
         * @returns {null|string}
         */
        public serialize() : string | null
        {
            // Validation
            if(this.FullName != "" && this.ContactNumber != "" && this.EmailAddress != "")
            {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        }

        /**
         *
         * @param data
         */
        public deserialize(data : string) : void
        {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
}

