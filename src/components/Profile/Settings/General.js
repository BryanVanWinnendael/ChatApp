import React,{useRef,useState} from 'react'
import Alert from '@mui/material/Alert';

function General() {
    const colorRef = useRef()
    const [colorValue,setColorValue] = useState(localStorage.getItem("color")?localStorage.getItem("color"):"#90B8F8")
    const [success,setSuccess] = useState()



    function changeChatColor(){
        localStorage.setItem("color",colorRef.current.value)
        setSuccess('Chat color changed succesfully')
    }

    function changeColor(){
        setColorValue(colorRef.current.value)
    }

    function resetChatColor(){
        localStorage.removeItem("color")
        setColorValue("#90B8F8")
        setSuccess('Chat color reset succesfully')
    }

    


    return (
    <div>
        <h1 className='text-lg font-bold'>General</h1>
        <div >
            
            {success && (
                <Alert severity="success">{success}</Alert>
            )}
           
            <div className='flex items-center '>
                <p className='mr-2'>Chat Color:</p>
                <input type="color" ref={colorRef} value={colorValue} onChange={changeColor}/>
                <button onClick={changeChatColor} className='bg-[#90B8F8] h-8 rounded-md text-white m-4 hover:bg-[#7396cf] p-1'>Change</button>
                <button onClick={resetChatColor} className='bg-[#90B8F8] h-8 rounded-md text-white  hover:bg-[#7396cf] p-1 '>Reset</button>
            </div>
           

        </div>
    </div>
    )
}

export default General