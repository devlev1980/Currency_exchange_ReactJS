import React from 'react';

function CurrencyRow({currencyOptions,selectedCurrency,onSelectCurrencyOption,amount,onChangeAmount}) {
    return (
        <div>
            <input type="number" className='input' value={amount} onChange={onChangeAmount}/>
            <select name="countries" id="" value={selectedCurrency} onChange={onSelectCurrencyOption}>
                {currencyOptions.map((option)=>
                    <option key={option} value={option} >{option}</option> )}
            </select>
        </div>
    );
}

export default CurrencyRow;
