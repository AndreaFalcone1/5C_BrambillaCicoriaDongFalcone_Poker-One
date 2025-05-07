const generateNavbar = (parentElement) => {
  let configuration = {};
  let callback = () => {};

  return {
    build: (type) => { configuration.type = type; },
    onClick: (cb) => { callback = cb; },
    render: () => {
      parentElement.innerHTML = Object.keys(configuration).map(key => 
        `<button class="nav-btn" data-key="${key}">${key}</button>`
      ).join('');
      document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.onclick = () => callback(btn.dataset.key);
      });
    },
  };
};
