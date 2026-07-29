import React from 'react';
import { ManifestoPage } from './components/ManifestoPage';

interface TermsPageProps {
  initialTab?: 'manifesto' | 'terms';
  onBackToMarketplace: () => void;
  onNavigateToTab?: (tab: 'manifesto' | 'terms') => void;
}

export const TermsPage: React.FC<TermsPageProps> = (props) => {
  return <ManifestoPage {...props} />;
};
