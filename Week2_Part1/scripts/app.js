"user strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function()
{
    function Start()
    {
        console.log("App Started!")


    }
    window.addEventListener("load", Start)
}
)();

function DisplayHomePage()
{
    let AboutUsButton = document.getElementById("AboutUsButton");
    AboutUsButton.addEventListener("click", function()
    {
        location.href = "index.html"
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