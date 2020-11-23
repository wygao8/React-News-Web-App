import React from "react";
import {FaRegBookmark, FaBookmark} from "react-icons/fa";
// class FavoriteMark extends React.Component{
//
//     render() {
//         return(this.props.favorite ? <Icon name={'bookmark'} size={'large'} color={'red'}/> : <Icon name={'bookmark outline'} size={'large'} color={'red'}/>);
//     }
// }

function FavoriteMark(props){
    return(props.favorite ?
        <FaBookmark
            data-tip={'Bookmark'}
            className={'favorite-mark'}
            color={'red'}
            onClick={() => props.onClick()}
        />
    :
        <FaRegBookmark
            data-tip={'Bookmark'}
            className={'favorite-mark'}
            name={'bookmark outline'}
            color={'red'}
            onClick={() => props.onClick()}
        />);
}

export default FavoriteMark;