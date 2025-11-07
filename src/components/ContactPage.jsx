import './ContactPage.css';
import { useContext } from "react";
import { LangContext } from "../contexts/Context";


export default function ContactPage({contacts, deleteContact}) {
    const { translate } = useContext(LangContext);

    const bodyTable = contacts.map(contact=> 
        <tr key={contact.id}>
            <td>{contact.Name}</td>
            <td>{contact.LastName}</td>
            <td>{contact.phoneNumber}</td>
            <td><button className='delete-btn' onClick={()=> {
                deleteContact(contact.id)
            }}>{translate("delete")}</button></td>
        </tr>
    )
    
    return (
        <>
        <h2 className="contact-title">{translate("title")}</h2>
        <table className="contacts-table">
            <thead>
                <tr>
                    <th>{translate("name")}</th>
                    <th>{translate("lastName")}</th>
                    <th>{translate("phone")}</th>
                    <th>{translate("actions")}</th>
                </tr>
            </thead>
            <tbody>
                {bodyTable}
            </tbody>
        </table>
        </>
    )
}