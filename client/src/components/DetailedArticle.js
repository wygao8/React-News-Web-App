import React from "react";
import {Container, Row, Col, Card} from 'react-bootstrap';
import {FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon, FacebookIcon, TwitterIcon} from 'react-share';
import commentBox from 'commentbox.io';
import qs from 'qs';
import isEmptyObj from "../api/isEmptyObj";
import FavoriteMark from "./FavoriteMark";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css as CSS } from 'glamor';
import Truncate from 'react-truncate';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import ReactTooltip from 'react-tooltip';


const defaultNYTimesImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
const defaultGuardianImgUrl = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';

const overrideLoader = css`
  display: inline-block;
  margin: auto auto;
`;

class DetailedArticle extends React.Component{
    state={maxLine: 6, iconFlipped: false};

    componentDidMount() {
        const queryParams = qs.parse(this.props.pageLocation.search.replace('?', ''));
        const {id} = queryParams;
        this.removeCommentBox = commentBox('5750073610731520-proj', {
            defaultBoxId: id
        });
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.iconFlipped!==prevState.iconFlipped){
            setTimeout(() => {
                window.scrollBy({
                    top: this.state.iconFlipped ? (window.innerHeight)*0.9 : -(window.innerHeight)*0.9,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 50);
        }
    }

    handleClickChevron = () => {
        this.setState((prevState) => ({
            maxLine: (prevState.maxLine===6? Infinity : 6),
            iconFlipped: !prevState.iconFlipped
        }));
    };

    handleClickFavorite = (searchArticleUrl, sharingUrl, imageUrl, title, date, section, apiMode) => {
        if(window.localStorage.getItem(sharingUrl)===null){
            let article = {searchArticleUrl, sharingUrl, imageUrl, title, date, section, apiMode};
            window.localStorage.setItem(sharingUrl, JSON.stringify(article));
            this.setState({});
            let marked = toast('Saving ' + title, {position: 'top-center', bodyClassName: CSS({color: 'black'})});
            setTimeout(() => {toast.dismiss(marked)}, 2000);
        } else {
            window.localStorage.removeItem(sharingUrl);
            this.setState({});
            let unmark = toast("Removing " + title, {position: 'top-center', bodyClassName: CSS({color: 'black'})});
            setTimeout(() => {toast.dismiss(unmark)}, 2000);
        }
        // this.setState((prevState) => ({
        //     favorite:
        // }));
    };

    buildArticlePage = (apiMode, article) => {
        // article.apiMode = apiMode;
        // console.log(article);
        if(this.props.article!==null){
            if(apiMode==='NYTimes'){
                // console.log(multimedia);
                const {news_desk, web_url, headline, pub_date, multimedia, abstract} = article;
                let image = multimedia.find(img => {
                    try {
                        return (img.width>=2000 &&img.url!==null);
                    } catch (e) {
                        return false;
                    }
                });
                const imageUrl = isEmptyObj(image) ? defaultNYTimesImgUrl : "https://www.nytimes.com/" + image.url;
                // const date = pub_date.slice(8,10) + ' ' + month[parseInt(pub_date.slice(5,7))] + ' ' + pub_date.slice(0,4);
                const date = pub_date.slice(0,10);
                let title = '';
                try {
                    title = headline.main;
                } catch (e) {
                    console.log(e);
                }
                return (this.buildArticle(news_desk, web_url, title, web_url, date, imageUrl, abstract, 'NYTimes'));
            } else if(apiMode==='Guardian') {
                const {sectionId, id, webUrl, webTitle, blocks, webPublicationDate} = article;
                let imageUrl = '';
                try{
                    let assets = blocks['main']['elements'][0]['assets'];
                    let asset = Object.values(assets)[Object.keys(assets).length-1];
                    imageUrl = asset.file;
                } catch (e) {
                    imageUrl = defaultGuardianImgUrl;
                    console.log(e);
                }
                // const date = webPublicationDate.slice(8,10) + ' ' + month[parseInt(webPublicationDate.slice(5,7))] + ' ' + webPublicationDate.slice(0,4);
                const date = webPublicationDate.slice(0,10);
                let bodyTextSummary = '';
                try{
                    bodyTextSummary = blocks['body'][0]['bodyTextSummary'];
                } catch (e) {
                    console.log(e);
                }
                return(this.buildArticle(sectionId, id, webTitle, webUrl, date, imageUrl, bodyTextSummary, 'Guardian'));
            }
        } else {
            return null;
        }
    };



    buildArticle = (section, searchArticleUrl, title, sharingUrl, date, imageUrl, description, apiMode) => {
        return(
            <Card fluid={'true'} className={'shadowed-card'}>
                <Card.Body>
                    <Card.Title style={{fontSize: '26px', fontStyle: 'Italic'}}>
                        {title}
                    </Card.Title>
                    <Card.Title style={{fontWeight: 'normal', color: 'black', fontStyle: 'Italic', margin: 0}}>
                        <Container fluid>
                            <Row>
                                <Col sm={10} xs={5}>
                                    {date}
                                </Col>
                                <Col sm={1} xs={5} style={{position: 'relative'}}>
                                    <FacebookShareButton
                                        children={<FacebookIcon size={24} round={true} data-tip={'Facebook'}/>}
                                        url={sharingUrl}
                                        hashtag={'#CSCI_571_NewsApp'}
                                    />
                                    <TwitterShareButton
                                        children={<TwitterIcon size={24} round={true} data-tip={'Twitter'}/>}
                                        url={sharingUrl}
                                        hashtags={['CSCI_571_NewsApp']}
                                    />
                                    <EmailShareButton
                                        children={<EmailIcon size={24} round={true} data-tip={'Email'}/>}
                                        subject={'#CSCI_571_NewsApp'}
                                        url={sharingUrl}
                                    />
                                </Col>
                                <Col sm={1} xs={2} style={{position: 'relative'}}>
                                    <FavoriteMark
                                        favorite={window.localStorage.getItem(sharingUrl)!==null}
                                        onClick={() => this.handleClickFavorite(searchArticleUrl, sharingUrl, imageUrl, title, date, section, apiMode)}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Card.Title>
                </Card.Body >
                <Card.Img style={{paddingRight: '1.25rem', paddingLeft: '1.25rem'}} src={imageUrl}/>
                <Card.Body>
                    <Card.Text>
                        <Truncate lines={this.state.maxLine} ellipsis={<span>...</span>}>
                            {description}
                        </Truncate>
                    </Card.Text>
                    <Card.Text style={{position: 'relative', paddingBottom: '1%', float: 'right'}}>
                        {this.showChevron()}
                    </Card.Text>
                </Card.Body>
                <ReactTooltip/>
            </Card>
        );
    };

    showChevron = () => {
        return(this.state.iconFlipped ? <FaChevronUp style={{float: 'right'}} onClick={this.handleClickChevron}/> : <FaChevronDown style={{float: 'right'}} onClick={this.handleClickChevron}/>);

    };

    buileLoader = (isLoading) => {
        if(isLoading){
            return(
                <Container fluid={'true'} style={{margin:  '24% auto', textAlign: 'center'}}>
                    <BounceLoader
                        css={overrideLoader}
                        size={40}
                        color={"#123abc"}
                        loading={true}
                    />
                    <p>Loading</p>
                </Container>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <Container className={'detailed-article-page'} fluid={'true'}>
                {this.buildArticlePage(this.props.apiMode, this.props.article)}
                {this.buileLoader(this.props.articleLoading)}
                <Container className={'commentbox'} fluid={'true'}/>
                <ToastContainer autoClose={false} transition={Zoom}/>

            </Container>

        );
    }
}

export default DetailedArticle;