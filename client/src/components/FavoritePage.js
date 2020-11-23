import React from "react";
import {Row, Container} from 'react-bootstrap';
import ShareModal from "./ShareModal";
import NewsCard from "./NewsCard";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {css as CSS} from "glamor";

class FavoritePage extends React.Component{

    state={title: '', sharingUrl: '', show: false};

    handleClose = () => this.setState({show: false});

    handleClickShare = (title, sharingUrl) => {
        this.setState({title, sharingUrl, show: true});
    };

    handleClickDelete = (sharingUrl, title) => {
        window.localStorage.removeItem(sharingUrl);
        this.setState({});
        let unmark = toast("Removing " + title, {position: 'top-center', bodyClassName: CSS({color: 'black'})});
        setTimeout(() => {toast.dismiss(unmark)}, 2000);
    };

    buildCards = () => {
        const storage = window.localStorage;
        const numArr = Array.from(Array(storage.length).keys());
        const validNumArr = numArr.filter(index => {
            return(storage.key(index)!=='apiMode');
        });
        console.log(numArr);
        console.log(storage);
        console.log(validNumArr);
        let cards = validNumArr.map(index => {
            let article = JSON.parse(storage.getItem(storage.key(index)));
            console.log(article);
            let {searchArticleUrl, sharingUrl, imageUrl, title, date, section, apiMode} = article;
            return (
                <NewsCard
                    favorite={true}
                    searchArticleUrl={searchArticleUrl}
                    sharingUrl={sharingUrl}
                    imageUrl={imageUrl}
                    title={title}
                    date={date}
                    section={section}
                    apiMode={apiMode}
                    handleClickShare={this.handleClickShare}
                    handleClickDelete={this.handleClickDelete}
                    onClickArticle={this.props.onClickArticle}
                />
            );
        });
        return cards;
    };

    buildFavorites = () => {
        if(window.localStorage.length===0 || (window.localStorage.length===1 && window.localStorage.getItem('apiMode')!==null)){
            return(
                <p style={{fontSize: '30px', fontStyle: 'bold', textAlign: 'center', marginTop: '2%'}}>You have no saved articles.</p>
            );
        } else {
            return(
                <>
                    <p className={'page-title'}>Favorites</p>
                    <Row xs={1} sm={4} >
                        {this.buildCards()}
                    </Row>
                </>
            );
        }
    };

    render() {
        return(
            <Container fluid={'true'} style={{paddingLeft: '15px', paddingRight: '15px'}}>
                {this.buildFavorites()}
                <ShareModal
                    show={this.state.show}
                    title={this.state.title}
                    sharingUrl={this.state.sharingUrl}
                    onClose={this.handleClose}
                />
                <ToastContainer autoClose={false} transition={Zoom}/>
            </Container>
        );
    }

}

export default FavoritePage;