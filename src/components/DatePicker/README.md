---
name: Date picker
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - DatePicker
  - month
  - day
  - year
  - weekday
  - choose date
  - pick date
  - pick time
  - date picker
  - calendar
  - date selector
  - date range picker
  - date range selector
---

# Date picker

Date pickers let merchants choose dates from a visual calendar that’s
consistently applied wherever dates need to be selected across Shopify.

---

## Best practices

Date pickers should:

- Use smart defaults and highlight common selections
- Close after a single date is selected unless a range with a start and end date is required
- Set the start date on first click or tap and the end date on second click or tap if a range
  is required
- Not be used to enter a date that is many years in the future or the past
- Follow [date format guidelines](https://polaris.shopify.com/content/grammar-and-mechanics#section-dates-numbers-and-addresses)

---

## Examples

### Default date picker

Use when merchants need to select a date range close to today (today is the default starting position for the date picker).

```jsx
class DatePickerExample extends React.Component {
  state = {
    month: 1,
    year: 2018,
    selected: {
      start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
      end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    },
  };

  render() {
    const {month, year, selected} = this.state;

    return (
      <DatePicker
        month={month}
        year={year}
        onChange={this.handleChange}
        onMonthChange={this.handleMonthChange}
        selected={selected}
      />
    );
  }

  handleChange = (value) => {
    this.setState({selected: value});
  };

  handleMonthChange = (month, year) => {
    this.setState({
      month,
      year,
    });
  };
}
```

<!-- content-for: android -->

![Date picker on Android](https://polaris.shopify.com/public_images/components/DatePicker/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Date picker on iOS](https://polaris.shopify.com/public_images/components/DatePicker/ios/default@2x.png)

<!-- /content-for -->
