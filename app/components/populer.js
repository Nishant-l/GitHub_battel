import React from "react";
import {fetchContent} from '../utils/api';

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
            selectedLanguage:'ALL',
            error:null,
            content:null
        }
        this.isLoding = this.isLoding.bind(this);
    }

    isLoding() {
        return this.state.content === null && this.state.error === null;
    }

    componentDidMount(){
        this.currentButton(this.state.selectedLanguage);
    }

    currentButton=(language)=>{
        this.setState({
            selectedLanguage:language,
            error:null,
            content:null
        })
        fetchContent(language)
                    .then((content) => this.setState({
                        error:null,
                        content:content
                    }))
                    .catch((err) => {
                        console.warn(err);
                        this.setState({
                            err: `error fatching repo ${err}`
                        })
                    })
    }

    render(){
        const { selectedLanguage, content, error} = this.state;
        // console.log(content);
        return(
            <React.Fragment>
                <LanguagesNav 
                    selectedLanguage={selectedLanguage} 
                    currentButton={this.currentButton}
                />
                {this.isLoding() && <p>LOADING...</p>}
                {error && <p>{error}</p>}

                {content && <pre>{JSON.stringify(content,null,2)}</pre>}
            </React.Fragment>
        )
    }
    
}
