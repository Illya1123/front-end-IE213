import React from 'react'


const QuantitySelector = (
    {
        className = '',
        value = 0, setValue = () => {
    }
    }
) => {

    /**
     * handle plus
     *
     * @type {(function(): void)|*}
     */
    const handlePlus = React.useCallback(() => {
        setValue(++value)
    }, [setValue, value])

    /**
     * handle minus
     *
     * @type {(function())|*}
     */
    const handleMinus = React.useCallback(() => {
        setValue(value ? Math.max(--value, 0) : 0)
    }, [setValue, value])


    return <>
        <div className={`d-flex gap-1 ${className}`}>
            <button type='button' className='btn btn-outline-secondary p-1' onClick={handleMinus}>
                <div className='bi-dash' style={{lineHeight: '1rem'}}></div>
            </button>
            <input type="number" disabled style={{maxWidth: '3rem', lineHeight: '1rem'}} className='text-center' value={value}
                   onChange={({target: {value}}) => setValue?.(+value)} />
            <button type='button' className='btn btn-outline-secondary p-1'
                    onClick={handlePlus}>
                <div className='bi-plus' style={{lineHeight: '1rem'}}></div>
            </button>
        </div>
    </>
}

export default QuantitySelector