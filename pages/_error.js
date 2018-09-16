import React, { Component } from 'react'
import Head from 'next/head';

export default class NotFound extends Component {
  render() {
    return (
        <div className="error">
            <Head>
             <link rel="stylesheet" href="/_next/static/style.css" />
            </Head>
            <h1>404 </h1>
            <h2>Page not found</h2>
        </div>      
    )
  }
}