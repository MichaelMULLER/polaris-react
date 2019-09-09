import React from 'react';
import {Theme} from '../../utilities/theme';
import {ThemeProvider} from '../ThemeProvider';
import {I18n, I18nContext, TranslationDictionary} from '../../utilities/i18n';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {
  createAppBridge,
  AppBridgeContext,
  AppBridgeOptions,
} from '../../utilities/app-bridge';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {LinkContext, LinkLikeComponent} from '../../utilities/link';
import {
  UniqueIdFactory,
  UniqueIdFactoryContext,
  globalIdGeneratorFactory,
} from '../../utilities/unique-id';

interface State {
  appBridge: ReturnType<typeof createAppBridge>;
}

export interface AppProviderProps extends AppBridgeOptions {
  /** A locale object or array of locale objects that overrides default translations */
  i18n: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** Custom logos and colors provided to select components */
  theme?: Theme;
}

export class AppProvider extends React.Component<AppProviderProps, State> {
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;
  private uniqueIdFactory: UniqueIdFactory;

  constructor(props: AppProviderProps) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    this.uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    const {apiKey, shopOrigin, forceRedirect} = this.props;

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      appBridge: createAppBridge({shopOrigin, apiKey, forceRedirect}),
    };
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
    }
  }

  componentDidUpdate({
    apiKey: prevApiKey,
    shopOrigin: prevShopOrigin,
    forceRedirect: prevForceRedirect,
  }: AppProviderProps) {
    const {apiKey, shopOrigin, forceRedirect} = this.props;

    if (
      apiKey === prevApiKey &&
      shopOrigin === prevShopOrigin &&
      forceRedirect === prevForceRedirect
    ) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      appBridge: createAppBridge({shopOrigin, apiKey, forceRedirect}),
    });
  }

  render() {
    const {i18n, linkComponent, theme = {logo: null}, children} = this.props;
    const {appBridge} = this.state;

    return (
      <I18nContext.Provider value={new I18n(i18n)}>
        <ScrollLockManagerContext.Provider value={this.scrollLockManager}>
          <StickyManagerContext.Provider value={this.stickyManager}>
            <UniqueIdFactoryContext.Provider value={this.uniqueIdFactory}>
              <AppBridgeContext.Provider value={appBridge}>
                <LinkContext.Provider value={linkComponent}>
                  <ThemeProvider theme={theme}>
                    {React.Children.only(children)}
                  </ThemeProvider>
                </LinkContext.Provider>
              </AppBridgeContext.Provider>
            </UniqueIdFactoryContext.Provider>
          </StickyManagerContext.Provider>
        </ScrollLockManagerContext.Provider>
      </I18nContext.Provider>
    );
  }
}
