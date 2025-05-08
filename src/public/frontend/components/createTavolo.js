const createTable = (parentElement) => {
    let type = '';
    let data = [];
  
    return {
        build: (newType) => { type = newType; },
        setData: (array) => { data = array; },
        clear: () => { parentElement.innerHTML = ''; },
        render: () => {
            const headers = data.length ? Object.keys(data[0]) : [];
            parentElement.innerHTML = `
                <table border="1">
                    <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${data.map(row => 
                            `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            `;
        },
    };
};