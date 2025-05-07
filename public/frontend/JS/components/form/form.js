const generateForm = (parentElement) => {
    let type = '';
    let submitCallback = () => {};
    let cancelCallback = () => {};
  
    return {
      onSubmit: (callbackFn) => { submitCallback = callbackFn; },
      onCancel: (callbackFn) => { cancelCallback = callbackFn; },
      setType: (value) => { type = value; },
      setStatus: (status) => { console.log("Status:", status); }, 
      clear: () => { parentElement.innerHTML = ''; },
      render: () => {
        parentElement.innerHTML = `
          <div>Type: ${type} <input type="text" id="typeInput" /></div>
          <button id="submitBtn">Submit</button>
          <button id="cancelBtn">Cancel</button>
        `;
        document.querySelector("#submitBtn").onclick = () => {
          const val = document.querySelector("#typeInput").value;
          submitCallback(val);
        };
        document.querySelector("#cancelBtn").onclick = cancelCallback;
      },
      build: (inputType) => { type = inputType; },
    };
  };
  
