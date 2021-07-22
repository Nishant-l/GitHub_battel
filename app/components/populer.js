import React from "react";

export default class Popular extends React.Component{

    constructor(props){
        super(props)

        this.state={
            selectedLanguage:'ALL'
        }
    }

    currentButton=(language)=>{
        this.setState({
            selectedLanguage:language
        })
    }

    render(){
        const languages = ['ALL','JavaScript','Ruby','Java','CSS','Python'];

        return(
            <ul className='flex-center'>
                {languages.map((language)=>(
                    <li key={language}>
                        <button className='btn-clear nav-link' style={{color:this.state.selectedLanguage===language?'red':'black'}} onClick={()=>this.currentButton(language)}>
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
    
}
