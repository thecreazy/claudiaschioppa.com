import React, {Component} from 'react'

import Head from '../components/head'
import Transition from '../components/transition'

export default class Serie extends Component{
    constructor(props){
        super(props)
        this.state = {
            transition: 'open'
        }
    }
    componentDidMount(){
        setTimeout(()=>this.setState({transition:'open close'}), 300)
        
    }
    render(){
        const {transition} = this.state
        console.log(transition)
       return <div>
       <Head title="Serie" />
       <Transition status={transition} color={'#ce4841'}/>
   
       <style jsx>{`
         }
       `}</style>
       <style jsx global>
       {`
       body{
         border: 25px solid #000000;
         border-top: 0px;
         border-width: 0 25px;
         border-image: url(https://res.cloudinary.com/dgv71mms7/image/upload/v1530825657/border.png) 30 round;
         padding: 20px;
         margin: 0px;
         min-height: 99vh;
         font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
       }
       `}
       </style>
     </div>
    }
}

  
