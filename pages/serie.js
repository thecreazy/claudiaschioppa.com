import React, { Component } from "react";

import Head from "../components/head";
import Transition from "../components/transition";

export default class Serie extends Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://cms.claudiaschioppa.com/api/series/${query.slug}`);
    const json = await res.json();
    return { query, serie : json };
  }
  constructor(props) {
    super(props);
    this.state = {
      transition: "open"
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ transition: "open close" }), 300);
  }
  render() {
    const { transition } = this.state;
    const { query, serie } = this.props;
    return (
      <div className="singleserie">
        <Head title={`Serie - ${serie.name}`}/>
        <div className="singleserie_info">
          <Transition status={transition} color={`#${query.color}`} />
          <h1 style={{
                color: `${serie.color}`
              }}>{serie.name}</h1>
          <div id="description" dangerouslySetInnerHTML={{__html: serie.description}} />
        </div>
        <div className="masonry">
            {serie.images.map((ig, i) => <img key={i} title={ig.name} src={ig.image.secure_url} /> )}
        </div>
      </div>
    );
  }
}
