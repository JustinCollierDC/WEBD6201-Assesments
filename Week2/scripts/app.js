/*
 Author: Justin Collier
 Title: App Javascript
 Date: 1/17/2023
 Purpose: The main Javascript file for functions and events on the website.
 */

"user strict";

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
    MainContent.appendChild(MainParagraph);

    // Template Strings controlling the main paragraph
    let FirstString = "This is";
    let SecondString = '${FirstString} the Main Paragraph.';
    MainParagraph.textContent = SecondString;

    // HTML Article Creation
    let Article = document.createElement("article");
    let ArticleParagraph = '<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>';

    function DisplayHomePage()
    {
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html"
        });
    }

    function DisplayAboutPage()
    {
        location.href = "about.html"
    }

    function DisplayProductsPage()
    {

    }

    function DisplayServicesPage()
    {

    }

    function DisplayContactPage()
    {

    }

    function Start()
    {
        console.log("App Started!")
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
            case "About":
                //DisplayAboutPage();
            case "Products":
                //DisplayProductsPage();
            case "Services":
                //DisplayServicesPage();
            case "Contact":
                //DisplayContactPage();
        }
    }
    window.addEventListener("load", Start)
}
)();