// import * as React from 'react'
import React from "react";

export default class Popular extends React.Component{
    render(){
        const languages = ['ALL','JavaScript','Ruby','Java','CSS','Python'];

        return(
            <ul className='flex-center'>
                {languages.map((language)=>(
                    <li key={language}>
                        <button className='btn-clear nav-link'>
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
    
}
