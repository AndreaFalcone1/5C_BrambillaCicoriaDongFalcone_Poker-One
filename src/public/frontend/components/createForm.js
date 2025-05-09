export const createForm = (parentElement) => {

    let type = '';

    const templateLogin = `
        <div class="">    
            <form class="">
                <input type="text" id="loginEmail"/>
                <input type="text" id="loginPassword"/>
                <button type="button" id="loginSubmit">Submit</button>
                <button type="button" id="loginCancel">Cancel</button>
            </form>
        </div>
    `;

    const templateRegister = `
        <div class="">    
            <form class="">
                <input type="text" id="registerUsername"/>
                <input type="text" id="registerEmail"/>
                <input type="text" id="registerPassword"/>
                <input type="text" id="registerName"/>
                <input type="text" id="registerSurname"/>
                <input type="date" id="registerDateOfBirth"/>
                <button type="button" id="registerSubmit">Submit</button>
                <button type="button" id="registerCancel">Cancel</button>
            </form>
        </div>
    `;

    let submitCallback, cancelCallback;
  
    return {
        onSubmit: (callbackFn) => { submitCallback = callbackFn; },

        onCancel: (callbackFn) => { cancelCallback = callbackFn; },
        
        render: () => {

            if (type.toLowerCase() == "login") {

                //Use the login template
                parentElement.innerHTML = templateLogin;

                //Handle the submit
                document.querySelector("#loginSubmit").onclick = () => {
                    
                    const dict = {};

                    dict.email = document.querySelector("#loginEmail").value;
                    dict.password = document.querySelector("#loginPassword").value;
                    
                    submitCallback(dict);
                };

                //Handle the reject
                document.querySelector("#loginCancel").onclick = () => {
                    parentElement.innerHTML = '';
                    cancelCallback();
                }
                
            } else if (type.toLowerCase() == "register") {

                //Use the register template
                parentElement.innerHTML = templateRegister;

                //Handle the submit
                document.querySelector("#registerSubmit").onclick = () => {
                    
                    const dict = {};
                    
                    dict.username = document.querySelector("#registerUsername").value;
                    dict.email = document.querySelector('#registerEmail').value;
                    dict.name = document.querySelector("#registerName").value;
                    dict.surname = document.querySelector("#registerSurname").value;
                    dict.date = document.querySelector("#registerDateOfBirth").value;
                    
                    submitCallback(dict);
                };

                //Handle the reject
                document.querySelector("#registerCancel").onclick = () => {
                    parentElement.innerHTML = '';
                    cancelCallback();
                }

            } else {
                return -1
            }
        },
        
        build: (inputType) => { type = inputType; }
    };
};