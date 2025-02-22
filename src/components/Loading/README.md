---
name: Loading
category: Feedback indicators
keywords:
  - spinner
  - loader
  - loading
  - loading bar
---

# Loading

The loading component is used to indicate to merchants that a page is loading or an upload is processing.

---

## Examples

### Default loading

Use to indicate that the page is loading.

```jsx
<div style={{height: '100px'}}>
  <Frame>
    <Loading />
  </Frame>
</div>
```

---

## Required components

The loading component must be wrapped in the [frame](https://polaris.shopify.com/components/structure/frame) component or used in an embedded application.

---

## Use in an embedded application (deprecated)

Passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge) causes the loading component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) instead of rendering as it would in a stand-alone application.

```jsx
class EmbeddedAppLoadingExample extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const loadingMarkup = this.state.loading && <Loading />;

    return (
      <AppProvider apiKey="YOUR_API_KEY" i18n={{}}>
        {loadingMarkup}
      </AppProvider>
    );
  }
}
```

#### Deprecation rationale

As of v3.17.0, using `Loading` in an embedded app is deprecated. Support for this will be removed in v5.0 as the underlying Shopify App Bridge library will be removed from Polaris React. Learn more about the [deprecation rationale](https://github.com/Shopify/polaris-react/issues/814). Use [`Loading`](https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/loading) from [`@shopify/app-bridge-react`](https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components) instead.

---

## Best practices

The loading component should:

- Indicate that the page requested is loading.
- Indicate that an upload has started and the action will soon complete.
- Be used to give feedback for an entire page load or a page mutation like saving a product.
- Be used alongside a component or page element that contains `aria-busy` to represent what is loading.

---

## Related components

- To indicate that an action has been received, use the [Spinner](https://polaris.shopify.com/components/feedback-indicators/spinner)
- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](https://polaris.shopify.com/components/feedback-indicators/progress-bar) component.
- To better represent loading content, use [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) along with [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/feedback-indicators/skeleton-display-text) components.

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

The loading component is implemented using the [ARIA 1.1 progressbar pattern](https://www.w3.org/TR/wai-aria-1.1/#progressbar). It outputs an ARIA `role="progressbar"` and uses `aria-valuemin`, `aria-value-max`, and `aria-valuenow` to convey the loaded percentage to screen reader users.

<!-- /content-for -->
