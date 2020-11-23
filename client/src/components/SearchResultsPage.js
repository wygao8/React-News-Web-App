import React from "react";
import isEmptyObj from "../api/isEmptyObj";
import ShareModal from "./ShareModal";
import {Row, Container} from 'react-bootstrap';
import NewsCard from "./NewsCard";


const isValidCardNews = (newsFiledArr) => {
    for(let i = 0; i<newsFiledArr.length; i++){
        if(newsFiledArr[i]==='' || newsFiledArr[i]===null || newsFiledArr[i]==='null'){
            return false;
        }
    }
    return true;
};

const defaultNYTimesImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
const defaultGuardianImgUrl = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';




class SearchResultsPage extends React.Component{

    state={title: '', sharingUrl: '', show: false};
    handleClose = () => this.setState({show: false});
    handleClickShare = (title, sharingUrl) => {
        this.setState({title, sharingUrl, show: true});
    };

    componentWillUnmount(): void {
        this.props.clearSearchBar();
    }

    buildCard = (sharingUrl, searchArticleUrl, onClickArticle, title_webTitle, imageUrl, date, section) => {
        return (
            <NewsCard
                key={sharingUrl}
                favorite={false}
                searchArticleUrl={searchArticleUrl}
                sharingUrl={sharingUrl}
                imageUrl={imageUrl}
                title={title_webTitle}
                date={date}
                section={section}
                handleClickShare={this.handleClickShare}
                onClickArticle={onClickArticle}
            />
        );
    };


    mapNewsGrid = (newsArr, apiMode, onClickArticle) => {
        if(apiMode==='NYTimes'){
            return(
                newsArr.filter(({web_url, headline, pub_date, news_desk}) => {
                    let title='';
                    try{
                        title = headline.main;
                    } catch (e) {
                        return false;
                    }
                    return isValidCardNews([web_url, title, pub_date, news_desk]);
                }).map(({web_url, multimedia, headline, pub_date, news_desk}) => {
                    let imageUrl ='';
                    let media = {};
                    try{
                        media = multimedia.find(img => {
                            return (img.url!==null && img.width >= 2000);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        imageUrl = isEmptyObj(media) ? defaultNYTimesImgUrl : media.url;
                    } catch (e) {
                        imageUrl = defaultNYTimesImgUrl;
                        console.log(e);
                    }
                    imageUrl = imageUrl===defaultNYTimesImgUrl ? defaultNYTimesImgUrl : "https://www.nytimes.com/"+imageUrl;
                    let title ='';
                    try{
                        title = headline.main;
                    } catch (e) {

                    }
                    return (this.buildCard(web_url, web_url, onClickArticle, title, imageUrl, pub_date.slice(0,10), news_desk));
                })
            );
        } else {
            return (
                newsArr.filter(({webUrl, id, webTitle, webPublicationDate, sectionId}) => {
                    return isValidCardNews([webUrl, id, webTitle, webPublicationDate, sectionId]);
                }).map(({webUrl, id, webTitle, blocks, webPublicationDate, sectionId}) => {
                    let image={};
                    try{
                        let assets = blocks['main']['elements'][0]['assets'];
                        image = Object.values(assets)[Object.keys(assets).length - 1];
                    } catch (e) {
                        console.log(e);
                    }
                    let imageUrl = defaultGuardianImgUrl;
                    try {
                        imageUrl = isEmptyObj(image) ? defaultGuardianImgUrl : image.file;
                    } catch (e) {
                        console.log(e);
                    }
                    return (this.buildCard(webUrl, id, onClickArticle, webTitle, imageUrl, webPublicationDate.slice(0,10), sectionId));
                })
            );
        }
    };



    render() {
        if(this.props.cardNewsArray!==null && (this.props.apiMode==='NYTimes' || this.props.apiMode==='Guardian')){
            return(
                <Container fluid={true}>
                    <p className={'page-title'}>Results</p>
                    <Row xs={1} sm={4} >
                        {this.mapNewsGrid(this.props.cardNewsArray, this.props.apiMode, this.props.onClickArticle)}
                    </Row>
                    <ShareModal
                        show={this.state.show}
                        title={this.state.title}
                        sharingUrl={this.state.sharingUrl}
                        onClose={this.handleClose}
                    />
                </Container>
            );
        } else {
            return null;
        }
    }
}

// const callCardNewsApi = async (keyword, apiMode) => {
//     let res = await searchCardNews.get(apiMode + '/' + keyword);
//     if(apiMode === 'NYTimes'){
//         return JSON.parse(res.data.body).response.docs;
//     } else {
//         return JSON.parse(res.data.body).response.results;
//     }
// };

// const path2Keyword = (pathname) => {
//     return pathname.replace('/search?q=', '');
// };
// callCardNewsApi = async (keyword) => {
//     let res = await searchCardNews.get(this.state.apiMode + '/' + keyword);
//     if(this.state.apiMode === 'NYTimes'){
//         return JSON.parse(res.data.body).response.docs;
//     } else {
//         return JSON.parse(res.data.body).response.results;
//     }
// };

// componentWillReceiveProps(nextProps, nextContext) {
//     console.log('componentreceivenews');
//     callCardNewsApi( path2Keyword(this.props.pathname), nextProps.apiMode).then(res => {
//         console.log(res);
//         this.setState({cardNewsArray: res});
//     });
// }

export default SearchResultsPage;