export const generateList = (parentElement, socket) => {
    let data = [];
    let callbackFunc;
  
    return {
        setData: (array) => { data = array; },
        setCallback: (callback) => { callbackFunc = callback },
        clear: () => { parentElement.innerHTML = ''; },
        render: () => {
            let htmlTemplate = '<li>%TEMPLATE%</li>';
            let inviteButtonTemplate = '<button class="inviter" id="invite_%TEMPLATE%">invita</button>'
            let html = "<ul>";
            data.forEach(user => {
                html += htmlTemplate.replace("%TEMPLATE%", user.username);
                if (user.table != null) {
                    html += inviteButtonTemplate.replace("%TEMPLATE%", user.username)
                }
            });
            html += "</ul>";
            parentElement.innerHTML = html;
            parentElement.querySelectorAll(".inviter").forEach(btn => {
                btn.onclick = () => callbackFunc(btn.id.split("_")[1], socket.table);
            });
        },
    };
};