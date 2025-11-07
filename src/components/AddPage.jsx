import { useState } from "react";
import './AddPage.css';
import { useContext } from "react";
import { LangContext } from "../contexts/Context";

export default function AddPage({addContact, handlePage, contacts}) {
    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const { translate } = useContext(LangContext);

    const handleSave = ()=> {
        const newContact = {
            id: contacts.length + 1,
            Name: firstName,
            LastName :lastName,
            phoneNumber: phone,
        }

        if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
            setError('PLease fill all fields');
            return;
        }

        if (!/^[\d+\-\s]+$/.test(phone)) {
            setError('Please enter the correct phone number, use only numbers or +/-');
            return;
        }
        setError('');

        addContact(newContact);
        setName('');
        setLastName('');
        setPhone('');


        handlePage('contacts');
    }

    return (
        <>
        <h2 className="add-title">{translate("titleAdd")}</h2>
        <form className="main-form">
            {error && <p className="errorBlock">{error}</p>}
            <input type="text" name="firstName" placeholder={translate("name")}
            value={firstName} onChange={(e) => setName(e.target.value)}/>
            <input type="text" name="lastName" placeholder={translate("lastName")} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <input type="tel" name="tel" id="" placeholder={translate("phone")} value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <div className="add-buttons">
                <button className="save-btn" type="button" onClick={handleSave}>{translate("save")}</button>
                <button className="cancel-btn" type="button" onClick={()=> handlePage('contacts')}>{translate("cancel")}</button>
            </div>
        </form>
        </>
    )
}