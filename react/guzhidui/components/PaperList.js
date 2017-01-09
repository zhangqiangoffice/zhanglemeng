import React from 'react'
import Paper from './Paper'

const PaperList = ({paperList, isAsking, onCheckMore}) => (
  <ul className="paper_list" onClick={onCheckMore}>
    {paperList.map(paper =>
      <Paper
        key={paper._id}
        paper={paper} />
    )}
  </ul>
)

export default PaperList