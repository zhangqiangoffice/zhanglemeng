import React, { Component }from 'react'
import Paper from './Paper'

class PaperList extends Component {
  render() {
    let listShows = this.props.paperList.map((paper, index) => {
      return (
        <Paper key={paper._id} paper={paper}/>
      )
    });

    return (
      <ul className="paper_list" onWheel={this.props.isAsking ? null : this.props.onCheckMore}> 
        {listShows} 
      </ul>
    )
  }
}

export default PaperList