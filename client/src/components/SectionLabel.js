import React from "react";
import Badge from 'react-bootstrap/Badge'
/*
const WorldTab = styled.span`
                color: white;
                background: #8758FF;
            `;
const PoliticsTab = styled.span`
                color: white;
                background: #79B6AD;
            `;
const BusinessTab = styled.span`
                color: white;
                background: #5FA8EF;
            `;
const TechnologyTab = styled.span`
                color: black;
                background: #D5E141;
            `;
const SportsTab = styled.span`
                color: black;
                background: #F7C94E;
            `;

const OtherTab = styled.span`
                color: white;
                background: #7B8289;
            `;
const NYTimesTab = styled.span`
                color: black;
                background: #E1E1E1;
            `;
const GuardianTab = styled.span`
                color: white;
                background: #142D54;
            `;
*/
function SectionLabel(props) {
    if(props.size===null){
        switch (props.section.toLowerCase()) {
            case 'world':
                return <Badge style={{color: 'white', backgroundColor: '#8758FF', float: 'right'}}>WORLD</Badge>;
            case 'politics':
                return <Badge style={{color: 'white', backgroundColor: '#79B6AD', float: 'right'}}>POLITICS</Badge>;
            case 'business':
                return <Badge style={{color: 'white', backgroundColor: '#5FA8EF', float: 'right'}}>BUSINESS</Badge>;
            case 'technology':
                return <Badge style={{color: 'black', backgroundColor: '#D5E141', float: 'right'}}>TECHNOLOGY</Badge>;
            case 'sports':
                return <Badge style={{color: 'black', backgroundColor: '#F7C94E', float: 'right'}}>SPORTS</Badge>;
            case 'sport':
                return <Badge style={{color: 'black', backgroundColor: '#F7C94E', float: 'right'}}>SPORTS</Badge>;
            case 'NYTimes':
                return <Badge style={{color: 'black', backgroundColor: '#E1E1E1', float: 'right'}}>NYTIMES</Badge>;
            case 'Guardian':
                return <Badge style={{color: 'white', backgroundColor: '#142D54', float: 'right'}}>GUARDIAN</Badge>;
            default:
                return <Badge style={{color: 'white', backgroundColor: '#7B8289', float: 'right'}}>{props.section.toUpperCase()}</Badge>;
        }
    } else {
        switch (props.section.toLowerCase()) {
            case 'world':
                return <Badge style={{fontSize: props.size, color: 'white', backgroundColor: '#8758FF', float: 'right'}}>WORLD</Badge>;
            case 'politics':
                return <Badge style={{fontSize: props.size, color: 'white', backgroundColor: '#79B6AD', float: 'right'}}>POLITICS</Badge>;
            case 'business':
                return <Badge style={{fontSize: props.size, color: 'white', backgroundColor: '#5FA8EF', float: 'right'}}>BUSINESS</Badge>;
            case 'technology':
                return <Badge style={{fontSize: props.size, color: 'black', backgroundColor: '#D5E141', float: 'right'}}>TECHNOLOGY</Badge>;
            case 'sports':
                return <Badge style={{fontSize: props.size, color: 'black', backgroundColor: '#F7C94E', float: 'right'}}>SPORTS</Badge>;
            case 'sport':
                return <Badge style={{fontSize: props.size, color: 'black', backgroundColor: '#F7C94E', float: 'right'}}>SPORTS</Badge>;
            case 'NYTimes':
                return <Badge style={{fontSize: props.size, color: 'black', backgroundColor: '#E1E1E1', float: 'right'}}>NYTIMES</Badge>;
            case 'Guardian':
                return <Badge style={{fontSize: props.size, color: 'white', backgroundColor: '#142D54', float: 'right'}}>GUARDIAN</Badge>;
            default:
                return <Badge style={{fontSize: props.size, color: 'white', backgroundColor: '#7B8289', float: 'right'}}>{props.section.toUpperCase()}</Badge>;
        }
    }
}

export default SectionLabel;