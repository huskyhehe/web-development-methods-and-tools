const button = document.querySelector('.submit');
let count = 0;

button.addEventListener('click', (e) => {
    e.preventDefault();
    count += 1;
    for (let i = 0; i < 20000; i ++) {
        console.log("this is " + count + " round.")
        console.log(i);
    }
});
