import React from "react";
import {Modal, Container, Row, Col} from 'react-bootstrap';
import {FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon, FacebookIcon, TwitterIcon} from 'react-share';
import ReactTooltip from 'react-tooltip';
function  ShareModal(props){
    return(
        <Modal style={{font: 'caption'}} show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: 'center'}}>
                <Modal.Title>Share via</Modal.Title>
                <Container>
                    <Row>
                        <Col>
                            <FacebookShareButton
                                children={<FacebookIcon size={32} round={true} data-tip={'Facebook'}/>}
                                url={props.sharingUrl}
                                hashtag={'#CSCI_571_NewsApp'}
                            />
                        </Col>
                        <Col>
                            <TwitterShareButton
                                style={{margin: '0, 25%'}}
                                children={<TwitterIcon size={32} round={true} data-tip={'Twitter'}/>}
                                url={props.sharingUrl}
                                hashtags={['CSCI_571_NewsApp']}
                            />
                        </Col>
                        <Col>
                            <EmailShareButton
                                children={<EmailIcon size={32} round={true} data-tip={'Email'}/>}
                                subject={'#CSCI_571_NewsApp'}
                                url={props.sharingUrl}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <ReactTooltip/>
        </Modal>
    );
}

export default ShareModal;