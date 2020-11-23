import React from "react";
import {FaShareAlt, FaTrash} from "react-icons/fa";
import {Card, Col, Container} from 'react-bootstrap';
import SectionLabel from "./SectionLabel";

function NewsCard(props) {
    if(props.favorite){
        return(
            <Col key={props.sharingUrl} style={{paddingBottom: '1%'}}>
                <Card className={'shadowed-card'} style={{margin: '10px'}} onClick={() => props.onClickArticle(props.searchArticleUrl)} >
                    <Card.Body>
                        <span className={'small-card-title'}>{props.title + ' '}</span>
                        <FaShareAlt className={'card-icon'} onClick={(event) => {event.stopPropagation(); props.handleClickShare(props.title, props.sharingUrl);}}/>
                        <FaTrash className={'card-icon'} onClick={(event) => {event.stopPropagation(); props.handleClickDelete(props.sharingUrl, props.title)}}/>
                    </Card.Body>
                    <Container fluid={'true'} style={{padding: '3%'}}>
                        <Container fluid={'true'} style={{border: '1px solid rgba(0, 0, 0, 0.2)', padding: '2px 2px'}}>
                            <Card.Img className={'card-image'} src={props.imageUrl}/>
                        </Container>
                    </Container>
                    <Card.Body>
                        <span className={'card-date'}>{props.date}</span>
                        <SectionLabel section={props.apiMode}/>
                        <SectionLabel section={props.section}/>
                    </Card.Body>
                </Card>
            </Col>
        );
    } else {
        return(
            <Col key={props.sharingUrl} style={{paddingBottom: '1%'}}>
                <Card className={'shadowed-card'} style={{margin: '10px'}} onClick={() => props.onClickArticle(props.searchArticleUrl)}>
                    <Card.Body>
                        <span className={'small-card-title'}>{props.title + ' '}</span>
                        <FaShareAlt className={'card-icon'} onClick={(event) => {event.stopPropagation(); props.handleClickShare(props.title, props.sharingUrl);}}/>
                    </Card.Body>
                    <Container fluid={'true'} style={{padding: '3%'}}>
                        <Container fluid={'true'} style={{border: '1px solid rgba(0, 0, 0, 0.2)', padding: '2px 2px'}}>
                            <Card.Img className={'card-image'} src={props.imageUrl}/>
                        </Container>
                    </Container>
                    <Card.Body>
                        <span className={'card-date'}>{props.date}</span>
                        <SectionLabel section={props.section}/>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default NewsCard;