import React from "react";
import {Router, Route, Switch} from 'react-router-dom';
import { createHashHistory } from 'history';


import searchCardNews from "../api/searchCardNews";
import searchArticle from "../api/searchArticle";
import DetailedArticle from "./DetailedArticle";
import FavoritePage from "./FavoritePage";
import SearchResultsPage from "./SearchResultsPage";
import SectionNewsPage from "./SectionNewsPage";
import ResponsiveNavbar from "./ResponsiveNavbar";
import searchTabNews from "../api/searchTabNews";


const appHistory = createHashHistory();

const tabNewsRoutes = [
    {path: "/"},
    {path: "/Home"},
    {path: "/World"},
    {path: "/Politics"},
    {path: "/Business"},
    {path: "/Technology"},
    {path: "/Sports"}
];

class App extends React.Component {
    state = {
        searchContent: '',
        apiMode: window.localStorage.getItem('apiMode')||'NYTimes',
        tabChosen: 'Home',
        shouldUpdate: true,
        tabNewsArray: null,
        cardNewsArray: null,
        article: null,
        articleLoading: true,
        searchValue: null,
        sectionLoading: true
    };

    //Before removing tabNewsArray

    componentDidMount() {
        if(window.localStorage.getItem('apiMode')===null){
            appHistory.push('/');
            this.callTabNewsApi().then(results => {
                this.setState({tabNewsArray: results, sectionLoading: false});
                // setTimeout(()=>{this.setState({tabNewsArray: results, sectionLoading: false});})
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.shouldUpdate;
    }

    handleClickArticle = (articleId) => {
        this.callArticleApi(articleId).then(res => {
            this.setState({article: null, articleLoading: true});
            appHistory.push('/article?api=' + this.state.apiMode + '&id=' + articleId);
            setTimeout(()=>{this.setState({article: res, articleLoading: false})}, 500);
        });
    };

    callArticleApi = async (articleId) => {
        let res = await searchArticle.get('', {params: {id: articleId, apiMode: this.state.apiMode}});
        // console.log(JSON.parse(res.data.body));
        if(this.state.apiMode==='NYTimes'){
            return JSON.parse(res.data.body).response.docs[0];
        } else {
            return JSON.parse(res.data.body).response.content;
        }
    };

    callCardNewsApi = async (keyword) => {
        let res = await searchCardNews.get(this.state.apiMode + '/' + keyword);
        if(this.state.apiMode === 'NYTimes'){
            return JSON.parse(res.data.body).response.docs;
        } else {
            return JSON.parse(res.data.body).response.results;
        }
    };

    handleSearch = (keyword) => {
        this.callCardNewsApi(keyword).then(res => {
            this.setState({cardNewsArray: res});
            appHistory.replace('/search?q=' + keyword);
        });
    };
    handleClearSearchBar = () => {
        this.setState({searchValue: null});
    };
    handleInputSearchBar = () => {
        this.setState({searchValue: undefined});
    };

    callTabNewsApi = async () => {
        let res = {};
        if(this.state.tabChosen==='Sports' && this.state.apiMode==='Guardian') {
            res = await searchTabNews.get(this.state.apiMode + '/section/Sport');
        } else {
            res = await searchTabNews.get(this.state.apiMode + '/section/' + this.state.tabChosen);
        }
        if(this.state.apiMode === 'NYTimes'){
            return JSON.parse(res.data.body).results;
        } else {
            return JSON.parse(res.data.body).response.results;
        }
    };

    handleTabClick = clickedTab => {
        appHistory.push(clickedTab==='Home' ? '/' : '/'+clickedTab)
        this.setState({tabChosen: clickedTab, sectionLoading: true,shouldUpdate: true},
            () =>  {
                this.callTabNewsApi().then(results => {
                    this.setState({tabNewsArray: results, shouldUpdate: true, sectionLoading: false});

                })});
    };

    handleSwitch = () => {
        console.log('success');
        let newApiMode = (this.state.apiMode==='NYTimes' ? 'Guardian' : 'NYTimes');
        window.localStorage.setItem('apiMode', newApiMode);
        this.setState({apiMode: newApiMode, shouldUpdate: false},
            () => {
            console.log('after switch apiMode: ');
            console.log(this.state.apiMode);
            this.callTabNewsApi().then(results => {
                this.setState({tabNewsArray: results, shouldUpdate: true});
            });}
        );
    };

    buildResponsiveNavbar = (props) =>
        <ResponsiveNavbar {...props}
                          onTabClick={this.handleTabClick}
                          apiMode={this.state.apiMode}
                          onSwitch={this.handleSwitch}
                          onSearch={this.handleSearch}
                          pathname={appHistory.location.pathname}
                          history={appHistory}
                          onInputSearchBar={this.handleInputSearchBar}
                          searchValue={this.state.searchValue}
                          // tabChosen={this.state.tabChosen}
                          // pageLocation={appHistory.location}

        />;





    render() {
        appHistory.listen((location, action) => {
            console.log(
                `The current URL is pathname: ${location.pathname} search: ${location.search} hash: ${location.hash}`
            );
            console.log(`The last navigation action was ${action}`);
            if(action==='REPLACE'){
                console.log('!!!');
            }
        });

        return(
            <Router history={appHistory}>
                    <Switch>
                        {tabNewsRoutes.map((tabNewsRoute, i) => {
                            return (
                                <Route path={tabNewsRoute.path}
                                       exact
                                       render={() => this.buildResponsiveNavbar(this.props)}
                                />
                            );
                        })}
                        <Route path={"/search"}
                               render={() => this.buildResponsiveNavbar(this.props)}
                        />
                        <Route path={"/article"}
                               render={() => this.buildResponsiveNavbar(this.props)}
                        />
                        <Route path={"/favorites"}
                               render={() => this.buildResponsiveNavbar(this.props)}
                        />
                    </Switch>

                <div className={'detailed-article-div'}>
                    <Route path={"/article"}
                           render={(props) =>
                               <DetailedArticle {...props}
                                                apiMode={this.state.apiMode}
                                                article={this.state.article}
                                                pageLocation={appHistory.location}
                                                articleLoading={this.state.articleLoading}
                               />
                           }
                    />
                </div>

                <div className={'favorite-div'}>
                    <Route path={"/favorites"}
                           render={(props) =>
                               <FavoritePage {...props}
                                             onClickArticle={this.handleClickArticle}
                               />
                           }
                    />
                </div>

                <div className={'card-news-grid-div'}>
                    <Route path={"/search"}
                           render={(props) =>
                               <SearchResultsPage {...props}
                                             apiMode={this.state.apiMode}
                                             onClickArticle={this.handleClickArticle}
                                             cardNewsArray={this.state.cardNewsArray}
                                             clearSearchBar={this.handleClearSearchBar}

                               />
                           }
                    />
                </div>


                {/*<div className={'tab-news-list-div'}>*/}
                    <Switch>
                        {tabNewsRoutes.map((tabNewsRoute, i) => {
                            return (
                                <Route path={tabNewsRoute.path}
                                       key={this.state.apiMode + this.state.tabChosen}
                                       exact
                                       render={(props) =>
                                           <SectionNewsPage {...props}
                                                            apiMode={this.state.apiMode}
                                                            tabNewsArray={this.state.tabNewsArray}
                                                            onClickArticle={this.handleClickArticle}
                                                            sectionLoading={this.state.sectionLoading}
                                                            // pathname={appHistory.location.pathname}
                                           />
                                       }
                                />
                            );
                        })}
                    </Switch>
                {/*</div>*/}
            </Router>
        );
    }
}

export default App;