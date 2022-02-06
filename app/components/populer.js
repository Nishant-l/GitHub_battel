import React from "react";
import {fetchContent} from '../utils/api';
import PropType from 'prop-type';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

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

function ContentGrid ({content}) {
    return(
        <ul className="grid space-around">
            {content.map((item,index) => {
                const {name, owner, html_url, stargazers_count, forks, open_issues } = item;
                const { login, avatar_url } = owner;

                return(
                    <li key={html_url} className="repo bg-light">
                        <h4 className="header-lg center-text">
                            #{index+1}
                        </h4>
                        <img
                            className="avatar"
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
                        />
                        <h2 className="center-text">
                            <a className="link" href={html_url}>{login}</a>
                        </h2>
                        <ul className="card-list">
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22}/> 
                                <a href={`https://github.com/${login}`}>
                                    {login}
                                </a> 
                            </li>
                            <li>
                                <FaStar color="rgb(255,215,0)" size={22}/>
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color="rgb(129,195,245)" size={22}/>
                                {forks.toLocaleString()} forks 
                            </li>
                            <li>
                                <FaExclamationTriangle color="rgb(241,138,147)" size={22}/>
                                {open_issues.toLocaleString()} open
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

ContentGrid.propType = {
    content: PropType.array
}

export default class Popular extends React.Component{

    constructor(props){
        super(props)

        this.state={
            selectedLanguage:'ALL',
            error:null,
            content:{}
        }
        this.isLoding = this.isLoding.bind(this);
    }

    isLoding() {
        const{selectedLanguage,error,content} = this.state;
        return  !content[selectedLanguage] && error === null;
    }

    componentDidMount(){
        this.currentButton(this.state.selectedLanguage);
    }

    currentButton=(language)=>{
        this.setState({
            selectedLanguage:language,
            error:null,
        })

        if(!this.state.content[language]){
            fetchContent(language)
                        .then((data) => {
                            this.setState(({content}) => ({
                                content: {
                                    ...content,
                                    [language]: data
                                }
                            }))
                        })
                        .catch((err) => {
                            console.warn(err);
                            this.setState({
                                err: `error fatching repo ${err}`
                            })
                        })
        }                    
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

                {content[selectedLanguage] && <ContentGrid content={content[selectedLanguage]}/>}
            </React.Fragment>
        )
    }
    
}
