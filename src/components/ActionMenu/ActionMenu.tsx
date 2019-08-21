import React from 'react';
import {classNames} from '../../utilities/css';
import {
  ActionListSection,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../types';

import {sortAndOverrideActionOrder} from './utilities';
import {MenuAction, MenuGroup, RollupActions} from './components';

import styles from './ActionMenu.scss';

export interface Props {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
  /** Roll up all actions into a Popover > ActionList */
  rollup?: boolean;
}

interface State {
  activeMenuGroup?: string;
}

export default class ActionMenu extends React.PureComponent<Props, State> {
  state: State = {
    activeMenuGroup: undefined,
  };

  render() {
    const {actions = [], groups = [], rollup} = this.props;

    if (actions.length === 0 && groups.length === 0) {
      return null;
    }

    const actionMenuClassNames = classNames(
      styles.ActionMenu,
      rollup && styles.rollup,
    );

    const rollupSections = groups.map((group) => convertGroupToSection(group));

    return (
      <div className={actionMenuClassNames}>
        {rollup ? (
          <RollupActions items={actions} sections={rollupSections} />
        ) : (
          this.renderActions()
        )}
      </div>
    );
  }

  private renderActions = () => {
    const {actions = [], groups = []} = this.props;
    const {activeMenuGroup} = this.state;
    const overriddenActions = sortAndOverrideActionOrder([
      ...actions,
      ...groups,
    ]);

    const actionMarkup = overriddenActions.map((action, index) => {
      if (action.hasOwnProperty('title')) {
        const {title, ...rest} = action as MenuGroupDescriptor;
        return (
          <MenuGroup
            key={`MenuGroup-${title || index}`}
            title={title}
            active={title === activeMenuGroup}
            {...rest}
            onOpen={this.handleMenuGroupToggle}
            onClose={this.handleMenuGroupClose}
          />
        );
      }

      const {content, ...rest} = action as MenuActionDescriptor;
      return (
        <MenuAction
          key={`MenuAction-${content || index}`}
          content={content}
          {...rest}
        />
      );
    });

    return actionMarkup.length > 0 ? (
      <div className={styles.ActionsLayout}>{actionMarkup}</div>
    ) : null;
  };

  private handleMenuGroupToggle = (group: string) => {
    this.setState(({activeMenuGroup}) => ({
      activeMenuGroup: activeMenuGroup ? undefined : group,
    }));
  };

  private handleMenuGroupClose = () => {
    this.setState({activeMenuGroup: undefined});
  };
}

export function hasGroupsWithActions(groups: Props['groups'] = []) {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
}

export function convertGroupToSection({
  title,
  actions,
}: MenuGroupDescriptor): ActionListSection {
  return {title, items: actions};
}
