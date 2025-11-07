import { useState } from "react"
import { useContext } from "react";
import { LangContext } from "../contexts/Context";


export default function Admin() {
    const [login, setLogin] = useState('');
    const [passs, setPass] = useState('');
    const [error, setError] = useState('');
    const { translate } = useContext(LangContext);

    return (
        <>
            <h2>Sign up</h2>
            <form>
                {error && <p className="errorBlock">{error}</p>}
                <input type="text" name="login" placeholder="Enter a username"/>
                <input type="password" name="pass" placeholder="Enter a password" />
                <button>Log in</button>
            </form>
        </>
    )
}