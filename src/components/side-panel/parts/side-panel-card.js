// @flow
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import './side-panel-card.css';

export type SidePanelCardType = {
  href: string,
  icon: string,
  title: string,
};

const SidePanelCard = ({ href, icon, title }: SidePanelCardType) => (
  <Link
    to={href}
    className="side-panel-card"
  >
    <FontAwesome
      name={icon}
      className={classnames({
        'side-panel-card__icon': true,
        [`side-panel-card__icon--${title}`]: true,
      })}
    />
    <span className="side-panel-card__title">{title}</span>
  </Link>
);

export default SidePanelCard;
