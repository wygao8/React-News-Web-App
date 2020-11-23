import React from "react";
import {FaRegBookmark, FaBookmark} from "react-icons/fa";
import {Link} from "react-router-dom";
import ReactTooltip from "react-tooltip";

class FavoriteLink extends React.Component {
    render() {
        return (
                <span className={'favorite-link'}>
                    <Link to={'/favorites'} >
                        {this.props.favorite ? <FaBookmark color={'whitesmoke'} data-tip={'Bookmark'} data-for={'favorite-link'}/> : <FaRegBookmark color={'whitesmoke'} data-tip={'Bookmark'} data-for={'favorite-link'}/>}
                    </Link>
                    <ReactTooltip id={'favorite-link'} place={'bottom'}/>
                </span>
            );
    }
}

export default FavoriteLink;