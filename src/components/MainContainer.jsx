import React, { useState, useEffect } from 'react'
import { FaCopy } from 'react-icons/fa'

const MainContainer = () => {
    const [charLength, setCharLength] = useState(0)
    const [upperCased, setUpperCased] = useState(null)
    const [lowerCased, setLowerCased] = useState(false)
    const [includeNum, setIncludeNum] = useState(false)
    const [includeSym, setIncludeSym] = useState(false)
    const [strength, setStrength] = useState(0)
    const [password, setPassword] = useState('p4$$w0Rd')

    const handleCharLength = e => {
        setCharLength(e.target.value)
    }

    useEffect(() => {
        setCharLength(1)
        setUpperCased(true)
    }, [])

    // for checkboxes
    const handleOptions = e => {
        if (e.target.id === 'upper'){
            setUpperCased(e.target.checked)
        }
        if (e.target.id === 'lower'){
            setLowerCased(e.target.checked)
        }
        if (e.target.id === 'number'){
            setIncludeNum(e.target.checked)
        }
        if (e.target.id === 'symbol'){
            setIncludeSym(e.target.checked)
        }
    }

    // generation
    const generation = (e) => {
        e.preventDefault()
        const upperChars = 'ABCDEFGHOJKLMNOPQRSTUVWXYZ'
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
        const numbersChars = '1234567890'
        const symbolChars = '!@#$%^&*'

        let enabledOption = ''

        upperCased ? enabledOption += upperChars : enabledOption
        includeNum ? enabledOption += numbersChars : enabledOption
        lowerCased ? enabledOption += lowerChars : enabledOption
        includeSym ? enabledOption += symbolChars : enabledOption

        let result = ''
        for (let a = 0; a < charLength; a++){
            result += enabledOption[Math.floor(Math.random() * enabledOption.length)]
        }

        if (result.length < 6){ // 6-
            setStrength(0)
        }
        if (result.length > 5 && result.length < 11){ // 6 - 10
            setStrength(1)
        }
        if (result.length > 10 && result.length < 16){ // 11-15
            setStrength(2)
        }
        if (result.length > 15){ // 16+
            setStrength(3)
        }

        setPassword(result)
    }

    return (
        <main className='absolute font-mono top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px]'>
            <h1 className='text-center text-xl py-3 font-bold'>Password Generator</h1>
            <form onSubmit={generation}>
                <div className="bg-gray-700 mx-7 my-1 py-4 px-5 flex flex-row">
                    <div className='result overflow-auto w-full mr-1 text-lg '>
                        <p>{password}</p>
                    </div>
                    <div className='w-fit flex justify-center ml-1 items-center'>
                        <p className='text-lg'><FaCopy /></p>
                    </div>
                </div>
                <div className="bg-gray-700 mx-7 my-2 pb-2">
                    <div className='px-5 pt-4'>
                        <div className='flex flex-row justify-between items-center mb-2'>
                            <p>Character Length</p>
                            <p className='text-lg font-bold'>{charLength}</p>
                        </div>
                        <div className='mx-6'>
                            <input type="range" value={charLength} onChange={handleCharLength} min='1' max='20' className='w-full ' name="length" id="length" />
                        </div>
                        
                    </div>
                    <div className='px-5 py-4'>
                        <div className='flex flex-row mb-2 items-center'>
                            <input type="checkbox" onChange={handleOptions} id='upper' checked />
                            <label htmlFor="upper" className='ml-3'>Include Uppercase Letters</label>
                        </div>
                        <div className='flex flex-row mb-2 items-center'>
                            <input type="checkbox" onChange={handleOptions} id='lower' />
                            <label htmlFor="lower" className='ml-3'>Include Lowercase Letters</label>
                        </div>
                        <div className='flex flex-row mb-2 items-center'>
                            <input type="checkbox" onChange={handleOptions} id='number' />
                            <label htmlFor="number" className='ml-3'>Include Numbers</label>
                        </div>
                        <div className='flex flex-row mb-2 items-center'>
                            <input type="checkbox" onChange={handleOptions} id='symbol' />
                            <label htmlFor="symbol" className='ml-3'>Include Symbols</label>
                        </div>
                    </div>
                    <div className='flex flex-row px-4 justify-between items-center'>
                        <p>Strength</p>
                        <div className='flex flex-row'>
                            <div className={((strength > 0) ? 'bg-blue-500' : '') + ' w-[6px] h-[20px] mr-1 border rounded-sm'}></div>
                            <div className={((strength > 1) ? 'bg-blue-500' : '') + ' w-[6px] h-[20px] mr-1 border rounded-sm'}></div>
                            <div className={((strength > 2) ? 'bg-blue-500' : '') + ' w-[6px] h-[20px] mr-1 border rounded-sm'}></div>
                        </div>
                    </div>
                    <div className='py-3 px-5'>
                        <button type='submit' className='bg-green-500 py-2 w-full'>Generate</button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default MainContainer