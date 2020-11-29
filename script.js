const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
});

function calculate() {
    const currencyOneVal = currencyElementOne.value;
    const currencyTwoVal = currencyElementTwo.value;

    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOneVal}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data.rates[currencyTwoVal]);
            const rate = data.rates[currencyTwoVal];
            rateElement.innerText = `${amountElementOne.value} ${currencyOneVal} = ${rate} ${currencyTwoVal}`;

            amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
        });
}

calculate();