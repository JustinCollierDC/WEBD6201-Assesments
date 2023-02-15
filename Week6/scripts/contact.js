/*
 Author: Justin Collier
 Title: Contact Javascript
 Date: 1/27/2023
 Purpose: The Contact Javascript file for creating Contact objects.
 */
"use strict";

(function (core)
    {
        class Contact
        {

            // Constructor (Acts as both default and parameterized)
            /**
             *
             * @param fullName
             * @param contactNumber
             * @param emailAddress
             */
            constructor(fullName = "", contactNumber = "", emailAddress = "")
            {
                this.FullName = fullName;
                this.ContactNumber = contactNumber;
                this.EmailAddress = emailAddress;
            }

            // Getters
            /**
             *
             * @returns {*}
             * @constructor
             */
            get FullName()
            {
                return this.m_fullName;
            }

            /**
             *
             * @returns {*}
             * @constructor
             */
            get ContactNumber()
            {
                return this.m_contactNumber;
            }

            /**
             *
             * @returns {*}
             * @constructor
             */
            get EmailAddress()
            {
                return this.m_emailAddress;
            }

            // Setters
            /**
             *
             * @param fullName
             * @constructor
             */
            set FullName(fullName)
            {
                this.m_fullName = fullName;
            }

            /**
             *
             * @param contactNumber
             * @constructor
             */
            set ContactNumber(contactNumber)
            {
                this.m_contactNumber = contactNumber;
            }

            /**
             *
             * @param emailAddress
             * @constructor
             */
            set EmailAddress(emailAddress)
            {
                this.m_emailAddress = emailAddress;
            }

            /**
             *
             * @returns {string}
             */
            toString()
            {
                return `Full Name: ${this.FullName}\nContact Number: ${this.FullName}\n EmailAddress: ${this.EmailAddress}`;
            }

            /**
             *
             * @returns {null|string}
             */
            serialize()
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
            deserialize(data)
            {
                let propertyArray = data.split(",");
                this.FullName = propertyArray[0];
                this.ContactNumber = propertyArray[1];
                this.EmailAddress = propertyArray[2];
            }
        }
        core.Contact = Contact;
    }
)(core || (core = {}));

