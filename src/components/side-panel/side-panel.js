// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import SidePanelCard from './parts/side-panel-card';
import './side-panel.css';
import type { SidePanelCardType } from './parts/side-panel-card';

export type SidePanelPropsType = {
  user: {
    id: number,
    name: string,
    imgUrl: string,
  },
  isSelected?: boolean,
  isSidePanelHidden?: boolean,
}

type SidePanelStateType = {
  selectedCard: number,
  cards: Array<SidePanelCardType>,
}

const sidePanelOptions = [
  {
    href: '/search',
    icon: 'play',
    title: 'Search',
  },
  {
    href: '/',
    icon: 'play',
    title: 'Home',
  },
  {
    href: '/favorites',
    icon: 'play',
    title: 'Favorites',
  },
];

class SidePanel extends React.Component {
  static defaultProps = {
    isSelected: false,
    isSidePanelHidden: false,
  };

  constructor(props: SidePanelPropsType) {
    super(props);
    const {
      id: userId,
      name: userName,
      imgUrl: userImg,
    } = props.user;
    this.state = {
      selectedCard: 1,
      cards: [
        { href: `/user/${userId}`, icon: userImg, title: userName },
      ].concat(sidePanelOptions),
    };

    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).createSidePanelCard = this.createSidePanelCard.bind(this);
  }

  state: SidePanelStateType;

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillReceiveProps(nextProps: SidePanelPropsType) {
    if (this.props.isSelected && !nextProps.isSelected) {
      this.setState({ selectedCard: 1 });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  createSidePanelCard(cardData: SidePanelCardType, i: number) {
    return (
      <li
        key={String(i)}
        className={classnames({
          'side-panel__option': true,
          'side-panel__option--active': this.state.selectedCard === i || false,
        })}
      >
        <SidePanelCard {...cardData} />
      </li>
    );
  }

  handleKeyPress(event: KeyboardEvent) {
    if (this.props.isSelected) {
      switch (event.code || event.which) {
        case 38:
        case 'ArrowUp': {
          const newPosition = this.state.selectedCard > 0 ? this.state.selectedCard - 1 : 0;
          this.setState({
            selectedCard: newPosition,
          });
          break;
        }
        case 40:
        case 'ArrowDown': {
          const newPosition = this.state.selectedCard < this.state.cards.length - 1 ?
            this.state.selectedCard + 1 : this.state.cards.length - 1;
          this.setState({
            selectedCard: newPosition,
          });
          break;
        }
        case 13:
        case 'Enter': {
          browserHistory.push(this.state.cards[this.state.selectedCard].href);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  props: SidePanelPropsType;

  render() {
    return (
      <div
        className={classnames({
          'side-panel': true,
          'side-panel--expanded': this.props.isSelected,
          'side-panel--hidden': this.props.isSidePanelHidden,
        })}
      >
        <ul className="side-panel__option-list">
          {this.state.cards.map(this.createSidePanelCard)}
        </ul>
      </div>
    );
  }
}

export default SidePanel;
