import classNames     from 'classnames';
import PropTypes      from 'prop-types';
import React          from 'react';
import { withRouter } from 'react-router';
import { Scrollbars } from 'tt-react-custom-scrollbars';
import { connect }    from 'Stores/connect';
import routes         from 'Constants/routes';
// import InstallPWA     from './install-pwa.jsx';
import Loading        from '../../../templates/app/components/loading.jsx';

const AppContents = ({
    // addNotificationBar,
    children,
    is_app_disabled,
    is_dark_mode,
    is_loading,
    is_logged_in,
    is_positions_drawer_on,
    is_route_modal_on,
    is_slow_loading,
    location,
    slow_loading_status,
    // setPWAPromptEvent,
}) => {
    if (is_logged_in) {
        // TODO: uncomment these after the issues with showing the prompt too often and in the app are fixed
        // window.addEventListener('beforeinstallprompt', e => {
        //     console.log('Going to show the installation prompt'); // eslint-disable-line no-console
        //
        //     e.preventDefault();
        //
        //     setPWAPromptEvent(e);
        //     addNotificationBar({
        //         content : <InstallPWA />,
        //         autoShow: 10000, // show after 10 secs
        //         msg_type: 'pwa',
        //     });
        // });
    }

    return (
        <React.Fragment>
            { is_loading && location.pathname === routes.trade &&
                <Loading
                    is_slow_loading={is_slow_loading}
                    status={slow_loading_status}
                    theme={is_dark_mode ? 'dark' : 'light'}
                />
            }
            <div
                id='app_contents'
                className={classNames('app-contents', {
                    'app-contents--show-positions-drawer': is_positions_drawer_on,
                    'app-contents--is-disabled'          : is_app_disabled,
                    'app-contents--is-route-modal'       : is_route_modal_on,
                })}
            >
                {/* Calculate height of user screen and offset height of header and footer */}
                <Scrollbars
                    autoHide
                    style={{ height: 'calc(100vh - 83px)' }}
                >
                    {children}
                </Scrollbars>
            </div>
        </React.Fragment>
    );
};

AppContents.propTypes = {
    addNotificationBar    : PropTypes.func,
    children              : PropTypes.any,
    is_app_disabled       : PropTypes.bool,
    is_dark_mode          : PropTypes.bool,
    is_loading            : PropTypes.bool,
    is_logged_in          : PropTypes.bool,
    is_positions_drawer_on: PropTypes.bool,
    is_route_modal_on     : PropTypes.bool,
    is_slow_loading       : PropTypes.bool,
    pwa_prompt_event      : PropTypes.object,
    setPWAPromptEvent     : PropTypes.func,
    slow_loading_status   : PropTypes.array,
};

export default withRouter(connect(
    ({ client, ui }) => ({
        is_logged_in          : client.is_logged_in,
        // addNotificationBar    : ui.addNotificationBar,
        is_app_disabled       : ui.is_app_disabled,
        is_dark_mode          : ui.is_dark_mode_on,
        is_loading            : ui.is_loading,
        is_positions_drawer_on: ui.is_positions_drawer_on,
        is_route_modal_on     : ui.is_route_modal_on,
        is_slow_loading       : ui.is_slow_loading,
        pwa_prompt_event      : ui.pwa_prompt_event,
        slow_loading_status   : ui.slow_loading_status,
        // setPWAPromptEvent     : ui.setPWAPromptEvent,
    })
)(AppContents));
