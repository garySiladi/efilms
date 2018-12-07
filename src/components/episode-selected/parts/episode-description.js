// @flow
import React from 'react';
import { EpisodeDescriptionStructure } from '../../../structures/episode';
import './episode-description.css';

const EpisodeDescription = ({ subtitle, title, description }: EpisodeDescriptionStructure) => (
  <div className="episode-description">
    <h3 className="episode-description__subtitle">{subtitle}</h3>
    <h2 className="episode-description__title">{title}</h2>
    <p className="episode-description__text">{description}</p>
  </div>
);

export default EpisodeDescription;
