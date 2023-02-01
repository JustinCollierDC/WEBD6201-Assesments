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

            // Accessing the AboutUs button via JQuery
            $("#AboutUsButton").on("click", () =>
            {
                location.href = "about.html";   // Redirect to About Us
            })

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

        function Start()
        {
            console.log("App Started!")
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
                case "Edit Contact":
                    DisplayEditPage();
            }
        }
        window.addEventListener("load", Start)
    }
)();