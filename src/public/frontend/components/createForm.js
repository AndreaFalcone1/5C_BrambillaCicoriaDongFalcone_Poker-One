export const createForm = (parentElement) => {

    let type = '';

    const templateLogin = `
        <div class="mb-3">    
            <form>
                <div class="mb-3"> 
                    <label for="loginEmail" class="form-label">Email: </label>
                    <input type="email" class="form-control" placeholder="pippo@gmail.com" id="loginEmail"/><br>
                </div>
                <div class="mb-3">     
                    <label for="loginPassword" class="form-label">Password: </label>
                    <input type="password" class="form-control" placeholder="•••••••••" id="loginPassword"/><br>
                </div>
                <div class="mb-3">     
                    <button type="button" class="btn btn-primary" id="loginSubmit">Submit</button>
                    <button type="button" class="btn btn-primary" id="loginCancel">Cancel</button>
                </div>
            </form>
            <div id="errorDiv" class="hidden error">Errore in fase di login!</div>
        </div>
    `;

    const templateRegister = `
        <div class="mb-3">    
            <form>
                <div class="mb-3">
                    <label for="registerUsername" class="form-label">Username: </label>
                    <input type="text" placeholder="xXDavidecico06Xx" class="form-control" id="registerUsername"/>
                </div>
                <div class="mb-3">
                    <label for="registerEmail" class="form-label">Email: </label>
                    <input type="email" placeholder="pippo@gmail.com" class="form-control" id="registerEmail"/>
                </div>
                <div class="mb-3">    
                    <label for="registerName" class="form-label">Name: </label>
                    <input type="text" placeholder="Davide" class="form-control" id="registerName"/>
                </div>
                <div class="mb-3">
                    <label for="registerSurname" class="form-label">Surname: </label>
                    <input type="text" placeholder="Cicoria" class="form-control" id="registerSurname"/>
                </div>
                <div class="mb-3">
                    <label for="registerDateOfBirth" class="form-label">Date: </label>
                    <input type="date" class="form-control" id="registerDateOfBirth"/>
                </div>
                
                <button type="button" class="btn btn-primary" id="registerSubmit">Submit</button>
                <button type="button" class="btn btn-primary" id="registerCancel">Cancel</button>
                
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