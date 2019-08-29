import React, {useRef, useEffect} from 'react';
import {classNames} from '../../../../utilities/css';
import {Checkbox, CheckboxHandles} from '../../../Checkbox';
import {
  ResourceListContext,
  CheckableButtonKey,
} from '../../../../utilities/resource-list';

import styles from './CheckableButton.scss';

export interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  smallScreen?: boolean;
  plain?: boolean;
  measuring?: boolean;
  disabled?: boolean;
  onToggleAll?(): void;
}

export function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  selectMode,
  plain,
  measuring,
  disabled,
  smallScreen,
}: CheckableButtonProps) {
  const checkBoxRef = useRef<CheckboxHandles>(null);

  const {registerCheckableButtons} = React.useContext(ResourceListContext);

  let currentKey: CheckableButtonKey = 'plain';

  if (plain) {
    currentKey = 'plain';
  } else if (smallScreen) {
    currentKey = 'bulkSm';
  } else {
    currentKey = 'bulkLg';
  }

  useEffect(() => {
    if (checkBoxRef.current && registerCheckableButtons) {
      registerCheckableButtons(currentKey, checkBoxRef.current);
    }
  }, [currentKey, registerCheckableButtons]);

  const className = plain
    ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
    : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
      );

  return (
    <div className={className} onClick={onToggleAll}>
      <div className={styles.Checkbox}>
        <Checkbox
          label={accessibilityLabel}
          labelHidden
          checked={selected}
          disabled={disabled}
          onChange={onToggleAll}
          ref={checkBoxRef}
        />
      </div>
      <span className={styles.Label}>{label}</span>
    </div>
  );
}
