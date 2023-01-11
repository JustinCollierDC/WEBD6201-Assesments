"user strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){

    function Start()
    {
        console.log("App Started!")
    }
    window.addEventListener("load", Start)


})();