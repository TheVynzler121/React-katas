import React, { useState } from 'react';

function AddSub() {
    const [counter, setCounter] = useState(0);

    console.log("Rendering", counter);


    const add = () => {
        console.log("clicked plus!");
        setCounter(counter + 1);
    };

    const sub = () => {
        console.log("clicked minus!");
        setCounter(counter - 1);
    };

    return (
        <>
            {counter}
            <p>
                <button className="add" onClick={() => add()}>Add</button>
                <button className="sub" onClick={() => sub()}>Subtract</button>
            </p>
        </>
    );
}

export default AddSub;