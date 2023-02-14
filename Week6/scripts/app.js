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
            let sendButton = document.getElementById("sendButton");
            let subscribeCheckbox = document.getElementById("subscribeCheckbox");

            sendButton.addEventListener("click", function(event)
            {
                if(subscribeCheckbox.checked)
                {
                    console.log("Checkbox Checked!")

                    // Grab variables that collect input fields via their tag id
                    let inputName = document.getElementById("inputName");
                    let inputNumber = document.getElementById("inputNumber");
                    let inputEmail = document.getElementById("inputEmail");

                    // Instantiating Contact Object
                    let contact = new core.Contact(inputName.value, inputNumber.value, inputEmail.value);

                    if(contact.serialize())
                    {
                        // Object was serialized successfully.
                        console.log("Added user: " + inputName.value + " - " + inputNumber.value + " - " + inputEmail.value);
                        let key = contact.FullName.substring(0,1) + Date.now();
                        localStorage.setItem(key, contact.serialize());
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
                let contactList = document.getElementById("contactList");
                let data = "";  // add deserialized data from localStorage

                let keys = Object.keys(localStorage); // return a string array of keys.

                let index = 1;
                for(const key of keys)
                {
                    let contactData = localStorage.getItem(key);
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
                            localStorage.removeItem($(this).val())  // Remove using current object's key value
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
                            let inputName = document.getElementById("inputName");
                            let inputNumber = document.getElementById("inputNumber");
                            let inputEmail = document.getElementById("inputEmail");

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
                    contact.deserialize(localStorage.getItem(page));

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
                            contact.FullName = $("inputName").val();
                            contact.ContactNumber = $("inputNumber").val();
                            contact.EmailAddress = $("inputEmail").val();

                            // Replace the item in localStorage
                            localStorage.setItem(page, contact.serialize());

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
        function AddContact(fullName, contactNumber, emailAddress)
        {
            let contact = new core.Contact(fullName, contactNumber, emailAddress);

            // Validation
            if(contact.serialize())
            {
                let key = contact.FullName.substring(0,1) + Date.now();
                localStorage.setItem(key, contact.serialize());
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
        function ValidateField(input_field_id, regular_expression, error_message)
        {
            // Assigning ErrorMessage area via JQuery and hiding it.
            let messageArea = $(`#messageArea`).hide();

            // On loss of element focus
            $(input_field_id).on("blur", function()
                {
                    let inputFieldText = $(this).val();

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

        function LoadHeader(html_data)
        {
            // Inject the html code from html_data to the page header
            $("header").html(html_data);
            // Set the current page in the navbar to "active"
            $(`li>a:contains(${document.title})`).addClass("active");
        }

        function AjaxRequest(method, url, callback)
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

        function Start()
        {
            console.log("App Started!")

            // Loading header html code via AJAX
            AjaxRequest("GET", "header.html", LoadHeader);

            switch(document.title)
            {
                case "Home":
                    DisplayHomePage();
                    break;
                case "About":
                    DisplayAboutPage();
                    break;
                case "Products":
                    DisplayProductsPage();
                    break;
                case "Services":
                    DisplayServicesPage();
                    break;
                case "Contact":
                    DisplayContactPage();
                    break;
                case "Contact List":
                    DisplayContactListPage();
                    break;
                case "Edit Contact":
                    DisplayEditPage();
                    break;
                case "Login":
                    DisplayLoginPage();
                    break;
                case "Register":
                    DisplayRegisterPage();
                    break;
            }
        }
        window.addEventListener("load", Start)
    }
)();