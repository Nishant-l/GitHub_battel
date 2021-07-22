import React from "react";

function LanguagesNav({selectedLanguage,currentButton}){
    const languages = ['ALL','JavaScript','Ruby','Java','CSS','Python'];

        return(
            <ul className='flex-center'>
                {languages.map((language)=>(
                    <li key={language}>
                        <button 
                            className='btn-clear nav-link' 
                            style={{color:selectedLanguage===language?'red':'black'}} 
                            onClick={()=>currentButton(language)}>
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
}

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
        return(
            <React.Fragment>
                <LanguagesNav 
                    selectedLanguage={this.state.selectedLanguage} 
                    currentButton={this.currentButton}
                />
            </React.Fragment>
        )
    }
    
}
