/*
 Author: Justin Collier
 Title: App Javascript
 Date: 1/17/2023
 Purpose: The main Javascript file for functions and events on the website.
 */

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function()
    {

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");

        // Main paragraph initialization (This is seen on every page)
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the main paragraph!";

        // Template Strings controlling the main paragraph
        let FirstString = "This is";
        //let SecondString = '${FirstString} the Main Paragraph.'; ** ${} not working for me.
        let SecondString = FirstString + ' the Main Paragraph';
        MainParagraph.textContent = SecondString;

        // HTML Article Creation
        let Article = document.createElement("article");
        let ArticleParagraph = '<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>';
        Article.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;

        function DisplayHomePage()
        {
            MainContent.appendChild(MainParagraph);
            MainContent.appendChild(Article);       // Appending article to page body.

            let AboutUsButton = document.getElementById("AboutUsButton");
            AboutUsButton.addEventListener("click", function()
            {
                location.href = "about.html"
            });
        }

        function DisplayAboutPage()
        {

        }

        function DisplayProductsPage()
        {

        }

        function DisplayServicesPage()
        {

        }

        function DisplayContactPage()
        {
            let sendButton = document.getElementById("sendButton");
            let subscribeCheckbox = document.getElementById("subscribeCheckbox")

            sendButton.submit();

            sendButton.addEventListener("click", function(event)
            {
                if(subscribeCheckbox.checked)
                {
                    location.href = ("index.html");
                    console.log("Checkbox Checked!")

                    // Instantiate Contact Object
                    let contact = new Contact('#inputName'.value, '#inputNumber'.value, '#inputEmail'.value);
                    if(contact.serialize())
                    {
                        let key = contact.FullName.substring(0,1) + Date.now();
                        localStorage.setItem(key, contact.serialize())
                    }
                }
            });
        }

        function DisplayContactListPage()
        {
            console.log("Contact List Page")

            if(localStorage.length > 0)
            {
                let contactList = document.getElementById("contactList");
                let data = "";  // add deserialized data from localStorage

                let keys = Object.keys(localStorage); // return a string array of keys.

                let index = 1;
                for(const key of keys)
                {
                    let contactData = localStorage.getItem(key);
                    let contact = new Contact();
                    contact.deserialize(contactData);
                    data += `<tr><th scope="row" class="text-center">${index}</th>
                    <td>${contact.FullName}</td>
                    <td>${contact.ContactNumber}</td>
                    <td>${contact.EmailAddress}</td>
                    <td></td>
                    <td></td>
                    </tr>`;

                    index++;
                }
                contactList.innerHTML = data;
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
            }
        }
        window.addEventListener("load", Start)
    }
)();