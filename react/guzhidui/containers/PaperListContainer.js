import { connect } from 'react-redux'
import { askMorePapers } from '../actions'
import PaperList from '../components/PaperList'

const mapStateToProps = state => ({
  paperList: state.paperList,
  isAsking: state.isAsking,
})

const mapDispatchToProps = (dispatch) => ({
  onCheckMore: () => {
    console.log(123);
    function getOffset(Node, offsetTop) {
        if (!offsetTop) {
            offsetTop = 0;
        }
        if (Node == document.body) {//当该节点为body节点时，结束递归
            return offsetTop;
        }
        offsetTop += Node.offsetTop;
        return getOffset(Node.offsetParent, offsetTop);//向上累加offset里的值
    }
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    let top = getOffset(document.getElementById('anchor'))
    let distance = top - height - 150
    if (scrollTop > distance) {
      dispatch(askMorePapers())
    }
  }
})

const PaperListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaperList)

export default PaperListContainer
