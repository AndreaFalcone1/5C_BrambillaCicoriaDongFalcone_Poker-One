export const generateTableList = (parentElement, socket) => {
    let data = [];
    let callbackFunc;
  
    return {
        setData: (array) => { data = array; },
        setCallback: (callback) => { callbackFunc = callback },
        clear: () => { parentElement.innerHTML = ''; },
        render: () => {
            let htmlTemplate = '<li>Room %TEMPLATE%</li>';
            let inviteButtonTemplate = '<button class="join" id="join_%TEMPLATE%">Join</button>'
            let html = "<ul>";
            data.forEach((table, index) => {
                html += htmlTemplate.replace("%TEMPLATE%", index);
                html += inviteButtonTemplate.replace("%TEMPLATE%", index)
            });
            html += "</ul>";
            parentElement.innerHTML = html;
            parentElement.querySelectorAll(".join").forEach(btn => {
                btn.onclick = () => callbackFunc(
                    btn.id.split("_")[1], 
                    socket.username
                );
            });
        },
    };
};