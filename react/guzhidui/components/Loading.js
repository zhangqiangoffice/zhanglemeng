import React, {Component} from 'react';

class Loading extends Component {

    render() {
        if (!this.props.isLoading) {
            return null;
        }

        return (
            <div className="loading">
                <img src='/static/img/public/loading.gif' />
            </div>
        );
    };
}

export default Loading