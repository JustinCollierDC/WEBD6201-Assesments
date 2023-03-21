"use strict";

// -> Refactored 3/7/2023

namespace core
{
    export class User
    {
        // Constructor(s)
        private m_displayName: string;
        private m_emailAddress: string;
        private m_username: string;
        private m_password: string;

        public constructor(displayName = "", emailAddress = "", username = "", password = "")
        {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }

        // Getters
        public get DisplayName() : string
        {
            return this.m_displayName;
        }
        public get EmailAddress() : string
        {
            return this.m_emailAddress;
        }
        public get Username() : string
        {
            return this.m_username;
        }
        public get Password() : string
        {
            return this.m_password;
        }

        // Setters
        public set DisplayName(displayName : string)
        {
            this.m_displayName = displayName;
        }
        public set EmailAddress(emailAddress : string)
        {
            this.m_emailAddress = emailAddress;
        }
        public set Username(username :string)
        {
            this.m_username = username;
        }
        public set Password(password : string)
        {
            this.m_password = password;
        }

        // Method overrides
        toString() : string
        {
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
        }

        public serialize() : string | null
        {
            // Validation
            if(this.DisplayName != "" && this.EmailAddress != "" && this.Username != "" && this.Password != "")
            {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
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
            this.m_displayName = propertyArray[0];
            this.m_emailAddress = propertyArray[1];
            this.m_username = propertyArray[2];
            this.m_password = propertyArray[3];
        }

        public toJSON() : { Username: string, DisplayName: string, EmailAddress: string, Password: string }
        {
            return{
                "DisplayName" : this.m_displayName,
                "EmailAddress" : this.m_emailAddress,
                "Username" : this.m_username,
                "Password" : this.m_password
            }
        }

        fromJSON(data : User)
        {
            this.m_displayName = data.DisplayName;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }
    }
    core.User = User;
}