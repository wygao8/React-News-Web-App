import React from "react";
import isEmptyObj from "../api/isEmptyObj";
import ShareModal from "./ShareModal";
import {FaShareAlt} from "react-icons/fa";
import {Card, Col, Row, Container} from 'react-bootstrap';
import SectionLabel from "./SectionLabel";
import Truncate from 'react-truncate';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const defaultNYTimesImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
const defaultGuardianImgUrl = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';

const overrideLoader = css`
  display: inline-block;
  margin: auto auto;
`;

const isValidTabNews = (newsFieldArr) =>  {
    for(let i = 0; i<newsFieldArr.length; i++){
        if(newsFieldArr[i] === '' || newsFieldArr[i] === null || newsFieldArr[i] === 'null'){
            return false;
        }
    }
    return true;
};

class SectionNewsPage extends React.Component{
    state={title: '', sharingUrl: '', show: false};

    handleClose = () => this.setState({show: false});
    handleClickShare = (title, sharingUrl) => {
        this.setState({title, sharingUrl, show: true});
    };

    mapNewsList = (tabNewsArr, apiMode, onClickArticle) => {
        if(apiMode==='NYTimes') {
            return (
                tabNewsArr.slice(0,10).filter(({section, title, abstract, url, published_date}) => {
                    return isValidTabNews([section, title, abstract, url, published_date]);
                }).map(({section, title, abstract, url, published_date, multimedia}) => {
                    let image = {};
                    let imageUrl = '';
                    const date = published_date.slice(0,10);
                    try{
                        for(let i = 0; i < multimedia.length; i++){
                            if(multimedia[i].width >= 2000 && multimedia[i].url!==null && multimedia[i].url!=='null' && isEmptyObj(image) && multimedia[i].type === 'image') {
                                image = multimedia[i];
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    if(isEmptyObj(image)) {
                        imageUrl = defaultNYTimesImgUrl;
                    } else {
                        imageUrl = image.url;
                    }
                    return (this.buildTabNewsList(url, section, title, abstract, url, date, imageUrl, onClickArticle));
                })
            );
        } else {
            return(
                tabNewsArr.filter(({webUrl, sectionId, webTitle, blocks, id, webPublicationDate}) => {
                    let bodyTextSummary = '';
                    try{
                        bodyTextSummary = blocks['body'][0]['bodyTextSummary'];
                    } catch (e) {
                        return false;
                    }
                    return isValidTabNews([webUrl, sectionId, webTitle, bodyTextSummary, id, webPublicationDate]);
                }).map(({webUrl, sectionId, webTitle, blocks, id, webPublicationDate}) => {
                    //bodyTextSummary already checked by filter
                    const bodyTextSummary = blocks['body'][0]['bodyTextSummary'];
                    const date = webPublicationDate.slice(0,10);
                    let image = {};
                    // console.log(blocks);
                    try {
                        if(blocks['main']['elements'][0]['assets'] !== null){
                            let assets = blocks['main']['elements'][0]['assets'];
                            image = Object.values(assets)[Object.keys(assets).length-1];
                        }
                    } catch (e) {

                    }
                    let imageUrl = '';
                    if(isEmptyObj(image)|| image === undefined || image.file === null || image.file === 'null') {
                        imageUrl = defaultGuardianImgUrl;
                    } else {
                        imageUrl = image.file;
                    }
                    return (this.buildTabNewsList(webUrl, sectionId, webTitle, bodyTextSummary, id, date, imageUrl, onClickArticle));
                })
            );
        }
    };

    buildTabNewsList = (sharingUrl, section, title, abstract, url_id, date, imageUrl, onClickArticle) => {
        return(
            <Col className={'section-news-col'} key={sharingUrl} >
                <Card fluid={'true'} className={'shadowed-card'} onClick={() => onClickArticle(url_id)}>
                    <Row xs={1} sm={2}>
                        <Col xs={12} sm={3} >
                            <Container fluid={true} style={{padding: '5%'}}>
                                <Container fluid={true} style={{border: '1px solid rgba(0, 0, 0, 0.2)', padding: '2px 2px'}}>
                                    <Card.Img className={'card-image'} src={imageUrl}/>
                                </Container>
                            </Container>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Card.Body>
                                <span className={'card-title'}>{title + '  '}</span>
                                <FaShareAlt className={'card-icon'} onClick={(event) => {event.stopPropagation(); this.handleClickShare(title, sharingUrl);}}/>
                            </Card.Body>
                            <Card.Body className={'section-news-description'}>
                                <Card.Text fluid={'true'}>
                                    <Truncate lines={3} ellipsis={<span>...</span>}>
                                        {abstract}
                                    </Truncate>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body >
                                <span className={'card-date'}>{date}</span>
                                <SectionLabel section={section} size={'1em'}/>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
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
        if(this.props.tabNewsArray !== null && (this.props.apiMode==='NYTimes' || this.props.apiMode==='Guardian') && !this.props.sectionLoading) {
            return (
                <Container fluid={'true'} >
                    <Row xs={1} sm={1} style={{paddingRight: '20px', paddingLeft: '20px'}}>
                        {this.mapNewsList(this.props.tabNewsArray, this.props.apiMode, this.props.onClickArticle)}
                    </Row>
                    <ShareModal
                        show={this.state.show}
                        title={this.state.title}
                        sharingUrl={this.state.sharingUrl}
                        onClose={this.handleClose}
                    />
                </Container>
            );
        } else if (this.props.sectionLoading){
            return (
                <Container fluid={'true'}>
                    {this.buileLoader(this.props.sectionLoading)}
                </Container>
            );
        } else {
            return null;
        }
    }
}

export default SectionNewsPage;