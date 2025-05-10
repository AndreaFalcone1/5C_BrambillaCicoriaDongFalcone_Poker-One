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
                //if (user.table == null /*&& user.id != socket.id*/) {
                    html += htmlTemplate.replace("%TEMPLATE%", user.username);
                    html += inviteButtonTemplate.replace("%TEMPLATE%", user.username)
                //} else if (user.id == socket.id) {
                    //html += htmlTemplate.replace("%TEMPLATE%", user.username + "(You)");
                //}
            });
            html += "</ul>";
            parentElement.innerHTML = html;
            parentElement.querySelectorAll(".inviter").forEach(btn => {
                btn.onclick = () => callbackFunc(
                    btn.id.split("_")[1], 
                    data.find(user => user.id === socket.id).table
                );
            });
        },
    };
};