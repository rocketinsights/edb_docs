import React from 'react';

import AnnounceSvg from '../../static/edb-icons/announce.svg';
import ArrowLeftSvg from '../../static/edb-icons/arrow-left.svg';
import ArrowRightSvg from '../../static/edb-icons/arrow-left.svg';
import BrainCircuitSvg from '../../static/edb-icons/brain-circuit.svg';
import BusinessmanSvg from '../../static/edb-icons/businessman.svg';
import BusinesswomanSvg from '../../static/edb-icons/businesswoman.svg';
import CaseStudySvg from '../../static/edb-icons/case-study.svg';
import CheckmarkSvg from '../../static/edb-icons/checkmark.svg';
import ChevronDownSvg from '../../static/edb-icons/chevron-down.svg';
import ChevronRightSvg from '../../static/edb-icons/chevron-right.svg';
import CloseSvg from '../../static/edb-icons/close.svg';
import CodeWritingSvg from '../../static/edb-icons/code-writing.svg';
import ConnectSvg from '../../static/edb-icons/connect.svg';
import DatabaseAdminSvg from '../../static/edb-icons/database-admin.svg';
import DeliverLoveSvg from '../../static/edb-icons/deliver-love.svg';
import DeveloperSvg from '../../static/edb-icons/developer.svg';
import DocsSvg from '../../static/edb-icons/docs.svg';
import DottedBoxSvg from '../../static/edb-icons/dotted-box.svg';
import EarthSvg from '../../static/edb-icons/earth.svg';
import EasySvg from '../../static/edb-icons/easy.svg';
import EdbBadgeSvg from '../../static/edb-icons/edb-badge.svg';
import EdbDocsLogoDarkSvg from '../../static/edb-icons/edb-docs-logo-dark.svg';
import EdbLogoDarkSvg from '../../static/edb-icons/edb-logo-dark.svg';
import EnergySvg from '../../static/edb-icons/energy.svg';
import ExportSvg from '../../static/edb-icons/export.svg';
import FileSvg from '../../static/edb-icons/file.svg';
import HamburgerSvg from '../../static/edb-icons/hamburger.svg';
import HandshakeSvg from '../../static/edb-icons/handshake.svg';
import HighAvailabilitySvg from '../../static/edb-icons/high-availability.svg';
import IdeaSharingSvg from '../../static/edb-icons/idea-sharing.svg';
import ImproveSvg from '../../static/edb-icons/improve.svg';
import InstallSvg from '../../static/edb-icons/install.svg';
import KnightSvg from '../../static/edb-icons/knight.svg';
import LearningSvg from '../../static/edb-icons/learning.svg';
import LinkedinSvg from '../../static/edb-icons/linkedin.svg';
import NetworkSvg from '../../static/edb-icons/network.svg';
import Network2Svg from '../../static/edb-icons/network2.svg';
import PostgresqlSvg from '../../static/edb-icons/postgresql.svg';
import PresentationSvg from '../../static/edb-icons/presentation.svg';
import ProcessImprovementSvg from '../../static/edb-icons/process-improvement.svg';
import RocketSvg from '../../static/edb-icons/rocket.svg';
import SearchSvg from '../../static/edb-icons/search.svg';
import StackSvg from '../../static/edb-icons/stack.svg';
import TenYearsSvg from '../../static/edb-icons/ten-years.svg';
import TutorialSvg from '../../static/edb-icons/tutorial.svg';
import WebinarSvg from '../../static/edb-icons/webinar.svg';

export const iconNames = {
  ANNOUNCE: 'announce',
  ARROW_LEFT: 'arrowleft',
  BRAIN_CIRCUIT: 'braincircuit',
  BUSINESSMAN: 'businessman',
  BUSINESSWOMAN: 'businesswoman',
  CASE_STUDY: 'casestudy',
  CHECKMARK: 'checkmark',
  CHEVRON_DOWN: 'chevrondown',
  CHEVRON_RIGHT: 'chevronright',
  CLOSE: 'close',
  CODE_WRITING: 'codewriting',
  CONNECT: 'connect',
  DATABASE_ADMIN: 'databaseadmin',
  DELIVER_LOVE: 'deliverlove',
  DEVELOPER: 'developer',
  DOCS: 'docs',
  DOTTED_BOX: 'dottedbox',
  EARTH: 'earch',
  EASY: 'easy',
  EDB_BADGE: 'edbbadge',
  EDB_DOCS_LOGO_DARK: 'edbdocslogodark',
  EDB_LOGO_DARK: 'edblogodark',
  ENERGY: 'energy',
  EXPORT: 'export',
  FILE: 'file',
  HAMBURGER: 'hamburger',
  HANDSHAKE: 'handshake',
  HIGH_AVAILABILITY: 'highavailability',
  IDEA_SHARING: 'ideasharing',
  IMPROVE: 'improve',
  INSTALL: 'install',
  KNIGHT: 'knight',
  LEARNING: 'learning',
  LINKEDIN: 'linkedin',
  NETWORK: 'network',
  NETWORK_2: 'network2',
  POSTGRESQL: 'postgresql',
  PRESENTATION: 'presentation',
  PROCESS_IMPROVEMENT: 'processimprovement',
  ROCKET: 'rocket',
  SEARCH: 'search',
  TEN_YEARS: 'tenyears',
  TUTORIAL: 'tutorial',
  WEBINAR: 'webinar',
};

function formatIconName(name) {
  return name && name.replace(/ /g, '').toLowerCase();
}

function IconType({ iconName, ...rest }) {
  switch (formatIconName(iconName)) {
    case iconNames.ANNOUNCE:
      return <AnnounceSvg {...rest} />;
    case iconNames.ARROW_LEFT:
      return <ArrowLeftSvg {...rest} />;
    case iconNames.ARROW_RIGHT:
      return <ArrowRightSvg {...rest} />;
    case iconNames.BRAIN_CIRCUIT:
      return <BrainCircuitSvg {...rest} />;
    case iconNames.BUSINESSMAN:
      return <BusinessmanSvg {...rest} />;
    case iconNames.BUSINESSWOMAN:
      return <BusinesswomanSvg {...rest} />;
    case iconNames.CASE_STUDY:
      return <CaseStudySvg {...rest} />;
    case iconNames.CHECKMARK:
      return <CheckmarkSvg {...rest} />;
    case iconNames.CHEVRON_DOWN:
      return <ChevronDownSvg {...rest} />;
    case iconNames.CHEVRON_RIGHT:
      return <ChevronRightSvg {...rest} />;
    case iconNames.CLOSE:
      return <CloseSvg {...rest} />;
    case iconNames.CODE_WRITING:
      return <CodeWritingSvg {...rest} />;
    case iconNames.CONNECT:
      return <ConnectSvg {...rest} />;
    case iconNames.DATABASE_ADMIN:
      return <DatabaseAdminSvg {...rest} />;
    case iconNames.DELIVER_LOVE:
      return <DeliverLoveSvg {...rest} />;
    case iconNames.DEVELOPER:
      return <DeveloperSvg {...rest} />;
    case iconNames.DOCS:
      return <DocsSvg {...rest} />;
    case iconNames.DOTTED_BOX:
      return <DottedBoxSvg {...rest} />;
    case iconNames.EARTH:
      return <EarthSvg {...rest} />;
    case iconNames.EASY:
      return <EasySvg {...rest} />;
    case iconNames.EDB_BADGE:
      return <EdbBadgeSvg {...rest} />;
    case iconNames.EDB_DOCS_LOGO_DARK:
      return <EdbDocsLogoDarkSvg {...rest} />;
    case iconNames.EDB_LOGO_DARK:
      return <EdbLogoDarkSvg {...rest} />;
    case iconNames.ENERGY:
      return <EnergySvg {...rest} />;
    case iconNames.EXPORT:
      return <ExportSvg {...rest} />;
    case iconNames.FILE:
      return <FileSvg {...rest} />;
    case iconNames.HAMBURGER:
      return <HamburgerSvg {...rest} />;
    case iconNames.HANDSHAKE:
      return <HandshakeSvg {...rest} />;
    case iconNames.HIGH_AVAILABILITY:
      return <HighAvailabilitySvg {...rest} />;
    case iconNames.IDEA_SHARING:
      return <IdeaSharingSvg {...rest} />;
    case iconNames.IMPROVE:
      return <ImproveSvg {...rest} />;
    case iconNames.INSTALL:
      return <InstallSvg {...rest} />;
    case iconNames.KNIGHT:
      return <KnightSvg {...rest} />;
    case iconNames.LEARNING:
      return <LearningSvg {...rest} />;
    case iconNames.LINKEDIN:
      return <LinkedinSvg {...rest} />;
    case iconNames.NETWORK:
      return <NetworkSvg {...rest} />;
    case iconNames.NETWORK_2:
      return <Network2Svg {...rest} />;
    case iconNames.POSTGRESQL:
      return <PostgresqlSvg {...rest} />;
    case iconNames.PRESENTATION:
      return <PresentationSvg {...rest} />;
    case iconNames.PROCESS_IMPROVEMENT:
      return <ProcessImprovementSvg {...rest} />;
    case iconNames.ROCKET:
      return <RocketSvg {...rest} />;
    case iconNames.SEARCH:
      return <SearchSvg {...rest} />;
    case iconNames.STACK:
      return <StackSvg {...rest} />;
    case iconNames.TEN_YEARS:
      return <TenYearsSvg {...rest} />;
    case iconNames.TUTORIAL:
      return <TutorialSvg {...rest} />;
    case iconNames.WEBINAR:
      return <WebinarSvg {...rest} />;
    default:
      return null;
  }
}

function Icon({ circle, circleClassName, circleDiameter, ...rest }) {
  if (circle && circleDiameter) {
    return (
      <div
        className={`hpx-${circleDiameter} wpx-${circleDiameter} rounded-circle
        mx-auto d-flex justify-content-center align-items-center ${circleClassName}`}
      >
        {IconType(rest)}
      </div>
    );
  } else {
    return IconType(rest);
  }
}

Icon.defaultProps = {
  iconName: 'dottedbox',
  className: '',
  circleClassName: '',
  circleDiameter: 100,
  circle: false,
  width: 100,
  height: 100,
};

export default Icon;
