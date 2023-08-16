import React from 'react'
import './body.css'
import html2canvas from "html2canvas"

function Body(){
    const [memes, setMemes] = React.useState({
        topText: "",
        bottomText: "",
        url:"https://i.imgflip.com/30b1gx.jpg"
    })
    const [memesData, setMemsData] = React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data=>setMemsData(data.data.memes))
    },[])

    function handleClick(){
        let random = Math.floor(Math.random() * memesData.length)
        let randomUrl = memesData[random].url
        setMemes(prevMemes=>{
                return{
                    ...prevMemes,
                    url: randomUrl
                }

        })
         
    }
function handleChnage(event){
    let {name, value} = event.target
    setMemes(preM => {
        return{
            ...preM,
            [name] : value
        }
        
    })
}
const containerRef = React.useRef(null);
function convertToPng(){   
    let container = document.querySelector('.meme');
    html2canvas(container,{
        allowTaint: true,
        useCORS: true,
    }).then((canvas)=>{
        const imag = canvas.toDataURL("image/png");
        let ancor = document.createElement('a');
        ancor.setAttribute("href",imag);
        ancor.setAttribute("download", "my-image.png");
        ancor.click();
        ancor.remove();
    })

}         
// const convertToPng = async () => {
//     const canvas = await html2canvas(document.querySelector(".memsBody"));
//     const dataURL = canvas.toDataURL('image/png');
//     downloadjs(dataURL, 'download.png', 'image/png');
//   };

    console.log(memesData)
    return(
        <div className='memsBody' ref={containerRef}>
            <div>
                <input 
                    type="text"
                    name = "topText"
                    placeholder='Top text'
                    onChange={handleChnage}
                />
                <input 
                    type="text" 
                    name = "bottomText"
                    placeholder='bottom text'
                    onChange={handleChnage}
                />
                
            </div>
            <button onClick={handleClick}>Genertrate</button>
            <div className='meme'>
                <img src={memes.url} alt="" className="memeimage"/>
                <div className='memetext'>
                    <h2 className="meme--text top">{memes.topText}</h2>
                    <h2 className="meme--text bottom" >{memes.bottomText}</h2>
                </div>
            </div>
            <button onClick={convertToPng} className="memeButton">Dowlode</button>

        </div>
    )
}

export default Body