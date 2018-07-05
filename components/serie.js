import React, {Component} from 'react'

import { string } from 'prop-types'
import Router from 'next/router'
import Link from 'next/link'

import Transition from './transition'


class Serie extends Component{
    constructor(props){
        super(props)
        this.state = {
            transition: ''
        }
    }
    onClick = (e)=>{
        e.preventDefault()
        this.setState({
            transition: 'open'
        }, ()=>{
            setTimeout(()=>  Router.push(`/serie/${this.props.slug}`), 300)
           
        })
    }
    render(){
        const {color, title, slug} = this.props
        const {transition} = this.state
        return <div prefetch  onClick={this.onClick}>
        <section className="serie">
          <Transition color={color} status={transition} />
          <h3 className="serie__name" style={{
            color: `${color}`
          }}>{title}</h3>
          <div className="serie__images">
          <div className="serie__primary">
              <img className="serie__image" src="https://picsum.photos/350/500" />
          </div>
          <div  className="serie__secondary">
          <div className="animate" data-background={color}>
              <img className="serie__image --left" src="https://picsum.photos/400/300" />
          </div>
          <div className="animate" data-background={color}>
              <img className="serie__image --left" src="https://picsum.photos/300/500" />
              </div>
           </div>
           </div>
            <style jsx>
            {`
              .serie{
                  min-height: 120px;
                  margin: 0px;
                  margin-top: 20px;
                  padding: 0 15px;
                  display:flex;
                  flex-direction: column;
                  cursor: pointer;
                  position: relative;
              }
              .serie .serie__name{
                  margin: 0px
                  margin-top: 20px;
                  font-size: 1.5rem;
                  font-weight: bold;
                  margin-bottom: 0.5em;
                  text-align: center;
                  font-size: 5rem;
                  margin-bottom: 1.25rem;
                  text-transform: capitalize;
              }
              .serie .serie__images{
                  width: 100%;
                  display: flex;
                  justify-content: space-evenly;
                  flex-flow: row wrap;
                  padding-top: 10px;
                  height: 100%;
                  flex-direction: row-reverse;
                  align-items: center;
              }
              .serie .serie__primary, .serie .serie__secondary{
                  display: flex;
                  height: 100%;
                  justify-content: center;
                  width:50%;
              }
              .serie .serie__primary{
                  justify-content: left;
              }
              .serie .serie__secondary{
                  flex-direction: column;
                  justify-content: right;
              }
              .serie .serie__secondary > div{
                  display: flex;
                  align-items: right;
                  margin-bottom: 10px;
              }
              .animate{
                  position: relative;
              }
              .animate:after{
                  position: absolute;
                  content: "";
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  background: attr(data-background)
              }
              .serie .serie__image {
                  margin: 5px;
                  height: 100%;
                  transition: filter 1s;
              }
              .serie .serie__image:hover{
                  filter: grayscale(100%)
              }
              .serie .serie__image.--left{
                  margin-left: auto;
              }
              }
            `}
            </style>
        </section>
        </div>
    }
}

Serie.propTypes = {
  color: string,
  images: string,
  title: string,
  slug: string
}

export default Serie
