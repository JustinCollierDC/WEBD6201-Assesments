/*
 Author: Justin Collier
 Title: App Javascript
 Date Created: 1/17/2023
 Purpose: The main Javascript file for functions and events on the website.
 */

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function()
    {
        function DisplayHomePage()
        {
            console.log("Welcome to the Home Page.")

            // Text element initialization
            $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`)

            $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">
                &nbsp;This is my article paragraph</p></article>`)
        }

        function DisplayAboutPage()
        {
            console.log("Welcome to the About Us Page.")
        }

        function DisplayProductsPage()
        {
            console.log("Welcome to the Products Page.")
        }

        function DisplayServicesPage()
        {
            console.log("Welcome to the Services Page.")
        }

        function DisplayContactPage()
        {
            console.log("Welcome to the Contact Us Page.")

            // Validation
            ContactFormValidation();

            // Assigning page attributes (Send Button, Subscribe Checkbox)
            let sendButton = document.getElementById("sendButton") as HTMLElement;
            let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

            sendButton.addEventListener("click", function(event)
            {
                if(subscribeCheckbox.checked)
                {
                    console.log("Checkbox Checked!")

                    // Grab variables that collect input fields via their tag id
                    let inputName = document.getElementById("inputName") as HTMLInputElement;
                    let inputNumber = document.getElementById("inputNumber") as HTMLInputElement;
                    let inputEmail = document.getElementById("inputEmail") as HTMLInputElement;

                    // Instantiating Contact Object
                    let contact : core.Contact = new core.Contact(inputName.value, inputNumber.value, inputEmail.value);

                    if(contact.serialize())
                    {
                        // Object was serialized successfully.
                        console.log("Added user: " + inputName.value + " - " + inputNumber.value + " - " + inputEmail.value);
                        let key = contact.FullName.substring(0,1) + Date.now();
                        localStorage.setItem(key, contact.serialize() as string);
                    }
                }
            });

        }

        function DisplayContactListPage()
        {
            console.log("Contact List Page")

            // If any records exist
            if(localStorage.length > 0)
            {
                let contactList = document.getElementById("contactList") as HTMLElement;
                let data = "";  // add deserialized data from localStorage

                let keys = Object.keys(localStorage); // return a string array of keys.

                let index = 1;
                for(const key of keys)
                {
                    let contactData = localStorage.getItem(key) as string;
                    let contact = new core.Contact();
                    contact.deserialize(contactData);
                    data += `<tr><th scope="row" class="text-center">${index}</th>
                            <td>${contact.FullName}</td>
                            <td>${contact.ContactNumber}</td>
                            <td>${contact.EmailAddress}</td>
                    
                            <!-- Pass in the 'key' for value as an identifier for the contact being selected -->
                            <td class="text-center">
                                <button value="${key}" class="btn btn-primary btn-sm edit">
                                    <i class="fas fa-pen-nib fa-sm"></i> Edit</button>
                            </td>
                    
                            <td class="text-center">
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm"></i> Delete</button>
                            </td>
                            
                            <td></td>
                            </tr>`;

                    index++;
                }
                contactList.innerHTML = data;

                $("#addButton").on("click", () =>
                    {
                        location.href = "edit.html#add";  // #add passes a parameter named 'add' to the URL
                    }
                );

                // Contact's Edit Button
                $("button.edit").on("click", function()
                    {
                        location.href = "edit.html#" + $(this).val();
                    }
                )

                // Contact's Delete Button
                $("button.delete").on("click", function ()
                    {
                        // Confirm Delete
                        if(confirm("Delete contact, are you sure?"))
                        {
                            localStorage.removeItem($(this).val() as string)  // Remove using current object's key value
                        }
                        location.href = "contact-list.html";
                    }
                )
            }
        }

        function DisplayEditPage()
        {
            console.log("Edit Page");

            // Validation
            ContactFormValidation();

            let page = location.hash.substring(1);  // Index of '1' will skip the first character of '#' in the hash.
            switch(page)
            {
                // Edit.html is accessed with the '#add' parameter passed in.
                case "add":
                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class = 'fas fa-plus-circle fa-sm'></i> Add`)

                    // Edit Button
                    $("#editButton").on("click", (event) =>
                        {
                            // Variables that collect input fields via their tag id
                            let inputName = document.getElementById("inputName") as HTMLInputElement;
                            let inputNumber = document.getElementById("inputNumber") as HTMLInputElement;
                            let inputEmail = document.getElementById("inputEmail") as HTMLInputElement;

                            event.preventDefault();
                            AddContact(inputName.value, inputNumber.value, inputEmail.value);

                            // Refresh page
                            location.href = "contact-list.html";
                        }
                    )

                    // Cancel Button
                    $("#cancelButton").on("click", () =>
                        {
                            location.href = "contact-list.html";
                        }
                    )
                    break;
                default:
                {
                    // Edit case

                    // Get Contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page) as string);

                    console.log(contact.FullName);

                    // Display this contact's info in the edit form
                    $("#inputName").val(contact.FullName);
                    $("#inputNumber").val(contact.ContactNumber);
                    $("#inputEmail").val(contact.EmailAddress);

                    // When Edit Button is pressed, update the contact
                    $("#editButton").on("click", (event) =>
                        {
                            event.preventDefault();

                            // Get any changes on the form
                            contact.FullName = $("inputName").val() as string;
                            contact.ContactNumber = $("inputNumber").val() as string;
                            contact.EmailAddress = $("inputEmail").val() as string;

                            // Replace the item in localStorage
                            localStorage.setItem(page, contact.serialize() as string);

                            // Return to the contact-list page
                            location.href = "contact-list.html";
                        }
                    )

                    // Cancel button is clicked
                    $("#cancelButton").on("click", () =>
                        {
                            location.href = "contact-list.html";
                        }
                    )

                }
                break;
            }
        }

        function DisplayLoginPage()
        {
            console.log("Welcome to the Login Page.")

            // Assigning ErrorMessage area via JQuery and hiding it.
            let messageArea = $(`#messageArea`).hide();

            // Login Button Click-event
            $("#loginButton").on("click", (event) =>
                {
                    let successFlag = false;

                    // Instantiate a User object
                    let newUser = new core.User();

                    // Variables that collect input fields via their tag id
                    let username = document.getElementById("username") as HTMLInputElement;
                    let password = document.getElementById("password") as HTMLInputElement;
                    // OR
                    // let username = document.forms[0].username.value
                    // let password = document.forms[0].password.value

                    // AJAX call ('get') to our users.json data file.
                    $.get("../data/users.json", function (data)
                    {
                        // Iterate through users in the file
                        for(const user of data.users)
                        {
                            if(username.value === user.Username && password.value === user.Password)
                            {
                                // Form inputs match a stored user's credentials
                                newUser.fromJSON(user);
                                successFlag = true;
                                break;
                            }
                        }

                        // Login Validation Successful
                        if(successFlag)
                        {
                            // Add user to storage session
                            messageArea.removeAttr("class").hide();

                            console.log("preparing to store user in session...");
                            sessionStorage.setItem("user", newUser.serialize() as string);
                            console.log("user successfully stored in session.");

                            // Redirect user to secure area of the site.
                            location.href = "contact-list.html";
                        }
                        else
                        {
                            // User credentials do not match any stored data
                            $("username").trigger("focus").trigger("select");
                            messageArea.addClass("alert alert-danger").text("ERROR: Invalid Login Credentials").show();
                        }
                    });
                }
            )
        }

        function DisplayRegisterPage()
        {
            console.log("Welcome to the Register Page.")
        }

        /**
         *
         * @param {String} fullName
         * @param {String} contactNumber
         * @param {String} emailAddress
         * @constructor
         */
        // Method to add a Contact to storage
        function AddContact(fullName : string, contactNumber : string, emailAddress : string)
        {
            let contact = new core.Contact(fullName, contactNumber, emailAddress);

            // Validation
            if(contact.serialize())
            {
                let key = contact.FullName.substring(0,1) + Date.now();
                localStorage.setItem(key, contact.serialize() as string);
            }
        }

        /**
         *
         * @param displayName
         * @param emailAddress
         * @param username
         * @param password
         * @constructor
         */
        // Method to add a User to storage
        function AddUser(displayName : string, emailAddress : string, username :string, password :string)
        {
            let contact = new core.User(displayName, emailAddress, username, password);

            // Validation
            if(contact.serialize())
            {
                let key = contact.DisplayName.substring(0,1) + Date.now();
                localStorage.setItem(key, contact.serialize() as string);
            }
        }

        // Validation Functions
        /**
         *
         * @constructor
         */
        function ContactFormValidation()
        {
            // Name
            ValidateField("#inputName", /^([A-Z][a-z]{1,3}\\.?\\s)?([A-Z][a-z]+)+([\\s,-]([A-z][a-z]+))*$/,
                "Please enter a valid First and Last Name (Firstname Lastname)")

            // Number
            ValidateField("#inputNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
                "Please enter a valid Contact Number (999-999-9999)")

            // Email
            ValidateField("#inputEmail", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z]{2,10}$/,
                "Please enter a valid Email Address (text@text.text)")
        }

        /**
         *
         * @param {String} input_field_id
         * @param {RegExp} regular_expression
         * @param {String} error_message
         * @constructor
         */
        function ValidateField(input_field_id : string, regular_expression : RegExp, error_message : string)
        {
            // Assigning ErrorMessage area via JQuery and hiding it.
            let messageArea = $(`#messageArea`).hide();

            // On loss of element focus
            $(input_field_id).on("blur", function()
                {
                    // Type cast as String for TypeScript formatting
                    let inputFieldText = $(this).val() as string;

                    // Validating using the passed in regular expression pattern
                    if(!regular_expression.test(inputFieldText))
                    {
                        // Validation failed.
                        $(this).trigger("focus").trigger("select");
                        messageArea.addClass("alert alert-danger").text(error_message).show();
                    }
                    else
                    {
                        // Validation passed.
                        messageArea.removeAttr("class").hide();
                    }
                }
            )
        }

        function AjaxRequest(method : string, url : string, callback : Function)
        {
            // Step 1. Instantiate XHR object
            let xhr = new XMLHttpRequest();

            // Step 2. Add listener for 'readystatechange' event
            xhr.addEventListener("readystatechange", () =>
            {
                //Check that XMLHttpRequest call is finished (ReadyState == 4)
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    if(typeof callback === "function")
                    {
                        callback(xhr.responseText);
                    }
                    else
                    {
                        console.error("ERROR: callback not a function")
                    }
                }
            });

            // Step 3. Open a connection to the server, perform local call to url (web url OR html file path)
            xhr.open(method, url)

            xhr.send();
        }

        function CheckLogin()
        {
            // Check if a 'user' has been stored (logged in)
            if(sessionStorage.getItem("user"))
            {
                // Change Login to Logout on navbar.
                $("#loginNav").html(`<a id="logoutNav" className="nav-link" aria-current="page" href="#">
                    <i class="fas fa-sign-out-alt"></i> Logout</a>`);
            }

            $("#logoutNav").on("click", function()
            {
                // Perform logout
                sessionStorage.clear();
                // Redirect to login page
                location.href = "login.html";
            });
        }

        function Display404Page()
        {
            console.log("404 Page");
        }

        function ActiveLinkCallback() : Function
        {
            switch (router.ActiveLink)
            {
                case "home" : return DisplayHomePage;
                case "about" : return DisplayAboutPage;
                case "services" : return DisplayServicesPage;
                case "products" : return DisplayProductsPage;
                case "contact" : return DisplayContactPage;
                case "contact-list" : return DisplayContactListPage;
                case "edit" : return DisplayEditPage;
                case "login" : return DisplayLoginPage;
                case "register" : return DisplayRegisterPage;
                case "404" : return Display404Page;
                default:
                    console.error("Error: callback does not exist " + router.ActiveLink);
                    return new Function();
                    break;
            }
        }

        function LoadHeader()
        {
            $.get("/views/components/header.html", function(html_data)
            {

                // Inject the html code from html_data to the page header
                $("header").html(html_data);

                document.title = capitalizeFirstLetter(router.ActiveLink);

                // Set the current page in the navbar to "active"
                $(`li>a:contains(${document.title})`).addClass("active")

                // Check if a user is logged in (Login/Logout functionality)
                CheckLogin();

            });
        }

        function LoadFooter()
        {
            $.get("/views/components/footer.html", function(html_data)
            {
                // Inject the html code from html_data to the pa
                // get footer
                $("footer").html(html_data);

            });
        }

        function LoadContent()
        {
            let page_name = router.ActiveLink;
            let callback = ActiveLinkCallback();

            $.get(`./views/content/${page_name}.html`, function(html_data)
            {
                $("main").html(html_data);
                callback();
            });

        }

        function capitalizeFirstLetter(inputText : string) : string
        {
            return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
        }

        function Start()
        {
            console.log("App Started!")

            LoadHeader();

            LoadContent();

            LoadFooter();

            // Loading header html code via AJAX
            //AjaxRequest("GET", "./view/components/header.html", LoadHeader);
        }
        window.addEventListener("load", Start)
    }
)();