import { React} from "react";

import '../css/style.css';
import FacebookLogInComponent from './FacebookLogInComponent';
import FacebookSignUpComponent from './FacebookSignUpComponent'

function Facebook() {

    return (
        <div>
            <FacebookLogInComponent></FacebookLogInComponent>
            <FacebookSignUpComponent></FacebookSignUpComponent>          
        </div>
    );
}

export default Facebook;
