const generateList = (parentElement) => {
  let format = '';
  let data = [];

  return {
    build: (fmt) => { format = fmt; },
    setData: (array) => { data = array; },
    clear: () => { parentElement.innerHTML = ''; },
    render: () => {
      parentElement.innerHTML = data.map(item => `<li>${format}: ${item}</li>`).join('');
    },
  };
};