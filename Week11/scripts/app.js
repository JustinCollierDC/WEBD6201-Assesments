"use strict";
(function () {
    function AuthGuard() {
        let protected_routes = [
            "task-list", "contact-list"
        ];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function DisplayHomePage() {
        console.log("Welcome to the Home Page.");
        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
    }
    function DisplayAboutPage() {
        console.log("Welcome to the About Us Page.");
    }
    function DisplayProductsPage() {
        console.log("Welcome to the Products Page.");
    }
    function DisplayServicesPage() {
        console.log("Welcome to the Services Page.");
    }
    function DisplayContactPage() {
        console.log("Welcome to the Contact Us Page.");
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckbox.checked) {
                console.log("Checkbox Checked!");
                let inputName = document.getElementById("inputName");
                let inputNumber = document.getElementById("inputNumber");
                let inputEmail = document.getElementById("inputEmail");
                let contact = new core.Contact(inputName.value, inputNumber.value, inputEmail.value);
                if (contact.serialize()) {
                    console.log("Added user: " + inputName.value + " - " + inputNumber.value + " - " + inputEmail.value);
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page");
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "contact-list";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
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
            $("#addButton").on("click", () => {
                LoadLink("edit", "add");
            });
            $("button.edit").on("click", function () {
                let passedData = "edit.html#" + $(this).val();
                LoadLink("edit", passedData);
            });
            $("button.delete").on("click", function () {
                if (confirm("Delete contact, are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                LoadLink("contact-list");
            });
        }
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
        let page = router.LinkData;
        switch (page) {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class = 'fas fa-plus-circle fa-sm'></i> Add`);
                $("#editButton").on("click", (event) => {
                    let inputName = document.getElementById("inputName");
                    let inputNumber = document.getElementById("inputNumber");
                    let inputEmail = document.getElementById("inputEmail");
                    event.preventDefault();
                    AddContact(inputName.value, inputNumber.value, inputEmail.value);
                    LoadLink("contact-list");
                });
                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                });
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    console.log(contact.FullName);
                    $("#inputName").val(contact.FullName);
                    $("#inputNumber").val(contact.ContactNumber);
                    $("#inputEmail").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.FullName = $("inputName").val();
                        contact.ContactNumber = $("inputNumber").val();
                        contact.EmailAddress = $("inputEmail").val();
                        localStorage.setItem(page, contact.serialize());
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", () => {
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }
    function DisplayLoginPage() {
        console.log("Welcome to the Login Page.");
        AddLinkEvents("register");
        let messageArea = $(`#messageArea`).hide();
        $("#loginButton").on("click", (event) => {
            let successFlag = false;
            let newUser = new core.User();
            let username = document.getElementById("username");
            let password = document.getElementById("password");
            $.get("../data/users.json", function (data) {
                for (const user of data.users) {
                    if (username.value === user.Username && password.value === user.Password) {
                        newUser.fromJSON(user);
                        successFlag = true;
                        break;
                    }
                }
                if (successFlag) {
                    messageArea.removeAttr("class").hide();
                    console.log("preparing to store user in session...");
                    sessionStorage.setItem("user", newUser.serialize());
                    console.log("user successfully stored in session.");
                    LoadLink("contact-list");
                }
                else {
                    $("username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("ERROR: Invalid Login Credentials").show();
                }
            });
        });
    }
    function DisplayRegisterPage() {
        console.log("Welcome to the Register Page.");
        AddLinkEvents("login");
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function AddUser(displayName, emailAddress, username, password) {
        let contact = new core.User(displayName, emailAddress, username, password);
        if (contact.serialize()) {
            let key = contact.DisplayName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ContactFormValidation() {
        ValidateField("#inputName", /^([A-Z][a-z]{1,3}\\.?\\s)?([A-Z][a-z]+)+([\\s,-]([A-z][a-z]+))*$/, "Please enter a valid First and Last Name (Firstname Lastname)");
        ValidateField("#inputNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact Number (999-999-9999)");
        ValidateField("#inputEmail", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address (text@text.text)");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $(`#messageArea`).hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = capitalizeFirstLetter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $('li>a:contains(${document.title})').addClass("active");
        LoadContent();
    }
    function AddNavigationEvents() {
        let NavLinks = $("ul>li>a");
        NavLinks.off("click");
        NavLinks.off("mouseover");
        NavLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        NavLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });
        linkQuery.on("mouseout", function () {
            $(this).css('font-weight', 'normal');
        });
    }
    function CheckLogin() {
        AddNavigationEvents();
        $("#loginNav").html(`<a id="loginNav" class="nav-link" data="login">
                    <i class="fas fa-sign-in-alt"></i> Login</a>`);
        if (sessionStorage.getItem("user")) {
            $("#loginNav").html(`<a id="logoutNav" className="nav-link" aria-current="page" href="#">
                    <i class="fas fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logoutNav").on("click", function () {
            sessionStorage.clear();
            LoadLink("login");
        });
    }
    function Display404Page() {
        console.log("404 Page");
    }
    function ActiveLinkCallBack() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "services": return DisplayServicesPage;
            case "products": return DisplayProductsPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "edit": return DisplayEditPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "404": return Display404Page;
            default:
                console.error("Error: callback does not exist " + router.ActiveLink);
                return new Function();
                break;
        }
    }
    function LoadHeader() {
        $.get("./Views/components/header.html", function (html_data) {
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadFooter() {
        $.get("/views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();
        $.get(`./Views/content/${page_name}.html`, function (html_date) {
            $("main").html(html_date);
            callback();
        });
    }
    function capitalizeFirstLetter(inputText) {
        return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map