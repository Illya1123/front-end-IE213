import './counter.scss';
import { useState } from "react";

const Counter = () =>{
    const [count, setCount] = useState(1);
    return (
        <div 
            style={{
                border: 'solid 1px rgba(0,0,0, 0.15)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}
        >
            <button 
                style={{
                    width: '2.8em',
                    height: '2.5em',            
                    border: 'none',
                    borderRight: 'solid 1px rgba(0,0,0, 0.15)',
                    backgroundColor: 'white',
                    fontWeight: '800'
                }}
                onClick={() => setCount(count - 1)} 
                disabled={ count <= 0 }
            >
                <i className="bi bi-dash"></i>
            </button>
            <input
                style={{
                    width: '4em',
                    height: '2.5em',
                    border: 'none',
                    textAlign: 'center'
                }} 
                type="number" 
                value={count}
                onChange={(event)=> {}}
            />
            <button 
                style={{
                    width: '2.8em',
                    height: '2.5em',
                    border: 'none',
                    borderLeft: 'solid 1px rgba(0,0,0, 0.15)',
                    backgroundColor: 'white',
                    fontWeight: '800'
                }}
                onClick={() => setCount(count + 1)}
                disabled={ count >= 10 }
            >
                <i className="bi bi-plus"></i>
            </button>
        </div>
    )
}

export default Counter;