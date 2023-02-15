"use strict";

(function(core)
{
    class User
    {
        // Constructor(s)
        constructor(displayName = "", emailAddress = "", username = "", password = "")
        {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        // Getters
        get DisplayName()
        {
            return this.m_displayName;
        }
        get EmailAddress()
        {
            return this.m_emailAddress;
        }
        get Username()
        {
            return this.m_username;
        }
        get Password()
        {
            return this.m_password;
        }

        // Setters
        set DisplayName(displayName)
        {
            this.m_displayName = displayName;
        }
        set EmailAddress(emailAddress)
        {
            this.m_emailAddress = emailAddress;
        }
        set Username(username)
        {
            this.m_username = username;
        }
        set Password(password)
        {
            this.m_password = password;
        }

        // Method overrides
        toString()
        {
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
        }

        serialize()
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
        deserialize(data)
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Username = propertyArray[3];
        }

        toJSON()
        {
            return{
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username,
                "Password" : this.Password
            }
        }

        fromJSON(data)
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }
    }
    core.User = User;
}
)(core || (core = {}));