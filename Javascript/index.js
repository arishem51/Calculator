function App() {
    const query = params => document.querySelector(params);
    const input = query('#numberPeople')
    const checkValidate = () => {
        if (input.value === '' || input.value == 0) {
            query('.input2').style.borderColor = 'red'
            query('#errorPeople').innerText = 'Can not be zero'
            query('#buttonReset').style.opacity = '.3'
            query('#buttonReset').style.cursor = 'not-allowed'
            query('#buttonReset').disabled = true;
        } else {
            const number = /^[0-9]+$/;
            if (number.test(input.value)) {
                query('#errorPeople').innerText = ''
                query('.input2').style.borderColor = 'hsl(172, 67%, 45%)'
                query('#buttonReset').style.opacity = '1'
                query('#buttonReset').style.cursor = 'pointer'
                query('#buttonReset').disabled = false;
                calculate();
            } else {
                query('#errorPeople').innerText = 'Is not a number'
                query('.input2').style.borderColor = 'red'
                query('#buttonReset').style.opacity = '.3'
                query('#buttonReset').style.cursor = 'not-allowed'
                query('#buttonReset').disabled = true;
            }
        }
    }
    const chooseTip = () => {
        const inputItem = [...document.querySelectorAll('.inputItem')];
        const customItem = document.querySelector('.inputItem:last-child')
        // const newInputItem = inputItem.splice(0,inputItem.length-1);
        inputItem.forEach(item => {
            item.addEventListener('click', () => {
                inputItem.forEach(input => input.classList.remove('activeItem'));
                item.classList.toggle('activeItem')
                calculate();
            })
        })

        customItem.addEventListener('click', () => {
            inputItem.forEach(input => input.classList.remove('activeItem'));
            customItem.readOnly = false;
            customItem.classList.toggle('activeItem')
            const number = /^[0-9]+$/;
            customItem.addEventListener('change', () => {
                if (number.test(customItem.value)) {
                    calculate();
                } else {
                    customItem.value = '';
                }
            })
        })
    }
    const calculate = () => {
        const billInput = query('#billInput');
        const tip = [...document.querySelectorAll('.inputItem')].filter(item => item.classList.contains('activeItem'));
        const peopleInput = query('#numberPeople')
        const number = /^[0-9]+$/;

        if (billInput.value && tip[0]?.value && peopleInput.value) {
            let tipValue = tip[0]?.value;
            let flag = true;
            if (!number.test(billInput.value)) {
                flag = false
            }
            if (!number.test(peopleInput.value)) {
                flag = false
            }
            if (tipValue.includes('%')) {
                tipValue = tipValue.slice(0, tipValue.length - 1)
                if (!number.test(tipValue)) {
                    flag = false
                }
            } else {
                if (!number.test(tipValue)) {
                    flag = false
                }
            }
            if(flag){
               let total = billInput.value * peopleInput.value;
               const tip = tipValue/100 * total;
               total -= tip;
               query('#tip').innerText = tip.toFixed(2);
               query('#total').innerText = total.toFixed(2);
            }
        }
    }

    const resetApp = ()=>{
        query('#billInput').value = '';
        query('#numberPeople').value = '';
        [...document.querySelectorAll('.inputItem')].forEach(item => item.classList.remove('activeItem'));
        [...document.querySelectorAll('.inputItem')][5].value = '';
        query('#tip').innerHTML = `<i class="fa fa-dollar-sign"></i>0.00`;
        query('#total').innerHTML = `<i class="fa fa-dollar-sign"></i>0.00`;
        query('#buttonReset').readOnly = true;
        query('#buttonReset').style.opacity = '.3';
        query('#buttonReset').style.cursor = 'not-allowed';

    }

    query('#buttonReset').addEventListener('click',resetApp);
    query('#billInput').addEventListener('change', calculate);
    input.addEventListener('change', checkValidate)
    chooseTip();
    
}



App();
