import React, {
  ReactElement,
  ReactPortal,
  useState,
  useRef,
  useEffect,
} from 'react';
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

type OnlyChild = ReactElement | ReactFragment | ReactPortal;
interface ReactNodeArray extends Array<OnlyChild> {}
type ReactFragment = ReactNodeArray;

export interface AppProviderProps extends AppBridgeOptions {
  /** A locale object or array of locale objects that overrides default translations */
  i18n: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** Custom logos and colors provided to select components */
  theme?: Theme;
  /** Inner content of the application */
  children: OnlyChild;
}

export function AppProvider({
  apiKey,
  shopOrigin,
  forceRedirect,
  i18n,
  linkComponent,
  theme = {logo: null},
  children,
}: AppProviderProps) {
  const stickyManager = useRef(new StickyManager());
  const scrollLockManager = useRef(new ScrollLockManager());
  const uniqueIdFactory = useRef(new UniqueIdFactory(globalIdGeneratorFactory));

  const [appBridge, setAppBridge] = useState(
    createAppBridge({shopOrigin, apiKey, forceRedirect}),
  );

  useEffect(() => {
    console.log('useEffect 1 MOUNT');
    if (document != null) {
      stickyManager.current.setContainer(document);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect 2 MOUNT');
    setAppBridge(createAppBridge({shopOrigin, apiKey, forceRedirect}));
  }, [apiKey, shopOrigin, forceRedirect]);

  return (
    <I18nContext.Provider value={new I18n(i18n)}>
      <ScrollLockManagerContext.Provider value={scrollLockManager.current}>
        <StickyManagerContext.Provider value={stickyManager.current}>
          <UniqueIdFactoryContext.Provider value={uniqueIdFactory.current}>
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
