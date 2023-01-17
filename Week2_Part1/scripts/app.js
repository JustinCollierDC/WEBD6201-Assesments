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
    function Start()
    {
        console.log("App Started!")
        DisplayAboutPage()  // Calls function if 'About Us' button is pressed.
    }
    window.addEventListener("load", Start)
}
)();

function DisplayHomePage()
{
    let AboutUsButton = document.getElementById("AboutUsButton");   // Reference to button on index page
    AboutUsButton.addEventListener("click", function()           // Click event
    {
        location.href = "index.html"    // Redirect to:
    });
}

function DisplayAboutPage()
{
    let AboutUsButton = document.getElementById("AboutUsButton");
    AboutUsButton.addEventListener("click", function()
    {
        location.href = "about.html"
    });
}

function DisplayProductsPage()
{
    let AboutUsButton = document.getElementById("AboutUsButton");
    AboutUsButton.addEventListener("click", function()
    {
        location.href = "products.html"
    });
}

function DisplayServicesPage()
{
    let AboutUsButton = document.getElementById("AboutUsButton");
    AboutUsButton.addEventListener("click", function()
    {
        location.href = "services.html"
    });
}

function DisplayContactPage()
{
    let AboutUsButton = document.getElementById("AboutUsButton");
    AboutUsButton.addEventListener("click", function()
    {
        location.href = "contact.html"
    });
}