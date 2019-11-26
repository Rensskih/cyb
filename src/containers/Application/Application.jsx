import React from 'react';
import { connect } from 'react-redux';
import {
    App,
    AppHeader,
    AppContent,
    AppSideBar,
    Navigation,
    NavigationLeft,
    NavigationRight,
    NavigationCenter,
    SkillBar,
    Pane,
    Text,
} from '@cybercongress/ui';
import { toggleMenu as toggleMenuAction } from '../../redux/appMenu';
import BntGroupFull from '../../components/ButtonGroupFull/ButtonGroupFull';

// import App, {
//     AppHeader, AppContent, AppSideBar,
// } from '../../components/App/App';
// import Navigation, {
//     NavigationLeft, NavigationRight, NavigationCenter,
// } from '../../components/Navigation/Navigation';

import IdBar from './IdBar';
import AppMenu from './AppMenu';
// import Status from './Status';
import NavigationComponents from './Navigation';
import ToggleMenu from './ToggleMenu';
import SignerPopup from './SignerPopup';
import Intro from './Intro';

const regexCyb = /\.cyb/;

const Application = (props) => {
    const {
        homePage,
        openMenu,
        children,
        toggleMenu,
        defaultEthAccount,
        showIntro,
        bwRemained,
        bwMaxValue,
        linkPrice,
        dura,
    } = props;

    if (showIntro) {
        return <Intro />;
    }

    return (
        <App openMenu={ openMenu }>
            <SignerPopup />
            {/* <Status /> */}
            <AppSideBar onCloseSidebar={ toggleMenu } openMenu={ openMenu }>
                <AppMenu />
            </AppSideBar>
            <AppHeader isHome={ homePage } isMenuOpen={ openMenu }>
                <Navigation isHome={ homePage }>
                    <NavigationLeft>
                        <ToggleMenu />
                    </NavigationLeft>
                    <NavigationCenter>
                        <NavigationComponents />
                    </NavigationCenter>
                    <NavigationRight>
                        {/* <Pane display='flex' justifyContent='flex-end' alignItems='center'>
                            {defaultEthAccount && (
                                <SkillBar
                                  maxHeight={ 16 }
                                  minWidth={ 100 }
                                  maxWidth={ 200 }
                                  bwPercent={ ((bwRemained / bwMaxValue) * 100).toFixed(0) }
                                  contentTooltip={ (
                                      <ContenTooltip
                                        bwRemained={ bwRemained }
                                        bwMaxValue={ bwMaxValue }
                                        linkPrice={ linkPrice }
                                      />
) }
                                />
                            )} */}
                            <IdBar />
                        {/* </Pane> */}
                    </NavigationRight>
                </Navigation>
            </AppHeader>
            <Pane
            height='calc(100% - 60px)'
            position="relative"
            flex="1 auto"
            backgroundColor="#000"
            >
                {children}
                { dura.match(/\.cyb\b/gi) && ( 
                    <Pane position='fixed' top={0} right='5px' height='inherit' marginTop={60} display='flex' alignItems='center' className='BntGroupFull'>
                        <BntGroupFull />
                    </Pane>)
                }
                
            </Pane>
        </App>
    );
};

export default connect(
    state => ({
        homePage: state.browser.dura === '',
        openMenu: state.appMenu.openMenu,
        defaultEthAccount: state.wallet.defaultAccount,
        showIntro: state.intro.showIntro,
        dura: state.browser.dura,

        bwRemained: state.cyber.bwRemained,
        bwMaxValue: state.cyber.bwMaxValue,
        linkPrice: state.cyber.linkPrice,
    }),
    { toggleMenu: toggleMenuAction },
)(Application);
