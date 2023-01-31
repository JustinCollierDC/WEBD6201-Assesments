
class Contact
{

    // Getters
    get FullName()
    {
        return this.m_fullName;
    }

    get ContactNumber()
    {
        return this.m_contactNumber;
    }

    get EmailAddress()
    {
        return this.m_emailAddress;
    }

    // Setters
    set FullName(fullName)
    {
        this.m_fullName = fullName;
    }

    set ContactNumber(contactNumber)
    {
        this.m_contactNumber = contactNumber;
    }

    set EmailAddress(emailAddress)
    {
        this.m_emailAddress = emailAddress;
    }

    toString()
    {
        return `Full Name: ${this.FullName}\nContact Number: ${this.ContactName}\n EmailAddress: ${this.EmailAddress}`;
    }
}